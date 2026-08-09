import { createEnvReader } from './env.js'

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
    lead.id ? line('🆔', 'Lead ID', lead.id) : null,
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
 * @param {Record<string, string>} env
 * @param {{ debug: Function, info: Function }} logger
 */
export function createTelegramProvider(env, logger) {
  const config = createEnvReader(env)

  return {
    name: 'telegram',

    isConfigured() {
      if (!config.flag('TELEGRAM_ENABLED', true)) return false
      return Boolean(config.get('TELEGRAM_BOT_TOKEN') && config.get('TELEGRAM_CHAT_ID'))
    },

    async send(lead) {
      if (!config.flag('TELEGRAM_ENABLED', true)) {
        logger.debug('telegram.skipped', { reason: 'disabled' })
        return { skipped: true }
      }

      const token = config.get('TELEGRAM_BOT_TOKEN')
      const chatId = config.get('TELEGRAM_CHAT_ID')
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

      logger.info('telegram.sent', { email: lead.email, id: lead.id })
      return { skipped: false }
    },
  }
}

export function sendTelegramLead(env, logger, lead) {
  return createTelegramProvider(env, logger).send(lead)
}
