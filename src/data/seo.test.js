import { describe, expect, it } from 'vitest'
import {
  PAGE_META,
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildOrganizationJsonLd,
  getPageMeta,
} from './seo'
import { getBreadcrumbTrail } from './pageMeta'
import { SOLUTION_DOMAINS, SOLUTIONS } from './solutions'
import { CONTACT_FAQS } from './faq'
import { getSameAs } from './site'

describe('seo metadata', () => {
  it('defines meta for every primary marketing route', () => {
    const required = [
      '/',
      '/solutions',
      '/work',
      '/industries',
      '/insights',
      '/process',
      '/resources',
      '/contact',
      '/privacy',
      '/terms',
      '/sitemap',
      '/404',
    ]
    for (const path of required) {
      expect(PAGE_META[path]).toBeTruthy()
      expect(PAGE_META[path].title.length).toBeGreaterThan(10)
      expect(PAGE_META[path].description.length).toBeGreaterThan(40)
    }
  })

  it('falls back to 404 meta for unknown paths', () => {
    expect(getPageMeta('/does-not-exist').noindex).toBe(true)
  })

  it('builds Person + ProfessionalService + WebSite JSON-LD', () => {
    const ld = buildOrganizationJsonLd('/')
    expect(ld['@graph']).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ '@type': 'Person', name: 'Gaurav Nagarkoti' }),
        expect.objectContaining({ '@type': 'ProfessionalService' }),
        expect.objectContaining({ '@type': 'WebSite' }),
      ]),
    )
    expect(getSameAs()).toContain('https://gauravnagarkoti.tech')
  })

  it('adds BreadcrumbList on nested routes', () => {
    expect(getBreadcrumbTrail('/')).toEqual([])
    expect(getBreadcrumbTrail('/solutions')).toEqual([
      { name: 'Home', path: '/' },
      { name: 'Solutions', path: '/solutions' },
    ])
    expect(getBreadcrumbTrail('/solutions/custom-software-development')).toEqual([
      { name: 'Home', path: '/' },
      { name: 'Solutions', path: '/solutions' },
      { name: 'Custom Software Development', path: '/solutions/custom-software-development' },
    ])
    expect(getBreadcrumbTrail('/404')).toEqual([])

    const crumb = buildBreadcrumbJsonLd('/solutions')
    expect(crumb['@type']).toBe('BreadcrumbList')
    expect(crumb.itemListElement).toHaveLength(2)
    expect(crumb.itemListElement[0].name).toBe('Home')
    expect(crumb.itemListElement[1].name).toBe('Solutions')
    expect(buildBreadcrumbJsonLd('/')).toBeNull()
    expect(buildBreadcrumbJsonLd('/work/multi-payment-gateway-architecture').itemListElement).toHaveLength(
      3,
    )
  })

  it('adds FAQPage schema on contact', () => {
    const ld = buildOrganizationJsonLd('/contact')
    expect(ld['@graph']).toEqual(
      expect.arrayContaining([expect.objectContaining({ '@type': 'FAQPage' })]),
    )
    expect(buildFaqJsonLd().mainEntity).toHaveLength(CONTACT_FAQS.length)
  })

  it('uses unique titles and descriptions across indexable routes', () => {
    const indexable = Object.values(PAGE_META).filter((m) => !m.noindex)
    const titles = indexable.map((m) => m.title)
    const descriptions = indexable.map((m) => m.description)
    expect(new Set(titles).size).toBe(titles.length)
    expect(new Set(descriptions).size).toBe(descriptions.length)
    for (const meta of indexable) {
      expect(meta.h1?.length).toBeGreaterThan(3)
      expect(meta.crawlText?.length).toBeGreaterThan(40)
    }
  })
})

describe('solutions catalog', () => {
  it('includes all sidebar domains with matching articles', () => {
    expect(SOLUTION_DOMAINS).toHaveLength(6)
    expect(SOLUTIONS).toHaveLength(6)
    for (const domain of SOLUTION_DOMAINS) {
      expect(SOLUTIONS.find((s) => s.id === domain.id)).toBeTruthy()
    }
  })
})
