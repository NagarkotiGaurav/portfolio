const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_RE = /^[+]?[\d\s().-]{7,20}$/

export const CONTACT_INDUSTRIES = [
  'Software Engineering',
  'Fintech',
  'Industrial Automation',
  'Aerospace',
  'Other',
]

export const CONTACT_TIMELINES = [
  { value: 'q1', label: 'Immediate (Q1)' },
  { value: 'q2', label: 'Next Quarter (Q2)' },
  { value: 'q3', label: 'Planning (Q3+)' },
]

export const CONTACT_BUDGETS = [
  { value: '50k', label: '$50k - $100k' },
  { value: '100k', label: '$100k - $250k' },
  { value: '250k', label: '$250k+' },
]

export const CONTACT_PREFERRED = [
  { value: 'email', label: 'Email' },
  { value: 'phone', label: 'Phone' },
]

export const EMPTY_CONTACT_FORM = {
  message: '',
  problems: '',
  industry: '',
  timeline: '',
  budget: '',
  company: '',
  name: '',
  email: '',
  phone: '',
  preferredContact: 'email',
  /** Honeypot — must stay empty */
  _gotcha: '',
}

/**
 * Client-side validation aligned with server/validation/contactSchema.js
 * Required: name, email, message
 * Optional: phone, company, budget, industry, timeline, problems
 *
 * @param {typeof EMPTY_CONTACT_FORM} form
 * @returns {{ ok: true, value: object } | { ok: false, errors: Record<string, string> }}
 */
export function validateContactForm(form) {
  const errors = {}

  const name = (form.name || '').trim()
  if (!name) errors.name = 'Enter your name.'
  else if (name.length < 2) errors.name = 'Name must be at least 2 characters.'
  else if (name.length > 120) errors.name = 'Name must be 120 characters or fewer.'

  const email = (form.email || '').trim()
  if (!email) errors.email = 'Enter an email address.'
  else if (!EMAIL_RE.test(email) || email.length > 254) {
    errors.email = 'Enter a valid email address.'
  }

  const message = (form.message || form.building || '').trim()
  if (!message) errors.message = 'Describe what you are building or how we can help.'
  else if (message.length < 10) errors.message = 'Please provide at least 10 characters.'
  else if (message.length > 4000) errors.message = 'Message must be 4000 characters or fewer.'

  const problems = (form.problems || '').trim()
  if (problems.length > 4000) {
    errors.problems = 'Roadblocks must be 4000 characters or fewer.'
  }

  const industry = (form.industry || '').trim()
  if (industry && industry.length > 120) {
    errors.industry = 'Industry must be 120 characters or fewer.'
  }

  const timeline = (form.timeline || '').trim()
  if (timeline && timeline.length > 80) {
    errors.timeline = 'Timeline must be 80 characters or fewer.'
  }

  const budget = (form.budget || '').trim()
  if (budget && budget.length > 80) {
    errors.budget = 'Budget must be 80 characters or fewer.'
  }

  const company = (form.company || '').trim()
  if (company.length > 200) errors.company = 'Company name must be 200 characters or fewer.'

  const phone = (form.phone || '').trim()
  if (phone && !PHONE_RE.test(phone)) {
    errors.phone = 'Enter a valid phone number or leave it blank.'
  }

  const preferredContact = (form.preferredContact || 'email').trim()
  if (preferredContact && !CONTACT_PREFERRED.some((p) => p.value === preferredContact)) {
    errors.preferredContact = 'Select a preferred contact method.'
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors }
  }

  const composed =
    problems && message ? `${message}\n\nRoadblocks:\n${problems}` : message

  return {
    ok: true,
    value: {
      name,
      email,
      phone,
      company,
      industry,
      timeline,
      budget,
      preferredContact: preferredContact || 'email',
      message: composed,
      projectType: '',
      _gotcha: typeof form._gotcha === 'string' ? form._gotcha : '',
    },
  }
}

export function firstErrorMessage(errors) {
  const key = Object.keys(errors)[0]
  return key ? errors[key] : 'Please correct the highlighted fields.'
}
