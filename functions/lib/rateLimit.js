const RATE_WINDOW_MS = 15 * 60 * 1000
const RATE_MAX = 5
const rateBuckets = new Map()

/**
 * 5 submissions / 15 minutes / IP (best-effort per isolate).
 * @param {string} key
 */
export function isRateLimited(key) {
  const now = Date.now()
  const bucket = rateBuckets.get(key) || []
  const recent = bucket.filter((ts) => now - ts < RATE_WINDOW_MS)
  recent.push(now)
  rateBuckets.set(key, recent)
  return recent.length > RATE_MAX
}
