import { describe, expect, it } from 'vitest'
import {
  EMPTY_CONTACT_FORM,
  firstErrorMessage,
  validateContactForm,
} from './contactValidation'

describe('validateContactForm', () => {
  it('requires only name, email, and message', () => {
    const result = validateContactForm(EMPTY_CONTACT_FORM)
    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(result.errors.message).toBeTruthy()
      expect(result.errors.name).toBeTruthy()
      expect(result.errors.email).toBeTruthy()
      expect(result.errors.company).toBeUndefined()
      expect(result.errors.timeline).toBeUndefined()
      expect(result.errors.budget).toBeUndefined()
      expect(firstErrorMessage(result.errors)).toBeTruthy()
    }
  })

  it('rejects short messages', () => {
    const result = validateContactForm({
      ...EMPTY_CONTACT_FORM,
      message: 'Too short',
      name: 'Ada Lovelace',
      email: 'ada@acme.test',
    })
    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(result.errors.message).toMatch(/10 characters/i)
    }
  })

  it('rejects invalid email and phone', () => {
    const result = validateContactForm({
      ...EMPTY_CONTACT_FORM,
      message: 'We need a payments platform rebuild for peak TPS.',
      name: 'Ada Lovelace',
      email: 'not-an-email',
      phone: 'abc',
    })
    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(result.errors.email).toMatch(/valid email/i)
      expect(result.errors.phone).toMatch(/phone/i)
    }
  })

  it('accepts a valid minimal payload and trims fields', () => {
    const result = validateContactForm({
      message: '  We need a payments platform rebuild for peak TPS.  ',
      problems: ' Latency under load. ',
      industry: 'Custom software',
      timeline: 'q1',
      budget: '250k',
      company: '  Acme Corp ',
      name: ' Ada Lovelace ',
      email: ' ada@acme.test ',
      phone: '+44 20 7946 0958',
      preferredContact: 'email',
      _gotcha: '',
    })
    expect(result.ok).toBe(true)
    if (result.ok) {
      expect(result.value.message).toMatch(/We need/)
      expect(result.value.message).toMatch(/Roadblocks/)
      expect(result.value.company).toBe('Acme Corp')
      expect(result.value.email).toBe('ada@acme.test')
      expect(result.value.industry).toBe('Custom software')
    }
  })
})
