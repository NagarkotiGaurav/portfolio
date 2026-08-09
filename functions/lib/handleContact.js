import { firstErrorMessage, validateContactBody } from './contactSchema.js'
import { createLogger } from './logger.js'
import { createLeadProviders, getProviderStatus } from './providers.js'
import { isRateLimited } from './rateLimit.js'

function headerValue(headers, name) {
  if (!headers) return ''
  if (typeof headers.get === 'function') return headers.get(name) || ''
  const found = headers[name] || headers[name.toLowerCase()]
  return found ? String(found) : ''
}

function clientIp(requestLike) {
  const headers = requestLike.headers
  const forwarded = headerValue(headers, 'cf-connecting-ip') || headerValue(headers, 'x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0].trim()
  return requestLike.ip || 'unknown'
}

function newLeadId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }
  return `lead_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`
}

/**
 * Normalize validated body into the canonical Lead every provider receives.
 */
export function normalizeLead(value, requestLike) {
  return {
    id: newLeadId(),
    timestamp: new Date().toISOString(),
    name: value.name,
    email: value.email,
    phone: value.phone || '',
    company: value.company || '',
    industry: value.industry || '',
    projectType: value.projectType || value.intent || '',
    budget: value.budget || '',
    timeline: value.timeline || '',
    preferredContact: value.preferredContact || 'email',
    message: value.message,
    source: value.source || 'website',
    userAgent: value.userAgent || headerValue(requestLike.headers, 'user-agent'),
    ip: clientIp(requestLike),
    referrer: value.referrer || headerValue(requestLike.headers, 'referer'),
    utm: value.utm || {
      source: '',
      medium: '',
      campaign: '',
      term: '',
      content: '',
    },
    intent: value.intent || 'message',
    status: 'New',
  }
}

/**
 * Framework-agnostic contact handler.
 * @returns {Promise<{ status: number, body: object }>}
 */
export async function processContact({ body, requestLike, env }) {
  const logger = createLogger(env)
  const providers = createLeadProviders(env, logger)
  const clientKey = clientIp(requestLike)

  if (isRateLimited(clientKey)) {
    return {
      status: 429,
      body: {
        ok: false,
        message: 'Too many submissions. Please wait a few minutes and try again.',
      },
    }
  }

  const result = validateContactBody(body || {})
  if (!result.ok) {
    return {
      status: 400,
      body: {
        ok: false,
        message: firstErrorMessage(result.errors),
        errors: result.errors,
      },
    }
  }

  if (result.value._gotcha) {
    logger.warn('contact.honeypot', { ip: clientKey })
    return { status: 200, body: { ok: true, message: 'Inquiry received.' } }
  }

  const lead = normalizeLead(result.value, requestLike)
  const configured = providers.filter((provider) => provider.isConfigured())

  if (configured.length === 0) {
    logger.warn('contact.no_providers', { email: lead.email, id: lead.id })
    return {
      status: 202,
      body: {
        ok: true,
        message:
          'Inquiry accepted. Lead providers are not configured yet — set Telegram / Sheets secrets to deliver.',
        id: lead.id,
        delivered: [],
        providers: getProviderStatus(providers),
      },
    }
  }

  const settled = await Promise.allSettled(configured.map((provider) => provider.send(lead)))

  const outcomes = settled.map((entry, index) => {
    const name = configured[index].name
    if (entry.status === 'fulfilled') {
      const skipped = Boolean(entry.value && entry.value.skipped)
      return { name, ok: true, skipped }
    }
    const reason = entry.reason instanceof Error ? entry.reason.message : String(entry.reason)
    logger.error('contact.provider_failed', { provider: name, reason, id: lead.id })
    return { name, ok: false, error: reason }
  })

  const attempted = outcomes.filter((o) => !o.skipped)
  const delivered = attempted.filter((o) => o.ok)
  const failed = attempted.filter((o) => !o.ok)

  if (delivered.length === 0 && failed.length > 0) {
    return {
      status: 500,
      body: {
        ok: false,
        message: 'Unable to deliver this inquiry right now. Please try again shortly.',
        id: lead.id,
        providers: outcomes,
      },
    }
  }

  logger.info('contact.success', {
    id: lead.id,
    email: lead.email,
    delivered: delivered.map((d) => d.name),
    failed: failed.map((f) => f.name),
  })

  return {
    status: 200,
    body: {
      ok: true,
      message: 'Inquiry delivered.',
      id: lead.id,
      delivered: delivered.map((d) => d.name),
      failed: failed.map((f) => f.name),
    },
  }
}

export function processHealth(env) {
  const logger = createLogger(env)
  const providers = createLeadProviders(env, logger)
  return {
    status: 200,
    body: {
      ok: true,
      providers: getProviderStatus(providers),
    },
  }
}
