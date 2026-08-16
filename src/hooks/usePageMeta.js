import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { buildOrganizationJsonLd, getPageMeta } from '../data/seo'
import { getSiteUrl } from '../data/site'
import { logger } from '../lib/logger'

function upsertMeta(attr, key, content) {
  if (!content) return
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertLink(rel, href) {
  if (!href) return
  let el = document.head.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

function upsertJsonLd(id, data) {
  let el = document.getElementById(id)
  if (!el) {
    el = document.createElement('script')
    el.type = 'application/ld+json'
    el.id = id
    document.head.appendChild(el)
  }
  el.textContent = JSON.stringify(data)
}

/**
 * Applies title, description, canonical, robots, Open Graph, Twitter, and Organization JSON-LD
 * for the active route.
 */
export function usePageMeta(overridePath) {
  const { pathname } = useLocation()
  const path = overridePath || pathname

  useEffect(() => {
    const meta = getPageMeta(path)
    const siteUrl = getSiteUrl()
    const canonical = `${siteUrl}${meta.path === '/' ? '/' : meta.path}`
    const image = `${siteUrl}/images/work-case-study-01.jpg`

    document.title = meta.title
    upsertMeta('name', 'description', meta.description)
    upsertMeta('name', 'robots', meta.noindex ? 'noindex, nofollow' : 'index, follow')
    upsertLink('canonical', canonical)

    upsertMeta('property', 'og:type', 'website')
    upsertMeta('property', 'og:site_name', 'Gaurav Nagarkoti')
    upsertMeta('property', 'og:title', meta.title)
    upsertMeta('property', 'og:description', meta.description)
    upsertMeta('property', 'og:url', canonical)
    upsertMeta('property', 'og:image', image)
    upsertMeta('property', 'og:locale', 'en_GB')

    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', meta.title)
    upsertMeta('name', 'twitter:description', meta.description)
    upsertMeta('name', 'twitter:image', image)

    upsertJsonLd('org-jsonld', buildOrganizationJsonLd(path))

    logger.debug('seo.meta_applied', { path: meta.path, title: meta.title })
  }, [path])
}
