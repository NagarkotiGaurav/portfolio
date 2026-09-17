import { afterEach, describe, expect, it, vi } from 'vitest'
import {
  ANALYTICS_EVENTS,
  contextFromPath,
  isConversionEvent,
  resetAnalyticsDedupe,
  sanitizeAnalyticsPayload,
  serviceSlugFromNeed,
  track,
  trackInsightOpen,
  trackLeadCreated,
  trackPageView,
  trackServicePageView,
  trackStrategyCall,
} from './analytics'

describe('analytics payload', () => {
  afterEach(() => {
    resetAnalyticsDedupe()
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
  })

  it('drops PII and unknown keys before dataLayer', () => {
    const payload = sanitizeAnalyticsPayload({
      event: ANALYTICS_EVENTS.leadCreated,
      intent: 'hire',
      scene: 'contact',
      action: ANALYTICS_EVENTS.leadCreated,
      service: 'erp-odoo-integration',
      email: 'ada@acme.test',
      phone: '+44 20 7946 0958',
      name: 'Ada Lovelace',
      message: 'We need a rebuild',
      company: 'Acme',
      project: 'We need a rebuild',
      userAgent: 'Mozilla',
      location: 'form',
    })
    expect(payload).toEqual({
      event: ANALYTICS_EVENTS.leadCreated,
      intent: 'hire',
      scene: 'contact',
      action: ANALYTICS_EVENTS.leadCreated,
      service: 'erp-odoo-integration',
      location: 'form',
    })
    expect(payload.email).toBeUndefined()
    expect(payload.message).toBeUndefined()
  })

  it('maps contact chips to service slugs', () => {
    expect(serviceSlugFromNeed('ERP / Odoo')).toBe('erp-odoo-integration')
    expect(serviceSlugFromNeed('Other')).toBe('')
  })

  it('derives scene and service from hire-intent paths', () => {
    expect(contextFromPath('/solutions/erp-odoo-integration')).toEqual({
      scene: 'solutions',
      service: 'erp-odoo-integration',
      content: '',
    })
    expect(contextFromPath('/insights/when-to-build-custom-software')).toEqual({
      scene: 'insights',
      service: '',
      content: 'when-to-build-custom-software',
    })
  })

  it('treats only lead and CTA as conversions', () => {
    expect(isConversionEvent(ANALYTICS_EVENTS.leadCreated)).toBe(true)
    expect(isConversionEvent(ANALYTICS_EVENTS.ctaStrategyCall)).toBe(true)
    expect(isConversionEvent(ANALYTICS_EVENTS.virtualPageView)).toBe(false)
    expect(isConversionEvent(ANALYTICS_EVENTS.servicePageView)).toBe(false)
  })

  it('pushes allowlisted CTA params to dataLayer', () => {
    const dataLayer = []
    vi.stubGlobal('window', { dataLayer })
    trackStrategyCall({
      scene: 'solutions',
      service: 'erp-odoo-integration',
      location: 'hero',
    })
    expect(dataLayer[0]).toMatchObject({
      event: 'cta_strategy_call',
      intent: 'hire',
      scene: 'solutions',
      action: 'cta_strategy_call',
      service: 'erp-odoo-integration',
      location: 'hero',
    })
  })

  it('records SPA page views without query strings', () => {
    const dataLayer = []
    vi.stubGlobal('window', {
      dataLayer,
      location: { origin: 'https://gauravnagarkoti.tech', pathname: '/solutions/erp-odoo-integration' },
    })
    vi.stubGlobal('document', { title: 'ERP & Odoo Integration Consultant | Gaurav Nagarkoti' })
    trackPageView('/solutions/erp-odoo-integration')
    expect(dataLayer[0]).toMatchObject({
      event: 'virtual_page_view',
      scene: 'solutions',
      service: 'erp-odoo-integration',
      page_path: '/solutions/erp-odoo-integration',
      page_location: 'https://gauravnagarkoti.tech/solutions/erp-odoo-integration',
    })
    expect(String(dataLayer[0].page_location)).not.toMatch(/\?/)
  })

  it('strips query strings from SPA page views', () => {
    const dataLayer = []
    vi.stubGlobal('window', {
      dataLayer,
      location: { origin: 'https://gauravnagarkoti.tech', pathname: '/solutions/erp-odoo-integration' },
    })
    vi.stubGlobal('document', { title: 'ERP & Odoo Integration Consultant | Gaurav Nagarkoti' })
    trackPageView('/solutions/erp-odoo-integration?utm_source=google')
    expect(dataLayer[0].page_path).toBe('/solutions/erp-odoo-integration')
    expect(dataLayer[0].page_location).toBe(
      'https://gauravnagarkoti.tech/solutions/erp-odoo-integration',
    )
  })

  it('records service and insight engagement events', () => {
    expect(trackServicePageView('erp-odoo-integration')).toMatchObject({
      event: 'service_page_view',
      intent: 'hire',
      scene: 'solutions',
      service: 'erp-odoo-integration',
    })
    resetAnalyticsDedupe()
    expect(trackInsightOpen('when-to-build-custom-software')).toMatchObject({
      event: 'insight_open',
      intent: 'trust',
      scene: 'insights',
      content: 'when-to-build-custom-software',
    })
  })

  it('lead helper never includes contact copy', () => {
    const payload = trackLeadCreated({
      service: 'custom-software-development',
      leadMethod: 'message',
      budget: '50k',
    })
    expect(payload.event).toBe('lead_created')
    expect(payload.service).toBe('custom-software-development')
    expect(payload.lead_method).toBe('message')
    expect(payload.message).toBeUndefined()
    expect(payload.email).toBeUndefined()
  })

  it('track() returns the sanitized payload', () => {
    const payload = track({
      event: 'cta_strategy_call',
      email: 'hidden@example.com',
      intent: 'hire',
    })
    expect(payload.email).toBeUndefined()
    expect(payload.intent).toBe('hire')
  })
})
