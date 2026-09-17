import { logger } from '../lib/logger'

/** Public GTM container — also inlined in `index.html` (official install). */
export const GTM_CONTAINER_ID = 'GTM-T45H6MZF'

/** GA4 event names. Conversions: lead_created, cta_strategy_call. */
export const ANALYTICS_EVENTS = {
  virtualPageView: 'virtual_page_view',
  servicePageView: 'service_page_view',
  ctaStrategyCall: 'cta_strategy_call',
  leadCreated: 'lead_created',
  caseStudyOpen: 'case_study_open',
  insightOpen: 'insight_open',
}

const CONVERSION_EVENTS = new Set([
  ANALYTICS_EVENTS.ctaStrategyCall,
  ANALYTICS_EVENTS.leadCreated,
])

/** Contact form chips → service slug (no free-text). */
export const SERVICE_SLUG_BY_NEED = {
  'Custom software': 'custom-software-development',
  'Web applications': 'web-application-development',
  'Business automation': 'business-automation',
  'ERP / Odoo': 'erp-odoo-integration',
  'Ecommerce & payments': 'ecommerce-payments',
  Architecture: 'software-architecture',
}

const ALLOWED_PARAMS = new Set([
  'event',
  'intent',
  'scene',
  'action',
  'service',
  'location',
  'source',
  'page_path',
  'page_title',
  'page_location',
  'content',
  'lead_method',
  'budget',
])

const PII_KEYS = new Set([
  'email',
  'phone',
  'name',
  'firstName',
  'lastName',
  'fullName',
  'userEmail',
  'message',
  'problems',
  'company',
  'address',
  'userAgent',
  'project',
])

function pushDataLayer(payload) {
  if (typeof window === 'undefined') return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push(payload)
}

function asTrimmedString(value) {
  if (typeof value !== 'string') return ''
  return value.trim()
}

/**
 * Keep GA4 params non-PII and allowlisted. Extra keys are dropped, never forwarded.
 */
export function sanitizeAnalyticsPayload(input = {}) {
  const event = asTrimmedString(input.event) || asTrimmedString(input.action) || 'experience_event'
  const out = { event }

  for (const [key, value] of Object.entries(input)) {
    if (key === 'event') continue
    if (PII_KEYS.has(key)) continue
    if (!ALLOWED_PARAMS.has(key)) continue
    if (value == null || value === '') continue
    if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
      out[key] = typeof value === 'string' ? value.trim() : value
    }
  }

  return out
}

export function serviceSlugFromNeed(label) {
  const key = asTrimmedString(label)
  return SERVICE_SLUG_BY_NEED[key] || ''
}

export function contextFromPath(pathname = '/') {
  const path = pathname === '' ? '/' : pathname.replace(/\/$/, '') || '/'
  const parts = path.split('/').filter(Boolean)
  const scene = parts[0] || 'home'

  if (parts[0] === 'solutions' && parts[1]) {
    return { scene: 'solutions', service: parts[1], content: '' }
  }
  if (parts[0] === 'insights' && parts[1]) {
    return { scene: 'insights', service: '', content: parts[1] }
  }
  if (parts[0] === 'work' && parts[1]) {
    return { scene: 'work', service: '', content: parts[1] }
  }
  return { scene, service: '', content: '' }
}

function pathWithoutQuery(pathname) {
  if (typeof pathname !== 'string' || !pathname) return '/'
  const noHash = pathname.split('#')[0] || '/'
  return noHash.split('?')[0] || '/'
}

function pageLocationFromPath(pathname) {
  if (typeof window === 'undefined' || !window.location) return pathname
  return `${window.location.origin}${pathname}`
}

let lastTrackKey = ''
let lastTrackAt = 0

function shouldSkipDuplicate(payload) {
  const key = JSON.stringify(payload)
  const now = Date.now()
  if (key === lastTrackKey && now - lastTrackAt < 100) return true
  lastTrackKey = key
  lastTrackAt = now
  return false
}

/** Test-only: Strict Mode dedupe must not leak across cases. */
export function resetAnalyticsDedupe() {
  lastTrackKey = ''
  lastTrackAt = 0
}

