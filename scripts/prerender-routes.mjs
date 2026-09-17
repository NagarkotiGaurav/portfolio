#!/usr/bin/env node
/**
 * Writes per-route HTML shells under dist/ so crawlers see unique
 * <title>, meta description, canonical, H1, and body text without JS.
 *
 * Cloudflare SPA fallback still applies for unknown paths; known routes
 * are served as dist/<path>/index.html when present.
 */
import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { PAGE_META, PRERENDER_PATHS, getBreadcrumbTrail } from '../src/data/pageMeta.js'
import { OG_IMAGE_PATH } from '../src/data/site.js'
import { buildOrganizationJsonLd } from '../src/data/seo.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')
const dist = resolve(root, 'dist')
const siteUrl = (process.env.VITE_SITE_URL || 'https://gauravnagarkoti.tech').replace(/\/$/, '')

const NAV = [
  ['Home', '/'],
  ['Solutions', '/solutions'],
  ['Work', '/work'],
  ['Industries', '/industries'],
  ['Insights', '/insights'],
  ['Process', '/process'],
  ['Why Me', '/resources'],
  ['Contact', '/contact'],
  ['Sitemap', '/sitemap'],
  ['Privacy', '/privacy'],
  ['Terms', '/terms'],
]

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function upsertMetaByName(html, name, content) {
  const re = new RegExp(`<meta\\s+name="${name}"[^>]*>`, 'i')
  const tag = `<meta name="${name}" content="${escapeHtml(content)}" />`
  if (re.test(html)) return html.replace(re, tag)
  return html.replace('</head>', `    ${tag}\n  </head>`)
}

function upsertMetaByProperty(html, property, content) {
  const re = new RegExp(`<meta\\s+property="${property}"[^>]*>`, 'i')
  const tag = `<meta property="${property}" content="${escapeHtml(content)}" />`
  if (re.test(html)) return html.replace(re, tag)
  return html.replace('</head>', `    ${tag}\n  </head>`)
}

function upsertLinkCanonical(html, href) {
  const re = /<link\s+rel="canonical"[^>]*>/i
  const tag = `<link rel="canonical" href="${escapeHtml(href)}" />`
  if (re.test(html)) return html.replace(re, tag)
  return html.replace('</head>', `    ${tag}\n  </head>`)
}

function upsertTitle(html, title) {
  return html.replace(/<title>[^<]*<\/title>/i, `<title>${escapeHtml(title)}</title>`)
}

function buildNoscript(meta) {
  const links = NAV.map(
    ([label, path]) =>
      `<li><a href="${path === '/' ? '/' : path}">${escapeHtml(label)}</a></li>`,
  ).join('\n          ')
  const trail = getBreadcrumbTrail(meta.path)
  const crumbs =
    trail.length > 1
      ? `<nav aria-label="Breadcrumb">
          <ol>
            ${trail
              .map((crumb, index) => {
                const last = index === trail.length - 1
                const href = crumb.path === '/' ? '/' : crumb.path
                return last
                  ? `<li aria-current="page">${escapeHtml(crumb.name)}</li>`
                  : `<li><a href="${href}">${escapeHtml(crumb.name)}</a></li>`
              })
              .join('\n            ')}
          </ol>
        </nav>`
      : ''
  return `<noscript id="seo-noscript">
      <main style="max-width:40rem;margin:2rem auto;padding:0 1.25rem;font-family:system-ui,sans-serif;line-height:1.6;color:#1a1c1c">
        ${crumbs}
        <h1>${escapeHtml(meta.h1)}</h1>
        <p>${escapeHtml(meta.crawlText)}</p>
        <p>${escapeHtml(meta.description)}</p>
        <nav aria-label="Site">
          <ul>
          ${links}
          </ul>
        </nav>
        <p>Email: <a href="mailto:gauravnagarkoti08&#64;gmail.com">gauravnagarkoti08&#64;gmail.com</a></p>
      </main>
    </noscript>`
}

function upsertJsonLd(html, data) {
  const json = JSON.stringify(data).replace(/</g, '\\u003c')
  const tag = `<script type="application/ld+json" id="org-jsonld">${json}</script>`
  const re = /<script type="application\/ld\+json" id="org-jsonld">[\s\S]*?<\/script>/i
  if (re.test(html)) return html.replace(re, tag)
  return html.replace('</head>', `    ${tag}\n  </head>`)
}

function applyRoute(html, meta) {
  const canonical = meta.path === '/' ? `${siteUrl}/` : `${siteUrl}${meta.path}`
  const image = `${siteUrl}${OG_IMAGE_PATH}`
  let out = html
  out = upsertTitle(out, meta.title)
  out = upsertMetaByName(out, 'description', meta.description)
  out = upsertMetaByName(out, 'robots', meta.noindex ? 'noindex, nofollow' : 'index, follow')
  out = upsertLinkCanonical(out, canonical)
  out = upsertMetaByProperty(out, 'og:title', meta.title)
  out = upsertMetaByProperty(out, 'og:description', meta.description)
  out = upsertMetaByProperty(out, 'og:url', canonical)
  out = upsertMetaByProperty(out, 'og:image', image)
  out = upsertMetaByName(out, 'twitter:title', meta.title)
  out = upsertMetaByName(out, 'twitter:description', meta.description)
  out = upsertMetaByName(out, 'twitter:image', image)
  out = upsertJsonLd(out, buildOrganizationJsonLd(meta.path))

  const noscript = buildNoscript(meta)
  if (/<noscript id="seo-noscript">[\s\S]*?<\/noscript>/i.test(out)) {
    out = out.replace(/<noscript id="seo-noscript">[\s\S]*?<\/noscript>/i, noscript)
  } else {
    out = out.replace('<div id="root"></div>', `<div id="root"></div>\n    ${noscript}`)
  }
  return out
}

function outPathFor(routePath) {
  if (routePath === '/') return resolve(dist, 'index.html')
  const dir = resolve(dist, routePath.replace(/^\//, ''))
  return resolve(dir, 'index.html')
}

function main() {
  const templatePath = resolve(dist, 'index.html')
  if (!existsSync(templatePath)) {
    console.error('[prerender] missing dist/index.html — run vite build first')
    process.exit(1)
  }

  const template = readFileSync(templatePath, 'utf8')
  let count = 0

  for (const path of PRERENDER_PATHS) {
    const meta = PAGE_META[path]
    if (!meta) continue
    const html = applyRoute(template, meta)
    const target = outPathFor(path)
    mkdirSync(dirname(target), { recursive: true })
    writeFileSync(target, html, 'utf8')
    count += 1
    console.info(`[prerender] ${path} → ${target.replace(root + '/', '')}`)
  }

  console.info(`[prerender] wrote ${count} HTML shells (siteUrl=${siteUrl})`)
}

main()
