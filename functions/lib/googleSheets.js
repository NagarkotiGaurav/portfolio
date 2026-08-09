import { createEnvReader } from './env.js'

/**
 * @param {Record<string, string>} env
 * @param {{ debug: Function, info: Function }} logger
 */
export function createGoogleSheetsProvider(env, logger) {
  const config = createEnvReader(env)

  return {
    name: 'googleSheets',

    isConfigured() {
      if (!config.flag('GOOGLE_SHEETS_ENABLED', true)) return false
      return Boolean(config.get('GOOGLE_SHEETS_WEBHOOK_URL'))
    },

    async send(lead) {
      if (!config.flag('GOOGLE_SHEETS_ENABLED', true)) {
        logger.debug('googleSheets.skipped', { reason: 'disabled' })
        return { skipped: true }
      }

      const url = config.get('GOOGLE_SHEETS_WEBHOOK_URL')
      if (!url) {
        logger.debug('googleSheets.skipped', { reason: 'missing_credentials' })
        return { skipped: true }
      }

      const secret = config.get('GOOGLE_SHEETS_WEBHOOK_SECRET')
      const payload = {
        secret: secret || undefined,
        id: lead.id,
        timestamp: lead.timestamp,
        name: lead.name,
        email: lead.email,
        phone: lead.phone || '',
        company: lead.company || '',
        industry: lead.industry || '',
        projectType: lead.projectType || '',
        budget: lead.budget || '',
        timeline: lead.timeline || '',
        message: lead.message || '',
        source: lead.source || 'website',
        status: lead.status || 'New',
        preferredContact: lead.preferredContact || '',
        userAgent: lead.userAgent || '',
        ip: lead.ip || '',
        referrer: lead.referrer || '',
        utm: lead.utm || {},
      }

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        redirect: 'follow',
      })

      const text = await response.text()
      let body = null
      try {
        body = JSON.parse(text)
      } catch {
        body = null
      }

      if (!response.ok) {
        throw new Error(`Google Sheets HTTP ${response.status}: ${text.slice(0, 200)}`)
      }
      if (body && body.ok === false) {
        throw new Error(`Google Sheets: ${body.error || 'rejected'}`)
      }

      logger.info('googleSheets.appended', { email: lead.email, id: lead.id })
      return { skipped: false }
    },
  }
}

export function appendLead(env, logger, lead) {
  return createGoogleSheetsProvider(env, logger).send(lead)
}