/**
 * Experience-aligned analytics. GTM (`GTM-T45H6MZF`) is the only GA4 loader.
 * Events go to `dataLayer` only — do not also call gtag() (double-counts with GTM tags).
 * @see docs/AnalyticsStrategy.md
 */
export function track(input = {}) {
  const payload = sanitizeAnalyticsPayload(input)
  if (shouldSkipDuplicate(payload)) {
    logger.debug('analytics.deduped', payload)
    return payload
  }
  logger.info('analytics.track', payload)
  pushDataLayer(payload)
  return payload
}

export function isConversionEvent(eventName) {
  return CONVERSION_EVENTS.has(eventName)
}

export function trackStrategyCall({ scene, service, location = 'cta_band', content } = {}) {
  return track({
    event: ANALYTICS_EVENTS.ctaStrategyCall,
    intent: 'hire',
    scene,
    action: ANALYTICS_EVENTS.ctaStrategyCall,
    service,
    location,
    content,
  })
}

export function trackServicePageView(service) {
  return track({
    event: ANALYTICS_EVENTS.servicePageView,
    intent: 'hire',
    scene: 'solutions',
    action: ANALYTICS_EVENTS.servicePageView,
    service,
  })
}

export function trackInsightOpen(content) {
  return track({
    event: ANALYTICS_EVENTS.insightOpen,
    intent: 'trust',
    scene: 'insights',
    action: ANALYTICS_EVENTS.insightOpen,
    content,
  })
}

export function trackCaseStudyOpen(content) {
  return track({
    event: ANALYTICS_EVENTS.caseStudyOpen,
    intent: 'trust',
    scene: 'work',
    action: ANALYTICS_EVENTS.caseStudyOpen,
    content,
  })
}

export function trackLeadCreated({ service, leadMethod = 'message', budget } = {}) {
  return track({
    event: ANALYTICS_EVENTS.leadCreated,
    intent: 'hire',
    scene: 'contact',
    action: ANALYTICS_EVENTS.leadCreated,
    service,
    location: 'form',
    lead_method: leadMethod,
    budget,
    source: 'website',
  })
}

/**
 * SPA route change. Prefer this Custom Event in GTM — do not also use History Change
 * or you will double-count page views.
 */
export function trackPageView(pathname) {
  const raw = pathname || (typeof window !== 'undefined' ? window.location.pathname : '/')
  const path = pathWithoutQuery(raw)
  const { scene, service, content } = contextFromPath(path)
  return track({
    event: ANALYTICS_EVENTS.virtualPageView,
    intent: 'explore',
    scene,
    action: ANALYTICS_EVENTS.virtualPageView,
    service,
    content,
    page_path: path,
    page_location: pageLocationFromPath(path),
    page_title: typeof document !== 'undefined' ? document.title : '',
  })
}

function gtmIsInstalled() {
  if (typeof document === 'undefined') return false
  return Boolean(
    document.querySelector(`script[src*="googletagmanager.com/gtm.js?id=${GTM_CONTAINER_ID}"]`) ||
      document.querySelector(`iframe[src*="googletagmanager.com/ns.html?id=${GTM_CONTAINER_ID}"]`),
  )
}

/**
 * Optional direct GA4 when GTM is not on the page.
 * Prefer loading GA4 inside GTM (container GTM-T45H6MZF).
 */
export function initAnalytics() {
  if (typeof window === 'undefined' || typeof document === 'undefined') return
  if (gtmIsInstalled()) {
    window.dataLayer = window.dataLayer || []
    logger.debug('analytics.gtm_present', { id: GTM_CONTAINER_ID })
    return
  }

  const env = import.meta.env
  const measurementId = env && typeof env.VITE_GA_MEASUREMENT_ID === 'string' ? env.VITE_GA_MEASUREMENT_ID : ''
  if (!measurementId.trim()) {
    logger.debug('analytics.ga_skipped', { reason: 'no_measurement_id' })
    return
  }
  if (window.__gaInitialized) return

  const id = measurementId.trim()
  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() {
    window.dataLayer.push(arguments)
  }
  window.gtag('js', new Date())
  window.gtag('config', id, { anonymize_ip: true })

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`
  document.head.appendChild(script)
  window.__gaInitialized = true
  logger.info('analytics.ga_initialized', { id })
}

export default track
