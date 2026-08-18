import { CONTACT_FAQS } from './faq'
import { PAGE_META, getBreadcrumbTrail } from './pageMeta'
import { BRAND, getSameAs, getSiteUrl } from './site'

export { PAGE_META, PRERENDER_PATHS, getBreadcrumbTrail } from './pageMeta'

export function getPageMeta(pathname) {
  const normalized = pathname === '' ? '/' : pathname.replace(/\/$/, '') || '/'
  return PAGE_META[normalized] || PAGE_META['/404']
}

export function buildBreadcrumbJsonLd(pathname) {
  const siteUrl = getSiteUrl()
  const trail = getBreadcrumbTrail(pathname)
  if (trail.length < 2) return null

  return {
    '@type': 'BreadcrumbList',
    '@id': `${siteUrl}${trail[trail.length - 1].path}#breadcrumb`,
    itemListElement: trail.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.path === '/' ? `${siteUrl}/` : `${siteUrl}${crumb.path}`,
    })),
  }
}

export function buildFaqJsonLd() {
  const siteUrl = getSiteUrl()
  return {
    '@type': 'FAQPage',
    '@id': `${siteUrl}/contact#faq`,
    mainEntity: CONTACT_FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

/**
 * Sitewide + route JSON-LD graph (Person, ProfessionalService, WebSite, optional Breadcrumb/FAQ).
 */
export function buildOrganizationJsonLd(pathname = '/') {
  const siteUrl = getSiteUrl()
  const meta = getPageMeta(pathname)
  const graph = [
    {
      '@type': 'Person',
      '@id': `${siteUrl}/#person`,
      name: BRAND.name,
      url: siteUrl,
      email: BRAND.email,
      jobTitle: BRAND.role,
      description: BRAND.description,
      sameAs: getSameAs(),
      knowsAbout: [
        'Software Architecture',
        'Systems Engineering',
        'AI and Automation',
        'Cloud and DevOps',
      ],
    },
    {
      '@type': 'ProfessionalService',
      '@id': `${siteUrl}/#service`,
      name: `${BRAND.name} — ${BRAND.role}`,
      url: siteUrl,
      description: BRAND.description,
      provider: { '@id': `${siteUrl}/#person` },
      areaServed: 'Worldwide',
      serviceType: [
        'Software Architecture Consulting',
        'Custom Software Development',
        'AI and Automation Consulting',
        'Cloud and DevOps Consulting',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      name: BRAND.name,
      url: siteUrl,
      description: BRAND.description,
      publisher: { '@id': `${siteUrl}/#person` },
      inLanguage: 'en-GB',
    },
  ]

  const breadcrumb = buildBreadcrumbJsonLd(pathname)
  if (breadcrumb) graph.push(breadcrumb)

  if (meta.path === '/contact') {
    graph.push(buildFaqJsonLd())
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  }
}
