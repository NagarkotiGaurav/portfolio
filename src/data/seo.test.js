import { describe, expect, it } from 'vitest'
import { PAGE_META, buildOrganizationJsonLd, getPageMeta } from './seo'
import { SOLUTION_DOMAINS, SOLUTIONS } from './solutions'

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

  it('builds Organization/ProfessionalService JSON-LD', () => {
    const ld = buildOrganizationJsonLd()
    expect(ld['@type']).toEqual(expect.arrayContaining(['Organization', 'ProfessionalService']))
    expect(ld.name).toBe('Consultancy')
    expect(ld.email).toContain('@')
    expect(ld.address.addressLocality).toBe('London')
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
