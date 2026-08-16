import { logger } from '../lib/logger'

/**
 * Experience-aligned analytics. Vendor-agnostic until GA is wired.
 * @see docs/AnalyticsStrategy.md
 *
 * Supports both experience events and lead funnel events:
 *   track({ event: 'lead_created', source: 'website', service: 'consulting' })
 *   track({ intent, scene, action, meta })
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
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', payload.event, payload)
  }
}

/**
 * Load GA4 when `VITE_GA_MEASUREMENT_ID` is set (e.g. G-XXXXXXXX).
 * Safe no-op when unset. Call once at app boot.
 */
export function initAnalytics() {
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID
  if (typeof measurementId !== 'string' || !measurementId.trim()) {
    logger.debug('analytics.ga_skipped', { reason: 'no_measurement_id' })
    return
  }
  if (typeof window === 'undefined' || typeof document === 'undefined') return
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
