const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_RE = /^[+]?[\d\s().-]{7,20}$/

const CONTACT_INDUSTRIES = [
  'Software Engineering',
  'Fintech',
  'Industrial Automation',
  'Aerospace',
  'Other',
]

const CONTACT_TIMELINES = new Set(['q1', 'q2', 'q3', 'Immediate (Q1)', 'Next Quarter (Q2)', 'Planning (Q3+)'])
const CONTACT_BUDGETS = new Set([
  '50k',
  '100k',
  '250k',
  '$50k - $100k',
  '$100k - $250k',
  '$250k+',
])

/**
 * Validate contact request body.
 * Required: name, email, message
 * Optional: phone, company, budget, industry, timeline, and tracking fields
 *
 * @param {object} body
 * @returns {{ ok: true, value: object } | { ok: false, errors: Record<string, string> }}
 */
export function validateContactBody(body = {}) {
  const errors = {}

  const name = String(body.name || '').trim()
  if (!name) errors.name = 'Enter your name.'
  else if (name.length < 2) errors.name = 'Name must be at least 2 characters.'
  else if (name.length > 120) errors.name = 'Name must be 120 characters or fewer.'

  const email = String(body.email || '').trim()
  if (!email) errors.email = 'Enter an email address.'
  else if (!EMAIL_RE.test(email) || email.length > 254) errors.email = 'Enter a valid email address.'

  // Accept either `message` or legacy `building`
  const message = String(body.message || body.building || '').trim()
  if (!message) errors.message = 'Describe what you are building or how we can help.'
  else if (message.length < 10) errors.message = 'Please provide at least 10 characters.'
  else if (message.length > 4000) errors.message = 'Message must be 4000 characters or fewer.'

  const phone = String(body.phone || '').trim()
  if (phone && !PHONE_RE.test(phone)) {
    errors.phone = 'Enter a valid phone number or leave it blank.'
  }

  const company = String(body.company || '').trim()
  if (company.length > 200) errors.company = 'Company name must be 200 characters or fewer.'

  const industry = String(body.industry || '').trim()
  if (industry && !CONTACT_INDUSTRIES.includes(industry)) {
    errors.industry = 'Select a valid industry domain.'
  }

  const timeline = String(body.timeline || '').trim()
  if (timeline && !CONTACT_TIMELINES.has(timeline)) {
    errors.timeline = 'Select a valid timeline.'
  }

  const budget = String(body.budget || '').trim()
  if (budget && !CONTACT_BUDGETS.has(budget)) {
    errors.budget = 'Select a valid budget range.'
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors }
  }

  const problems = String(body.problems || '').trim()
  const composedMessage =
    problems && message ? `${message}\n\nRoadblocks:\n${problems}` : message || problems

  return {
    ok: true,
    value: {
      name,
      email,
      phone,
      company,
      industry,
      projectType: String(body.projectType || body.intent || '').trim(),
      budget,
      timeline,
      preferredContact: String(body.preferredContact || 'email').trim() || 'email',
      message: composedMessage,
      source: String(body.source || 'website').trim() || 'website',
      userAgent: String(body.userAgent || '').trim(),
      referrer: String(body.referrer || '').trim(),
      intent: body.intent === 'schedule_call' ? 'schedule_call' : 'message',
      utm: normalizeUtm(body.utm),
      _gotcha: typeof body._gotcha === 'string' ? body._gotcha : '',
    },
  }
}

function normalizeUtm(utm) {
  const src = utm && typeof utm === 'object' ? utm : {}
  return {
    source: String(src.source || '').trim(),
    medium: String(src.medium || '').trim(),
    campaign: String(src.campaign || '').trim(),
    term: String(src.term || '').trim(),
    content: String(src.content || '').trim(),
  }
}

export function firstErrorMessage(errors) {
  const key = Object.keys(errors)[0]
  return key ? errors[key] : 'Please correct the highlighted fields.'
}
