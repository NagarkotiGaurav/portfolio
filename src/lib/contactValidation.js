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

export const EMPTY_CONTACT_FORM = {
  building: '',
  problems: '',
  industry: 'Software Engineering',
  timeline: '',
  budget: '',
  company: '',
  name: '',
  email: '',
  phone: '',
}

/**
 * @param {typeof EMPTY_CONTACT_FORM} form
 * @returns {{ ok: true, value: object } | { ok: false, errors: Record<string, string> }}
 */
export function validateContactForm(form) {
  const errors = {}

  const building = (form.building || '').trim()
  if (!building) {
    errors.building = 'Describe what you are building.'
  } else if (building.length < 20) {
    errors.building = 'Please provide at least 20 characters about the project.'
  } else if (building.length > 4000) {
    errors.building = 'Project description must be 4000 characters or fewer.'
  }

  const problems = (form.problems || '').trim()
  if (problems.length > 4000) {
    errors.problems = 'Roadblocks must be 4000 characters or fewer.'
  }

  if (!CONTACT_INDUSTRIES.includes(form.industry)) {
    errors.industry = 'Select a valid industry domain.'
  }

  if (!form.timeline || !CONTACT_TIMELINES.some((t) => t.value === form.timeline)) {
    errors.timeline = 'Select a timeline expectation.'
  }

  if (!form.budget || !CONTACT_BUDGETS.some((b) => b.value === form.budget)) {
    errors.budget = 'Select a budget allocation.'
  }

  const company = (form.company || '').trim()
  if (!company) {
    errors.company = 'Enter your company or organization.'
  } else if (company.length > 200) {
    errors.company = 'Company name must be 200 characters or fewer.'
  }

  const name = (form.name || '').trim()
  if (!name) {
    errors.name = 'Enter a representative name.'
  } else if (name.length < 2) {
    errors.name = 'Name must be at least 2 characters.'
  } else if (name.length > 120) {
    errors.name = 'Name must be 120 characters or fewer.'
  }

  const email = (form.email || '').trim()
  if (!email) {
    errors.email = 'Enter an email address.'
  } else if (!EMAIL_RE.test(email) || email.length > 254) {
    errors.email = 'Enter a valid email address.'
  }

  const phone = (form.phone || '').trim()
  if (phone && !PHONE_RE.test(phone)) {
    errors.phone = 'Enter a valid phone number or leave it blank.'
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors }
  }

  return {
    ok: true,
    value: {
      building,
      problems,
      industry: form.industry,
      timeline: form.timeline,
      budget: form.budget,
      company,
      name,
      email,
      phone,
    },
  }
}

export function firstErrorMessage(errors) {
  const key = Object.keys(errors)[0]
  return key ? errors[key] : 'Please correct the highlighted fields.'
}
