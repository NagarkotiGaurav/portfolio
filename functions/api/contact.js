import { processContact, processHealth } from '../lib/handleContact.js'

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

  // Same-origin Pages requests often omit needing CORS; allow listed origins for local Vite.
  if (!origin) return headers
  if (allowed.length === 0 || allowed.includes(origin) || allowed.includes('*')) {
    headers['access-control-allow-origin'] = origin
    headers.vary = 'Origin'
  }
  return headers
}

export async function onRequestOptions(context) {
  return new Response(null, {
    status: 204,
    headers: corsHeaders(context.request, context.env),
  })
}

export async function onRequestGet(context) {
  const result = processHealth(context.env)
  return json(result.status, result.body, corsHeaders(context.request, context.env))
}

export async function onRequestPost(context) {
  const { request, env } = context
  const headers = corsHeaders(request, env)

  let body = {}
  try {
    body = await request.json()
  } catch {
    return json(
      400,
      { ok: false, message: 'Request body must be valid JSON.' },
      headers,
    )
  }

  const result = await processContact({
    body,
    requestLike: request,
    env,
  })

  return json(result.status, result.body, headers)
}
