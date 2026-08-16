import { useState } from 'react'
import Icon from '../components/Icon'
import { BRAND, getCalendlyUrl } from '../data/site'
import { CONTACT_FAQS } from '../data/faq'
import { usePageMeta } from '../hooks/usePageMeta'
import {
  CONTACT_BUDGETS,
  CONTACT_INDUSTRIES,
  CONTACT_PREFERRED,
  CONTACT_TIMELINES,
  EMPTY_CONTACT_FORM,
} from '../lib/contactValidation'
import { ContactSubmissionError, submitContactInquiry } from '../lib/contactService'
import { track } from '../lib/analytics'
import { logger } from '../lib/logger'
import { assertSceneBudget } from '../motion/SceneRegistry'
import { Atmosphere, FocusHeadline, Parallax, ScrollOnce } from '../motion/patterns'

export default function Contact() {
  usePageMeta('/contact')
  assertSceneBudget('contact', ['cta'])
  const [form, setForm] = useState(EMPTY_CONTACT_FORM)
  const [fieldErrors, setFieldErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')
  const [lastIntent, setLastIntent] = useState('message')
  const calendlyUrl = getCalendlyUrl()

  const setField = (key) => (e) => {
    const value = e.target.value
    setForm((f) => ({ ...f, [key]: value }))
    setFieldErrors((errs) => {
      if (!errs[key]) return errs
      const next = { ...errs }
      delete next[key]
      return next
    })
  }

  async function handleSubmit(e, intent) {
    e.preventDefault()
    setStatus('submitting')
    setError('')
    setFieldErrors({})
    setLastIntent(intent)

    try {
      await submitContactInquiry(form, intent)
      setStatus('success')
      setForm(EMPTY_CONTACT_FORM)
      track({
        event: 'lead_created',
        source: 'website',
        service: 'consulting',
        intent,
        project: form.industry || form.message?.slice(0, 40) || '',
        budget: form.budget || '',
        industry: form.industry || '',
      })
      logger.info('contact.ui_success', { intent })
    } catch (err) {
      if (err instanceof ContactSubmissionError && err.status === 400) {
        setStatus('error')
        setError(err.message)
        logger.warn('contact.ui_validation', { message: err.message })
        return
      }
      const message =
        err instanceof ContactSubmissionError
          ? err.message
          : 'Something went wrong while sending your inquiry. Please try again.'
      setStatus('error')
      setError(message)
      logger.error('contact.ui_failure', { message, intent })
    }
  }

  function openCalendar() {
    if (!calendlyUrl) {
      setError('Scheduling calendar is not configured. Use Send Message or email me directly.')
      setStatus('error')
      logger.warn('contact.calendly_missing')
      return
    }
    logger.info('contact.calendly_open', { url: calendlyUrl })
    window.open(calendlyUrl, '_blank', 'noopener,noreferrer')
  }

  const submitting = status === 'submitting'

  return (
    <div className="relative overflow-hidden">
      <Parallax speed={0.08} className="pointer-events-none absolute inset-0 h-[70vh]">
        <Atmosphere />
      </Parallax>
      <div className="relative pt-16 pb-section-gap md:pb-section-gap-lg px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        <ScrollOnce className="lg:col-span-5 lg:sticky lg:top-32 h-fit">
          <div className="mb-8 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary inline-block" />
            <span className="font-mono-data text-mono-data text-on-surface-variant">
              AVAILABLE FOR NEW PROJECTS
            </span>
          </div>
          <FocusHeadline
            as="h1"
            className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-6"
            lines={['Let’s talk', 'about the work.']}
          />
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-12 max-w-md">
            Share what you’re building and what’s blocking you. I’ll respond personally — usually
            within 24 hours.
          </p>
          <div className="space-y-6 lg:block">
            <div>
              <h3 className="font-label-caps text-label-caps text-on-surface-variant mb-1">
                BASED
              </h3>
              <p className="font-body-md text-body-md text-primary">{BRAND.location}</p>
            </div>
            <div>
              <h3 className="font-label-caps text-label-caps text-on-surface-variant mb-1">
                DIRECT EMAIL
              </h3>
              <a
                href={`mailto:${BRAND.email}`}
                className="font-body-md text-body-md text-primary hover:opacity-80"
              >
                {BRAND.email}
              </a>
            </div>
          </div>
        </ScrollOnce>

        <ScrollOnce delay={100} className="lg:col-span-7 bg-surface-container-lowest p-5 sm:p-8 md:p-12 border border-outline-variant/30 relative min-w-0">
          <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-primary -translate-x-px -translate-y-px" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-primary translate-x-px -translate-y-px" />

          {status === 'success' ? (
            <div className="py-16 text-center space-y-6" role="status">
              <Icon name="check_circle" className="text-4xl text-primary" filled />
              <h2 className="font-headline-md text-headline-md text-primary">
                {lastIntent === 'schedule_call' ? 'Call request received' : 'Transmission received'}
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-md mx-auto">
                Thanks for reaching out. I typically respond within 24 hours.
              </p>
              {calendlyUrl && lastIntent === 'schedule_call' && (
                <button type="button" className="btn-primary" onClick={openCalendar}>
                  Open calendar
                  <Icon name="calendar_today" className="text-[18px]" />
                </button>
              )}
              <button type="button" className="btn-secondary" onClick={() => setStatus('idle')}>
                Send another message
              </button>
            </div>
          ) : (
            <form
              className="space-y-12"
              onSubmit={(e) => handleSubmit(e, 'message')}
              noValidate
              aria-busy={submitting}
            >
              <div className="space-y-8">
                <div className="flex items-center gap-4 border-b border-outline-variant/50 pb-2 mb-6">
                  <span className="font-mono-data text-mono-data text-primary">01</span>
                  <h2 className="font-label-caps text-label-caps text-primary uppercase">
                    Project Context
                  </h2>
                </div>
                <div>
                  <label className="form-label" htmlFor="message">
                    What are you building?
                  </label>
                  <textarea
                    id="message"
                    className="form-input resize-none"
                    placeholder="Describe the core objective or product..."
                    rows={3}
                    value={form.message}
                    onChange={setField('message')}
                    aria-invalid={Boolean(fieldErrors.message)}
                    disabled={submitting}
                    required
                  />
                  {fieldErrors.message && (
                    <p className="mt-2 text-error font-mono-data text-mono-data" role="alert">
                      {fieldErrors.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="form-label" htmlFor="problems">
                    Current roadblocks / problems
                  </label>
                  <textarea
                    id="problems"
                    className="form-input resize-none"
                    placeholder="What technical or strategic hurdles are you facing?"
                    rows={3}
                    value={form.problems}
                    onChange={setField('problems')}
                    disabled={submitting}
                  />
                </div>
                <div>
                  <p className="form-label mb-4" id="industry-label">
                    Industry domain
                  </p>
                  <div
                    className="flex flex-wrap gap-2"
                    role="group"
                    aria-labelledby="industry-label"
                  >
                    {CONTACT_INDUSTRIES.map((ind) => (
                      <button
                        key={ind}
                        type="button"
                        className={form.industry === ind ? 'chip-selected' : 'chip-unselected'}
                        aria-pressed={form.industry === ind}
                        disabled={submitting}
                        onClick={() =>
                          setForm((f) => ({
                            ...f,
                            industry: f.industry === ind ? '' : ind,
                          }))
                        }
                      >
                        {ind}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-8 pt-8">
                <div className="flex items-center gap-4 border-b border-outline-variant/50 pb-2 mb-6">
                  <span className="font-mono-data text-mono-data text-primary">02</span>
                  <h2 className="font-label-caps text-label-caps text-primary uppercase">
                    Parameters
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="form-label" htmlFor="timeline">
                      Timeline expectation
                    </label>
                    <select
                      id="timeline"
                      className="form-input appearance-none bg-transparent"
                      value={form.timeline}
                      onChange={setField('timeline')}
                      disabled={submitting}
                    >
                      <option value="">Select timeline (optional)</option>
                      {CONTACT_TIMELINES.map((t) => (
                        <option key={t.value} value={t.value}>
                          {t.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="form-label" htmlFor="budget">
                      Budget allocation (USD)
                    </label>
                    <select
                      id="budget"
                      className="form-input appearance-none bg-transparent"
                      value={form.budget}
                      onChange={setField('budget')}
                      disabled={submitting}
                    >
                      <option value="">Select range (optional)</option>
                      {CONTACT_BUDGETS.map((b) => (
                        <option key={b.value} value={b.value}>
                          {b.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="space-y-8 pt-8">
                <div className="flex items-center gap-4 border-b border-outline-variant/50 pb-2 mb-6">
                  <span className="font-mono-data text-mono-data text-primary">03</span>
                  <h2 className="font-label-caps text-label-caps text-primary uppercase">
                    Entity Details
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="form-label" htmlFor="company">
                      Company / organization
                    </label>
                    <input
                      id="company"
                      className="form-input"
                      placeholder="e.g. Acme Corp (optional)"
                      type="text"
                      value={form.company}
                      onChange={setField('company')}
                      disabled={submitting}
                      autoComplete="organization"
                    />
                  </div>
                  <div>
                    <label className="form-label" htmlFor="name">
                      Your name
                    </label>
                    <input
                      id="name"
                      className="form-input"
                      placeholder="First Last"
                      type="text"
                      value={form.name}
                      onChange={setField('name')}
                      disabled={submitting}
                      required
                      autoComplete="name"
                    />
                  </div>
                </div>
                <div>
                  <p className="form-label mb-4">Preferred contact method</p>
                  <div className="flex flex-wrap gap-2 mb-6" role="group">
                    {CONTACT_PREFERRED.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        className={
                          form.preferredContact === opt.value
                            ? 'chip-selected'
                            : 'chip-unselected'
                        }
                        aria-pressed={form.preferredContact === opt.value}
                        disabled={submitting}
                        onClick={() => setForm((f) => ({ ...f, preferredContact: opt.value }))}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="sr-only" htmlFor="email">
                        Email address
                      </label>
                      <input
                        id="email"
                        className="form-input"
                        placeholder="Email Address"
                        type="email"
                        value={form.email}
                        onChange={setField('email')}
                        disabled={submitting}
                        required
                        autoComplete="email"
                      />
                      {fieldErrors.email && (
                        <p className="mt-2 text-error font-mono-data text-mono-data" role="alert">
                          {fieldErrors.email}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="sr-only" htmlFor="phone">
                        Phone number
                      </label>
                      <input
                        id="phone"
                        className="form-input"
                        placeholder="Phone Number (Optional)"
                        type="tel"
                        value={form.phone}
                        onChange={setField('phone')}
                        disabled={submitting}
                        autoComplete="tel"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Honeypot — hidden from users; bots that fill it are ignored server-side */}
              <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
                <label htmlFor="company_website">Company website</label>
                <input
                  id="company_website"
                  name="_gotcha"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form._gotcha}
                  onChange={setField('_gotcha')}
                />
              </div>

              {status === 'error' && error && (
                <p className="font-mono-data text-mono-data text-error" role="alert">
                  {error}
                </p>
              )}

              <div className="pt-8 border-t border-outline-variant/30 flex flex-col sm:flex-row gap-4 items-center justify-between">
                <p className="font-mono-data text-mono-data text-on-surface-variant/70 text-center sm:text-left text-sm max-w-[250px]">
                  Transmission is secure. I typically respond within 24 hours.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                  <button className="btn-secondary w-full sm:w-auto" type="submit" disabled={submitting}>
                    {submitting && lastIntent === 'message' ? 'Sending…' : 'Send Message'}
                    <Icon name="send" className="text-[18px]" />
                  </button>
                  <button
                    className="btn-primary w-full sm:w-auto"
                    type="button"
                    disabled={submitting}
                    onClick={(e) => {
                      if (calendlyUrl) {
                        openCalendar()
                        return
                      }
                      handleSubmit(e, 'schedule_call')
                    }}
                  >
                    {submitting && lastIntent === 'schedule_call' ? 'Requesting…' : 'Schedule Call'}
                    <Icon name="calendar_today" className="text-[18px]" />
                  </button>
                </div>
              </div>
            </form>
          )}
        </ScrollOnce>
      </div>

      <section
        className="mt-section-gap md:mt-section-gap-lg max-w-container-max mx-auto w-full px-margin-mobile md:px-margin-desktop pb-section-gap md:pb-section-gap-lg"
        aria-labelledby="contact-faq-heading"
      >
        <ScrollOnce>
          <h2
            id="contact-faq-heading"
            className="font-headline-md text-headline-md text-primary mb-8"
          >
            Frequently asked questions
          </h2>
          <dl className="space-y-6 max-w-3xl">
            {CONTACT_FAQS.map((faq) => (
              <div
                key={faq.question}
                className="border-b border-outline-variant pb-6 last:border-b-0"
              >
                <dt className="font-headline-sm text-headline-sm text-on-surface mb-2">
                  {faq.question}
                </dt>
                <dd className="font-body-md text-body-md text-on-surface-variant m-0">
                  {faq.answer}
                </dd>
              </div>
            ))}
          </dl>
        </ScrollOnce>
      </section>
      </div>
    </div>
  )
}
