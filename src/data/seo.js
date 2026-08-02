import { BRAND, getSiteUrl } from './site'

/**
 * Per-route SEO metadata. Keys are pathname strings (no trailing slash except home).
 */
export const PAGE_META = {
  '/': {
    title: 'Consultancy | Engineering Consultancy — Build, Automate & Scale',
    description:
      'Consultancy partners with ambitious companies to design and engineer resilient systems that drive operational efficiency and unlock new revenue streams.',
    path: '/',
  },
  '/solutions': {
    title: 'Solutions | Software, AI & Automation Consulting — Consultancy',
    description:
      'Precision solutions across software development, AI & automation, business process, ERP & CRM, e-commerce, and cloud & DevOps.',
    path: '/solutions',
  },
  '/work': {
    title: 'Work & Case Studies | Engineering at Scale — Consultancy',
    description:
      'An archive of complex technical implementations — from distributed systems to payment infrastructure — with measurable engineering outcomes.',
    path: '/work',
  },
  '/industries': {
    title: 'Industries | Healthcare, Logistics, Enterprise, Manufacturing — Consultancy',
    description:
      'Domain-specific architecture for healthcare, logistics, enterprise, and manufacturing — grounded in operational realities and measurable results.',
    path: '/industries',
  },
  '/insights': {
    title: 'Insights | Software Architecture & Engineering Strategy — Consultancy',
    description:
      'Deep technical dives, architectural patterns, and strategic engineering perspectives from Consultancy.',
    path: '/insights',
  },
  '/process': {
    title: 'Process | 9-Step Engineering Delivery Lifecycle — Consultancy',
    description:
      'A transparent, chronological engineering process designed for rigorous technical execution and business alignment.',
    path: '/process',
  },
  '/resources': {
    title: 'Why Work With Consultancy | Strategic Engineering Partnership',
    description:
      'Architecture-first partnership model: clarity, rigorous system design, and predictable delivery for ambitious engineering teams.',
    path: '/resources',
  },
  '/contact': {
    title: 'Contact | Book a Discovery Call — Consultancy',
    description:
      'Start a strategic partnership. Share project context for evaluation. Based in London. We typically respond within 24 hours.',
    path: '/contact',
  },
  '/privacy': {
    title: 'Privacy Policy — Consultancy',
    description: 'How Consultancy collects, uses, and protects personal information submitted through this website.',
    path: '/privacy',
  },
  '/terms': {
    title: 'Terms of Service — Consultancy',
    description: 'Terms governing use of the Consultancy website and engagement with our consulting services.',
    path: '/terms',
  },
  '/sitemap': {
    title: 'Sitemap — Consultancy',
    description: 'Complete index of Consultancy website pages, including solutions, work, industries, insights, and contact.',
    path: '/sitemap',
  },
  '/404': {
    title: 'Page Not Found — Consultancy',
    description: 'The requested page could not be found on the Consultancy website.',
    path: '/404',
    noindex: true,
  },
}

export function getPageMeta(pathname) {
  const normalized = pathname === '' ? '/' : pathname.replace(/\/$/, '') || '/'
  return PAGE_META[normalized] || PAGE_META['/404']
}

export function buildOrganizationJsonLd() {
  const siteUrl = getSiteUrl()
  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'ProfessionalService'],
    name: BRAND.name,
    legalName: BRAND.legalName,
    description: BRAND.description,
    url: siteUrl,
    email: BRAND.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'London',
      addressCountry: 'GB',
    },
    areaServed: 'Worldwide',
    serviceType: [
      'Software Architecture Consulting',
      'Custom Software Development',
      'AI and Automation Consulting',
      'Cloud and DevOps Consulting',
    ],
    sameAs: BRAND.sameAs,
  }
}
