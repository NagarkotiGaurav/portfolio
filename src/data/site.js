export const BRAND = {
  name: 'Gaurav Nagarkoti',
  shortName: 'Gaurav',
  legalName: 'Gaurav Nagarkoti',
  role: 'Technology Consultant',
  roles: ['Technology Consultant', 'Software Architect', 'Automation Engineer'],
  tagline: `© ${new Date().getFullYear()} Gaurav Nagarkoti. Software that businesses rely on.`,
  description:
    'Gaurav Nagarkoti is a technology consultant and software architect who helps businesses build, automate, and scale systems they can rely on.',
  valueProposition: 'I build software that helps businesses grow faster.',
  email: 'gauravnagarkoti08@gmail.com',
  location: 'Remote · Worldwide',
  sameAs: ['https://gauravnagarkoti.tech'],
  /** Visual system (Stitch Alabaster tokens, personal brand). */
  designSystem: 'Gaurav Nagarkoti',
  /** Site is publicly viewable but still under active development. */
  isBeta: true,
  betaLabel: 'Beta',
  betaNotice:
    'This site is in beta. Content, case studies, and metrics may change; nothing here is a guarantee, offer, or formal professional advice until confirmed in writing.',
}

export const NAV_LINKS = [
  { label: 'Solutions', to: '/solutions', prefetch: () => import('../pages/Solutions') },
  { label: 'Work', to: '/work', prefetch: () => import('../pages/Work') },
  { label: 'Industries', to: '/industries', prefetch: () => import('../pages/Industries') },
  { label: 'Insights', to: '/insights', prefetch: () => import('../pages/Insights') },
  { label: 'Process', to: '/process', prefetch: () => import('../pages/Process') },
  { label: 'Why Me', to: '/resources', prefetch: () => import('../pages/Resources') },
]

export const FOOTER_LINKS = [
  { label: 'Solutions', to: '/solutions' },
  { label: 'Industries', to: '/industries' },
  { label: 'Work', to: '/work' },
  { label: 'Insights', to: '/insights' },
  { label: 'Why Me', to: '/resources' },
  { label: 'Privacy Policy', to: '/privacy' },
  { label: 'Terms of Service', to: '/terms' },
  { label: 'Sitemap', to: '/sitemap' },
]

/** Absolute site origin used for canonical URLs, sitemap, and Open Graph. */
export function getSiteUrl() {
  const fromEnv = import.meta.env.VITE_SITE_URL
  if (typeof fromEnv === 'string' && fromEnv.trim()) {
    return fromEnv.replace(/\/$/, '')
  }
  if (typeof window !== 'undefined' && window.location?.origin) {
    return window.location.origin
  }
  return 'https://gauravnagarkoti.tech'
}

export function getCalendlyUrl() {
  const url = import.meta.env.VITE_CALENDLY_URL
  if (typeof url === 'string' && url.trim()) {
    try {
      const parsed = new URL(url.trim())
      if (parsed.protocol === 'https:' || parsed.protocol === 'http:') {
        return parsed.toString()
      }
    } catch {
      return ''
    }
  }
  return ''
}

export function getContactEndpoint() {
  const explicit = import.meta.env.VITE_CONTACT_ENDPOINT
  if (typeof explicit === 'string' && explicit.trim()) {
    return explicit.trim()
  }
  const email = import.meta.env.VITE_CONTACT_EMAIL || BRAND.email
  return `https://formsubmit.co/ajax/${encodeURIComponent(email)}`
}
