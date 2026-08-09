import { processContact, processHealth } from './functions/lib/handleContact.js'

const JSON_HEADERS = {
  'content-type': 'application/json; charset=utf-8',
  'cache-control': 'no-store',
}

function json(status, body, extraHeaders = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...JSON_HEADERS, ...extraHeaders },
  })
}

function corsHeaders(request, env) {
  const origin = request.headers.get('Origin') || ''
  const allowed = String(env.ALLOWED_ORIGINS || '')
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean)

  const headers = {
    'access-control-allow-methods': 'POST, GET, OPTIONS',
    'access-control-allow-headers': 'content-type, accept',
    'access-control-max-age': '86400',
  }

  if (!origin) return headers
  if (allowed.length === 0 || allowed.includes(origin) || allowed.includes('*')) {
    headers['access-control-allow-origin'] = origin
    headers.vary = 'Origin'
  }
  return headers
}

function isContactPath(pathname) {
  return pathname === '/api/contact' || pathname === '/api/contact/'
}

/**
 * Cloudflare Worker entry — used by `npx wrangler deploy`.
 * Serves /api/contact; static SPA assets use [assets] in wrangler.toml.
 */
export default {
  async fetch(request, env) {
    const url = new URL(request.url)

    if (!isContactPath(url.pathname)) {
      // Non-API: prefer static assets (SPA not_found_handling covers client routes).
      if (env.ASSETS) {
        return env.ASSETS.fetch(request)
      }
      return new Response('Not found', { status: 404 })
    }

    const headers = corsHeaders(request, env)

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers })
    }

    if (request.method === 'GET') {
      const result = processHealth(env)
      return json(result.status, result.body, headers)
    }

    if (request.method === 'POST') {
      let body = {}
      try {
        body = await request.json()
      } catch {
        return json(400, { ok: false, message: 'Request body must be valid JSON.' }, headers)
      }

      const result = await processContact({
        body,
        requestLike: request,
        env,
      })
      return json(result.status, result.body, headers)
    }

    return json(405, { ok: false, message: 'Method not allowed.' }, headers)
  },
}
