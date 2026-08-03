import { logger } from '../utils/logger.js'

function envFlag(name, fallback = true) {
  const raw = process.env[name]
  if (raw === undefined || raw === '') return fallback
  return !['0', 'false', 'off', 'no'].includes(String(raw).toLowerCase())
}

/**
 * @type {import('./leadProvider.js').LeadProvider}
 */
export const googleSheetsProvider = {
  name: 'googleSheets',

  isConfigured() {
    if (!envFlag('GOOGLE_SHEETS_ENABLED', true)) return false
    return Boolean((process.env.GOOGLE_SHEETS_WEBHOOK_URL || '').trim())
  },

  async send(lead) {
    if (!envFlag('GOOGLE_SHEETS_ENABLED', true)) {
      logger.debug('googleSheets.skipped', { reason: 'disabled' })
      return { skipped: true }
    }

    const url = (process.env.GOOGLE_SHEETS_WEBHOOK_URL || '').trim()
    if (!url) {
      logger.debug('googleSheets.skipped', { reason: 'missing_credentials' })
      return { skipped: true }
    }

    const secret = (process.env.GOOGLE_SHEETS_WEBHOOK_SECRET || '').trim()
    const payload = {
      secret: secret || undefined,
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

    logger.info('googleSheets.appended', { email: lead.email })
    return { skipped: false }
  },
}

/** @param {import('./leadProvider.js').Lead} lead */
export function appendLead(lead) {
  return googleSheetsProvider.send(lead)
}
