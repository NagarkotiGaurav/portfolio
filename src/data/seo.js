import { CONTACT_FAQS } from './faq.js'
import { PAGE_META, getBreadcrumbTrail } from './pageMeta.js'
import { BRAND, getSameAs, getSiteUrl } from './site.js'
import { getServicePageByPath } from './solutionPages.js'
import { getArticleByPath } from './articles.js'
import { getProjectByPath } from './projects.js'

export { PAGE_META, PRERENDER_PATHS, getBreadcrumbTrail } from './pageMeta.js'

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

export function buildFaqJsonLd(faqs = CONTACT_FAQS, path = '/contact') {
  const siteUrl = getSiteUrl()
  return {
    '@type': 'FAQPage',
    '@id': `${siteUrl}${path}#faq`,
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

function buildServiceJsonLd(page, siteUrl) {
  return {
    '@type': 'Service',
    '@id': `${siteUrl}${page.path}#offer`,
    name: page.serviceName,
    serviceType: page.serviceType,
    description: page.description,
    url: `${siteUrl}${page.path}`,
    provider: { '@id': `${siteUrl}/#person` },
    areaServed: [
      { '@type': 'Country', name: 'United States' },
      { '@type': 'Country', name: 'United Kingdom' },
      { '@type': 'Place', name: 'Worldwide' },
    ],
  }
}

/**
 * Sitewide + route JSON-LD graph (Person, ProfessionalService, WebSite, optional Breadcrumb/FAQ/Service).
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
        'Custom Software Development',
        'Web Application Development',
        'Business Automation',
        'ERP Integration',
        'Odoo Integration',
        'Ecommerce Systems',
        'Payment Systems',
        'Software Architecture',
        'Cloud and DevOps',
        'WhatsApp Business Automation',
        'n8n Workflow Automation',
        'AI Learning Products',
      ],
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'IN',
      },
      availableLanguage: ['English'],
    },
    {
      '@type': 'ProfessionalService',
      '@id': `${siteUrl}/#service`,
      name: `${BRAND.name} — ${BRAND.role}`,
      url: siteUrl,
      description: BRAND.description,
      provider: { '@id': `${siteUrl}/#person` },
      areaServed: [
        { '@type': 'Country', name: 'United States' },
        { '@type': 'Country', name: 'United Kingdom' },
        { '@type': 'AdministrativeArea', name: 'European Union' },
        { '@type': 'Place', name: 'Worldwide' },
      ],
      serviceType: [
        'Custom Software Development',
        'Web Application Development',
        'Business Automation Consulting',
        'ERP Integration Consulting',
        'Ecommerce and Payment Systems Engineering',
        'Software Architecture Consulting',
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

  const servicePage = getServicePageByPath(meta.path)
  if (servicePage) {
    graph.push(buildServiceJsonLd(servicePage, siteUrl))
    if (servicePage.faqs?.length) {
      graph.push(buildFaqJsonLd(servicePage.faqs, servicePage.path))
    }
  }

  const article = getArticleByPath(meta.path)
  if (article) {
    graph.push({
      '@type': 'Article',
      '@id': `${siteUrl}${article.path}#article`,
      headline: article.h1,
      description: article.description,
      datePublished: article.datePublished,
      author: { '@id': `${siteUrl}/#person` },
      publisher: { '@id': `${siteUrl}/#person` },
      mainEntityOfPage: `${siteUrl}${article.path}`,
      inLanguage: 'en-GB',
    })
    if (article.faqs?.length) {
      graph.push(buildFaqJsonLd(article.faqs, article.path))
    }
  }

  const project = getProjectByPath(meta.path)
  if (project) {
    const live = (project.liveUrls || []).map((item) => item.href).filter(Boolean)
    graph.push({
      '@type': 'CreativeWork',
      '@id': `${siteUrl}${project.path}#work`,
      name: project.h1,
      headline: project.h1,
      description: project.description,
      author: { '@id': `${siteUrl}/#person` },
      publisher: { '@id': `${siteUrl}/#person` },
      mainEntityOfPage: `${siteUrl}${project.path}`,
      url: `${siteUrl}${project.path}`,
      inLanguage: 'en-GB',
      about: project.client === 'Confidential' ? 'Confidential client engagement' : project.client,
      ...(live.length ? { sameAs: live } : {}),
    })
    if (project.faqs?.length) {
      graph.push(buildFaqJsonLd(project.faqs, project.path))
    }
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  }
}
