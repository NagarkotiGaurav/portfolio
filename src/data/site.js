export const BRAND = {
  name: 'Consultancy',
  legalName: 'Engineering Consultancy',
  tagline: '© 2024 Engineering Consultancy. Precision in every pixel.',
  description:
    'Consultancy is an engineering consultancy based in London. We help businesses build, automate and scale through technology.',
  email: 'strategy@consultancy.eng',
  location: 'London, United Kingdom',
  sameAs: [],
}

export const NAV_LINKS = [
  { label: 'Solutions', to: '/solutions', prefetch: () => import('../pages/Solutions') },
  { label: 'Work', to: '/work', prefetch: () => import('../pages/Work') },
  { label: 'Industries', to: '/industries', prefetch: () => import('../pages/Industries') },
  { label: 'Insights', to: '/insights', prefetch: () => import('../pages/Insights') },
  { label: 'Process', to: '/process', prefetch: () => import('../pages/Process') },
  { label: 'Resources', to: '/resources', prefetch: () => import('../pages/Resources') },
]

export const FOOTER_LINKS = [
  { label: 'Solutions', to: '/solutions' },
  { label: 'Industries', to: '/industries' },
  { label: 'Work', to: '/work' },
  { label: 'Insights', to: '/insights' },
  { label: 'Resources', to: '/resources' },
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
