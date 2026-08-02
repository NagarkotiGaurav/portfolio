import { describe, expect, it } from 'vitest'
import {
  EMPTY_CONTACT_FORM,
  firstErrorMessage,
  validateContactForm,
} from './contactValidation'

describe('validateContactForm', () => {
  it('rejects an empty form with field errors', () => {
    const result = validateContactForm(EMPTY_CONTACT_FORM)
    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(result.errors.building).toBeTruthy()
      expect(result.errors.company).toBeTruthy()
      expect(result.errors.name).toBeTruthy()
      expect(result.errors.email).toBeTruthy()
      expect(result.errors.timeline).toBeTruthy()
      expect(result.errors.budget).toBeTruthy()
      expect(firstErrorMessage(result.errors)).toMatch(/building|Describe/i)
    }
  })

  it('rejects short project descriptions', () => {
    const result = validateContactForm({
      ...EMPTY_CONTACT_FORM,
      building: 'Too short',
      company: 'Acme',
      name: 'Ada Lovelace',
      email: 'ada@acme.test',
      timeline: 'q1',
      budget: '50k',
    })
    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(result.errors.building).toMatch(/20 characters/i)
    }
  })

  it('rejects invalid email and phone', () => {
    const result = validateContactForm({
      ...EMPTY_CONTACT_FORM,
      building: 'We need a payments platform rebuild for peak TPS.',
      company: 'Acme',
      name: 'Ada Lovelace',
      email: 'not-an-email',
      phone: 'abc',
      timeline: 'q2',
      budget: '100k',
    })
    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(result.errors.email).toMatch(/valid email/i)
      expect(result.errors.phone).toMatch(/phone/i)
    }
  })

  it('accepts a complete valid payload and trims fields', () => {
    const result = validateContactForm({
      building: '  We need a payments platform rebuild for peak TPS.  ',
      problems: ' Latency under load. ',
      industry: 'Fintech',
      timeline: 'q1',
      budget: '250k',
      company: '  Acme Corp ',
      name: ' Ada Lovelace ',
      email: ' ada@acme.test ',
      phone: '+44 20 7946 0958',
    })
    expect(result.ok).toBe(true)
    if (result.ok) {
      expect(result.value.building.startsWith('We need')).toBe(true)
      expect(result.value.company).toBe('Acme Corp')
      expect(result.value.email).toBe('ada@acme.test')
      expect(result.value.industry).toBe('Fintech')
    }
  })
})
