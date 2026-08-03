import { leadProviders, getProviderStatus } from '../services/index.js'
import { logger } from '../utils/logger.js'
import { firstErrorMessage, validateContactBody } from '../validation/contactSchema.js'

const RATE_WINDOW_MS = 60_000
const RATE_MAX = 8
const rateBuckets = new Map()

function isRateLimited(key) {
  const now = Date.now()
  const bucket = rateBuckets.get(key) || []
  const recent = bucket.filter((ts) => now - ts < RATE_WINDOW_MS)
  recent.push(now)
  rateBuckets.set(key, recent)
  return recent.length > RATE_MAX
}

function clientIp(req) {
  const forwarded = req.headers['x-forwarded-for']
  if (typeof forwarded === 'string' && forwarded.trim()) {
    return forwarded.split(',')[0].trim()
  }
  return req.ip || ''
}

/**
 * Normalize a validated body into the canonical Lead object every provider receives.
 */
export function normalizeLead(value, req) {
  return {
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
    userAgent: value.userAgent || String(req.headers['user-agent'] || ''),
    ip: clientIp(req),
    referrer: value.referrer || String(req.headers.referer || ''),
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

export async function handleContact(req, res) {
  try {
    const clientKey = clientIp(req) || 'unknown'
    if (isRateLimited(clientKey)) {
      res.status(429).json({
        ok: false,
        message: 'Too many submissions. Please wait a minute and try again.',
      })
      return
    }

    const result = validateContactBody(req.body || {})
    if (!result.ok) {
      res.status(400).json({
        ok: false,
        message: firstErrorMessage(result.errors),
        errors: result.errors,
      })
      return
    }

    // Honeypot — bots often fill hidden fields; acknowledge without delivering.
    if (result.value._gotcha && result.value._gotcha.trim()) {
      logger.warn('contact.honeypot', { ip: clientKey })
      res.json({ ok: true, message: 'Inquiry received.' })
      return
    }

    const lead = normalizeLead(result.value, req)
    const configured = leadProviders.filter((provider) => provider.isConfigured())

    if (configured.length === 0) {
      logger.warn('contact.no_providers', { email: lead.email })
      // Credentials not set yet — accept so the site works; nothing is delivered.
      res.status(202).json({
        ok: true,
        message:
          'Inquiry accepted. Lead providers are not configured yet — set Telegram / Sheets env vars to deliver.',
        delivered: [],
        providers: getProviderStatus(),
      })
      return
    }

    const settled = await Promise.allSettled(configured.map((provider) => provider.send(lead)))

    const outcomes = settled.map((entry, index) => {
      const name = configured[index].name
      if (entry.status === 'fulfilled') {
        const skipped = Boolean(entry.value && entry.value.skipped)
        return { name, ok: true, skipped }
      }
      const reason = entry.reason instanceof Error ? entry.reason.message : String(entry.reason)
      logger.error('contact.provider_failed', { provider: name, reason })
      return { name, ok: false, error: reason }
    })

    const attempted = outcomes.filter((o) => !o.skipped)
    const delivered = attempted.filter((o) => o.ok)
    const failed = attempted.filter((o) => !o.ok)

    if (delivered.length === 0 && failed.length > 0) {
      res.status(500).json({
        ok: false,
        message: 'Unable to deliver this inquiry right now. Please try again shortly.',
        providers: outcomes,
      })
      return
    }

    logger.info('contact.success', {
      email: lead.email,
      delivered: delivered.map((d) => d.name),
      failed: failed.map((f) => f.name),
    })

    res.json({
      ok: true,
      message: 'Inquiry delivered.',
      delivered: delivered.map((d) => d.name),
      failed: failed.map((f) => f.name),
    })
  } catch (error) {
    logger.error('contact.unexpected', {
      error: error instanceof Error ? error.message : String(error),
    })
    res.status(500).json({
      ok: false,
      message: 'Unexpected server error.',
    })
  }
}

export function handleHealth(_req, res) {
  res.json({
    ok: true,
    providers: getProviderStatus(),
  })
}
