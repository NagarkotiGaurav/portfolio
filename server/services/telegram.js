import { logger } from '../utils/logger.js'

function envFlag(name, fallback = true) {
  const raw = process.env[name]
  if (raw === undefined || raw === '') return fallback
  return !['0', 'false', 'off', 'no'].includes(String(raw).toLowerCase())
}

function escapeHtml(value) {
  return String(value || '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
}

function line(emoji, label, value) {
  if (!value) return null
  return `${emoji} <b>${label}</b>\n${escapeHtml(value)}`
}

export function formatTelegramLeadMessage(lead) {
  const blocks = [
    '🚀 <b>New Portfolio Lead</b>',
    '',
    line('👤', 'Name', lead.name),
    line('📧', 'Email', lead.email),
    line('🏢', 'Company', lead.company),
    line('📱', 'Phone', lead.phone),
    line('💼', 'Project', lead.projectType || lead.industry),
    line('💰', 'Budget', lead.budget),
    line('⏰', 'Timeline', lead.timeline),
    line('📝', 'Message', lead.message),
    line('🌐', 'Source', lead.source),
    line('🕒', 'Time', lead.timestamp),
  ].filter(Boolean)

  return blocks.join('\n\n')
}

/**
 * @type {import('./leadProvider.js').LeadProvider}
 */
export const telegramProvider = {
  name: 'telegram',

  isConfigured() {
    if (!envFlag('TELEGRAM_ENABLED', true)) return false
    return Boolean(
      (process.env.TELEGRAM_BOT_TOKEN || '').trim() &&
        (process.env.TELEGRAM_CHAT_ID || '').trim(),
    )
  },

  async send(lead) {
    if (!envFlag('TELEGRAM_ENABLED', true)) {
      logger.debug('telegram.skipped', { reason: 'disabled' })
      return { skipped: true }
    }

    const token = (process.env.TELEGRAM_BOT_TOKEN || '').trim()
    const chatId = (process.env.TELEGRAM_CHAT_ID || '').trim()
    if (!token || !chatId) {
      logger.debug('telegram.skipped', { reason: 'missing_credentials' })
      return { skipped: true }
    }

    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: formatTelegramLeadMessage(lead),
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      }),
    })

    const body = await response.json().catch(() => ({}))
    if (!response.ok || !body.ok) {
      const detail = body.description || `HTTP ${response.status}`
      throw new Error(`Telegram: ${detail}`)
    }

    logger.info('telegram.sent', { email: lead.email })
    return { skipped: false }
  },
}

/** @param {import('./leadProvider.js').Lead} lead */
export function sendTelegramLead(lead) {
  return telegramProvider.send(lead)
}
