import { getContactEndpoint } from '../data/site'
import { firstErrorMessage, validateContactForm } from './contactValidation'
import { logger } from './logger'

export class ContactSubmissionError extends Error {
  constructor(message, { status = 0, cause = null } = {}) {
    super(message)
    this.name = 'ContactSubmissionError'
    this.status = status
    this.cause = cause
  }
}

/**
 * Submits a validated contact inquiry to the configured endpoint.
 * Supports FormSubmit.co/ajax and Formspree-compatible JSON APIs.
 *
 * @param {object} form
 * @param {'message' | 'schedule_call'} intent
 */
export async function submitContactInquiry(form, intent = 'message') {
  if (intent !== 'message' && intent !== 'schedule_call') {
    throw new ContactSubmissionError('Invalid submission intent.')
  }

  const result = validateContactForm(form)
  if (!result.ok) {
    const message = firstErrorMessage(result.errors)
    logger.warn('contact.validation_failed', { errors: result.errors, intent })
    throw new ContactSubmissionError(message, { status: 400 })
  }

  const endpoint = getContactEndpoint()
  if (!endpoint) {
    logger.error('contact.endpoint_missing')
    throw new ContactSubmissionError(
      'Contact endpoint is not configured. Set VITE_CONTACT_ENDPOINT or VITE_CONTACT_EMAIL.',
    )
  }

  const payload = {
    ...result.value,
    intent,
    _subject:
      intent === 'schedule_call'
        ? `[Schedule Call] ${result.value.company} — ${result.value.name}`
        : `[Inquiry] ${result.value.company} — ${result.value.name}`,
    _template: 'table',
  }

  logger.info('contact.submit_start', { intent, company: result.value.company })

  let response
  try {
    response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    })
  } catch (cause) {
    logger.error('contact.network_error', { intent, error: String(cause) })
    throw new ContactSubmissionError(
      'Unable to reach the contact service. Check your connection and try again.',
      { cause },
    )
  }

  let body = null
  const contentType = response.headers.get('content-type') || ''
  if (contentType.includes('application/json')) {
    try {
      body = await response.json()
    } catch (cause) {
      logger.warn('contact.response_parse_failed', { status: response.status })
      body = null
    }
  }

  if (!response.ok) {
    const remoteMessage =
      (body && (body.message || body.error || body.next)) ||
      `Contact service returned HTTP ${response.status}.`
    logger.error('contact.submit_rejected', {
      status: response.status,
      intent,
      remoteMessage,
    })
    throw new ContactSubmissionError(
      typeof remoteMessage === 'string'
        ? remoteMessage
        : 'The contact service rejected this submission.',
      { status: response.status },
    )
  }

  logger.info('contact.submit_success', { intent, status: response.status })
  return { ok: true, intent, data: body }
}
