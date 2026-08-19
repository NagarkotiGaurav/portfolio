import { logger } from '../lib/logger'

/** Public GTM container — also inlined in `index.html` (official install). */
export const GTM_CONTAINER_ID = 'GTM-T45H6MZF'

function pushDataLayer(payload) {
  if (typeof window === 'undefined') return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push(payload)
}

/**
 * Experience-aligned analytics.
 * @see docs/AnalyticsStrategy.md
 *
 * GTM (`GTM-T45H6MZF`) is the primary tag loader. Events go to `dataLayer`.
 * Direct GA4 (`VITE_GA_MEASUREMENT_ID`) is skipped when GTM is already present.
 */
export function track({ event, intent, scene, action, meta, source, service, ...rest } = {}) {
  const payload = {
    event: event || action || 'experience_event',
    intent,
    scene,
    action,
    source,
    service,
    meta,
    ...rest,
    ts: new Date().toISOString(),
  }
  logger.info('analytics.track', payload)
  pushDataLayer(payload)
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', payload.event, payload)
  }
}

/** SPA route change — pair with a GTM trigger on `virtual_page_view`. */
export function trackPageView(pathname) {
  const path = pathname || (typeof window !== 'undefined' ? window.location.pathname : '/')
  track({
    event: 'virtual_page_view',
    page_path: path,
    page_location: typeof window !== 'undefined' ? window.location.href : '',
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

  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID
  if (typeof measurementId !== 'string' || !measurementId.trim()) {
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
