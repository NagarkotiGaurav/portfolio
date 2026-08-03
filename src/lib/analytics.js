import { logger } from '../lib/logger'

/**
 * Experience-aligned analytics. Vendor-agnostic for now.
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

export default track
