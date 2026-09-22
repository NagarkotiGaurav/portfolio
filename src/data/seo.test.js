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
import { SERVICE_PAGES, SERVICE_PATHS, getServicePage } from './solutionPages'
import { ARTICLES, ARTICLE_PATHS, getArticle } from './articles'
import { PROJECTS, PROJECT_PATHS, getProject } from './projects'
import { HIRE_PAGE, HIRE_PATH, getHirePageByPath } from './hirePage'
import { PRERENDER_PATHS } from './pageMeta'

describe('seo metadata', () => {
  it('defines meta for every primary marketing route', () => {
    const required = [
      '/',
      '/solutions',
      ...SERVICE_PATHS,
      ...ARTICLE_PATHS,
      ...PROJECT_PATHS,
      '/work',
      '/industries',
      '/insights',
      '/process',
      '/resources',
      '/hire-software-architect',
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
    expect(buildBreadcrumbJsonLd('/work/corporate-gifting-marketplace').itemListElement).toHaveLength(
      3,
    )
    expect(getBreadcrumbTrail(HIRE_PATH)).toEqual([
      { name: 'Home', path: '/' },
      { name: 'Hire', path: HIRE_PATH },
    ])
  })

  it('adds FAQPage schema on contact', () => {
    const ld = buildOrganizationJsonLd('/contact')
    expect(ld['@graph']).toEqual(
      expect.arrayContaining([expect.objectContaining({ '@type': 'FAQPage' })]),
    )
    expect(buildFaqJsonLd().mainEntity).toHaveLength(CONTACT_FAQS.length)
  })

  it('adds Article schema on insight pages', () => {
    const path = '/insights/when-to-build-custom-software'
    const ld = buildOrganizationJsonLd(path)
    expect(ld['@graph']).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ '@type': 'Article', headline: getArticle('when-to-build-custom-software').h1 }),
        expect.objectContaining({ '@type': 'FAQPage' }),
      ]),
    )
  })

  it('adds Service and FAQ schema on hire-intent service pages', () => {
    const path = '/solutions/custom-software-development'
    const ld = buildOrganizationJsonLd(path)
    expect(ld['@graph']).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          '@type': 'Service',
          name: 'Custom Software Development',
        }),
        expect.objectContaining({ '@type': 'FAQPage' }),
      ]),
    )
    const person = ld['@graph'].find((node) => node['@type'] === 'Person')
    expect(person.knowsAbout).toEqual(expect.arrayContaining(['Custom Software Development', 'ERP Integration']))
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

  it('links hub domains to dedicated service URLs', () => {
    for (const solution of SOLUTIONS) {
      expect(solution.href).toMatch(/^\/solutions\//)
      expect(PAGE_META[solution.href]).toBeTruthy()
    }
  })
})

describe('case studies', () => {
  it('defines named work pages that are prerendered', () => {
    expect(PROJECTS).toHaveLength(7)
    for (const project of PROJECTS) {
      expect(getProject(project.slug)?.path).toBe(project.path)
      expect(PAGE_META[project.path].h1).toBe(project.h1)
      expect(PRERENDER_PATHS).toContain(project.path)
      expect(project.answerBlock.length).toBeGreaterThan(80)
      expect(project.faqs.length).toBeGreaterThan(0)
      expect(project.slug).not.toMatch(/ideacraft|jcb|lenskandy|ania/i)
      expect(project.liveUrls).toEqual([])
    }
  })

  it('adds CreativeWork schema on case-study pages', () => {
    const path = '/work/corporate-gifting-marketplace'
    const ld = buildOrganizationJsonLd(path)
    expect(ld['@graph']).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          '@type': 'CreativeWork',
          headline: getProject('corporate-gifting-marketplace').h1,
        }),
        expect.objectContaining({ '@type': 'FAQPage' }),
      ]),
    )
  })
})

describe('insight articles', () => {
  it('defines decision-cluster pages that are prerendered', () => {
    expect(ARTICLES).toHaveLength(3)
    for (const article of ARTICLES) {
      expect(getArticle(article.slug)?.path).toBe(article.path)
      expect(PAGE_META[article.path].h1).toBe(article.h1)
      expect(PRERENDER_PATHS).toContain(article.path)
      expect(article.answerBlock.length).toBeGreaterThan(80)
    }
  })
})

describe('service pages', () => {
  it('defines six unique hire-intent pages that are prerendered', () => {
    expect(SERVICE_PAGES).toHaveLength(6)
    expect(new Set(SERVICE_PAGES.map((page) => page.slug)).size).toBe(6)
    for (const page of SERVICE_PAGES) {
      expect(getServicePage(page.slug)?.path).toBe(page.path)
      expect(PAGE_META[page.path].h1).toBe(page.h1)
      expect(PRERENDER_PATHS).toContain(page.path)
      expect(page.answerBlock.length).toBeGreaterThan(80)
      expect(page.faqs.length).toBeGreaterThan(1)
    }
  })
})

describe('hire landing', () => {
  it('defines a commercial hire page that is prerendered', () => {
    expect(getHirePageByPath(HIRE_PATH)).toBe(HIRE_PAGE)
    expect(getHirePageByPath(`${HIRE_PATH}/`)).toBe(HIRE_PAGE)
    expect(getHirePageByPath('/contact')).toBeNull()
    expect(PAGE_META[HIRE_PATH].h1).toBe(HIRE_PAGE.h1)
    expect(PRERENDER_PATHS).toContain(HIRE_PATH)
    expect(HIRE_PAGE.shapes).toHaveLength(3)
    expect(HIRE_PAGE.faqs.length).toBeGreaterThanOrEqual(8)
    expect(HIRE_PAGE.definition.length).toBeGreaterThan(80)
  })

  it('adds Service and FAQ schema on the hire landing', () => {
    const ld = buildOrganizationJsonLd(HIRE_PATH)
    expect(ld['@graph']).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          '@type': 'Service',
          name: 'Freelance Software Architect',
        }),
        expect.objectContaining({ '@type': 'FAQPage' }),
      ]),
    )
    const faq = ld['@graph'].find((node) => node['@type'] === 'FAQPage')
    expect(faq.mainEntity).toHaveLength(HIRE_PAGE.faqs.length)
  })
})
