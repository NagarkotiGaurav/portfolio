import { BRAND, getSiteUrl } from './site'

/**
 * Per-route SEO metadata. Keys are pathname strings (no trailing slash except home).
 */
export const PAGE_META = {
  '/': {
    title: 'Gaurav Nagarkoti | Technology Consultant & Software Architect',
    description:
      'I build software that helps businesses grow faster — architecture, automation, and systems companies can rely on.',
    path: '/',
  },
  '/solutions': {
    title: 'Solutions | Software, AI & Automation — Gaurav Nagarkoti',
    description:
      'Outcome-led engineering across software, AI & automation, process, ERP, commerce, and cloud — built for business leverage.',
    path: '/solutions',
  },
  '/work': {
    title: 'Work & Case Studies | Gaurav Nagarkoti',
    description:
      'Selected technical work — architectures, systems, and measurable results from complex engineering engagements.',
    path: '/work',
  },
  '/industries': {
    title: 'Industries | Domain Expertise — Gaurav Nagarkoti',
    description:
      'Sector-specific systems for healthcare, logistics, enterprise, and manufacturing — grounded in real operational constraints.',
    path: '/industries',
  },
  '/insights': {
    title: 'Insights | Architecture & Engineering Strategy — Gaurav Nagarkoti',
    description:
      'Technical writing on software architecture, automation, and engineering decisions that affect business outcomes.',
    path: '/insights',
  },
  '/process': {
    title: 'Process | How I Deliver — Gaurav Nagarkoti',
    description:
      'A clear engineering lifecycle from discovery to support — predictable delivery without guesswork.',
    path: '/process',
  },
  '/resources': {
    title: 'Why Work With Me | Gaurav Nagarkoti',
    description:
      'Architecture-first partnership: clarity, rigorous design, and software your team can operate long after launch.',
    path: '/resources',
  },
  '/contact': {
    title: 'Contact | Book a Strategy Call — Gaurav Nagarkoti',
    description:
      'Start a conversation about your next system, product, or automation initiative. Typically responds within 24 hours.',
    path: '/contact',
  },
  '/privacy': {
    title: 'Privacy Policy — Gaurav Nagarkoti',
    description:
      'How personal information submitted through gauravnagarkoti.tech is collected, used, and protected.',
    path: '/privacy',
  },
  '/terms': {
    title: 'Terms of Service — Gaurav Nagarkoti',
    description: 'Terms governing use of this website and consulting engagements with Gaurav Nagarkoti.',
    path: '/terms',
  },
  '/sitemap': {
    title: 'Sitemap — Gaurav Nagarkoti',
    description: 'A complete index of public pages on gauravnagarkoti.tech for easier navigation.',
    path: '/sitemap',
  },
  '/404': {
    title: 'Page Not Found — Gaurav Nagarkoti',
    description: 'The page you requested could not be found. Return home or explore Solutions and Work.',
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
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${siteUrl}/#person`,
        name: BRAND.name,
        url: siteUrl,
        email: BRAND.email,
        jobTitle: BRAND.role,
        description: BRAND.description,
        sameAs: BRAND.sameAs,
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
    ],
  }
}
