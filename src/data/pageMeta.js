/**
 * Per-route SEO metadata (shared by React meta hook + build-time prerender).
 * Keep titles unique; descriptions unique; h1/crawlText for non-JS crawlers.
 */
export const PAGE_META = {
  '/': {
    title: 'Gaurav Nagarkoti | Tech Consultant & Architect',
    description:
      'Independent technology consultant and software architect. I design and build architecture, automation, and reliable systems that help businesses grow faster—from discovery to production.',
    path: '/',
    h1: 'I build software that helps businesses grow faster.',
    crawlText:
      'Gaurav Nagarkoti is an independent technology consultant and software architect. Architecture, automation, cloud and DevOps, ERP and commerce systems—built so your team can operate them after launch. Book a strategy call to discuss your next system.',
    crumb: 'Home',
  },
  '/solutions': {
    title: 'Solutions | Software, AI & Automation — Gaurav Nagarkoti',
    description:
      'Outcome-led engineering across software, AI & automation, process, ERP, commerce, and cloud — built for business leverage.',
    path: '/solutions',
    h1: 'Solutions for software, AI, and business systems.',
    crawlText:
      'Explore consulting solutions across custom software development, AI and automation, business process systems, ERP and CRM, e-commerce integrations, and cloud DevOps. Each engagement starts with clarity on outcomes, constraints, and ownership.',
    crumb: 'Solutions',
  },
  '/work': {
    title: 'Work & Case Studies | Gaurav Nagarkoti',
    description:
      'Selected technical work — architectures, systems, and measurable results from complex engineering engagements.',
    path: '/work',
    h1: 'Selected work. Built for impact.',
    crawlText:
      'Case studies and selected engineering work from engagements where software had to hold up under real business pressure—payment paths, integrations, architecture realignment, and systems delivery.',
    crumb: 'Work',
  },
  '/industries': {
    title: 'Industries | Domain Expertise — Gaurav Nagarkoti',
    description:
      'Sector-specific systems for healthcare, logistics, enterprise, and manufacturing — grounded in real operational constraints.',
    path: '/industries',
    h1: 'Industry systems shaped by real constraints.',
    crawlText:
      'Domain-aware consulting for healthcare, logistics, enterprise, and manufacturing. Focus on interoperability, visibility, modernization paths, and operational reliability—not generic templates.',
    crumb: 'Industries',
  },
  '/insights': {
    title: 'Insights | Architecture & Engineering Strategy — Gaurav Nagarkoti',
    description:
      'Technical writing on software architecture, automation, and engineering decisions that affect business outcomes.',
    path: '/insights',
    h1: 'Insights on architecture and engineering strategy.',
    crawlText:
      'Articles and notes on software architecture, automation, delivery process, and engineering decisions that affect growth, cost, and reliability. Written for operators and technical leaders.',
    crumb: 'Insights',
  },
  '/process': {
    title: 'Process | How I Deliver — Gaurav Nagarkoti',
    description:
      'A clear engineering lifecycle from discovery to support — predictable delivery without guesswork.',
    path: '/process',
    h1: 'How I deliver: discovery to support.',
    crawlText:
      'A clear engagement process from discovery and architecture blueprint through build, launch, and support. Predictable phases, explicit tradeoffs, and systems your team can own.',
    crumb: 'Process',
  },
  '/resources': {
    title: 'Why Work With Me | Gaurav Nagarkoti',
    description:
      'Architecture-first partnership: clarity, rigorous design, and software your team can operate long after launch.',
    path: '/resources',
    h1: 'Why work with an independent architect.',
    crawlText:
      'Independent technology partnership—not a layered agency. Architecture-first delivery, direct communication, and software designed for long-term ownership by your team.',
    crumb: 'Why Me',
  },
  '/contact': {
    title: 'Contact | Book a Strategy Call — Gaurav Nagarkoti',
    description:
      'Start a conversation about your next system, product, or automation initiative. Typically responds within 24 hours.',
    path: '/contact',
    h1: 'Let’s talk about the work.',
    crawlText:
      'Contact Gaurav Nagarkoti to book a strategy call or send a project brief. Share what you are building and what is blocking you. Typical response within 24 hours. Remote engagements worldwide.',
    crumb: 'Contact',
  },
  '/privacy': {
    title: 'Privacy Policy — Gaurav Nagarkoti',
    description:
      'How personal information submitted through gauravnagarkoti.tech is collected, used, and protected.',
    path: '/privacy',
    h1: 'Privacy Policy',
    crawlText:
      'Privacy policy for gauravnagarkoti.tech explaining how contact form data and site information are collected, used, and protected.',
    crumb: 'Privacy',
  },
  '/terms': {
    title: 'Terms of Service — Gaurav Nagarkoti',
    description: 'Terms governing use of this website and consulting engagements with Gaurav Nagarkoti.',
    path: '/terms',
    h1: 'Terms of Service',
    crawlText:
      'Terms of service governing use of gauravnagarkoti.tech and consulting engagements with Gaurav Nagarkoti.',
    crumb: 'Terms',
  },
  '/sitemap': {
    title: 'Sitemap — Gaurav Nagarkoti',
    description: 'A complete index of public pages on gauravnagarkoti.tech for easier navigation.',
    path: '/sitemap',
    h1: 'Sitemap',
    crawlText:
      'HTML sitemap listing public pages on gauravnagarkoti.tech including solutions, work, industries, insights, process, resources, contact, privacy, and terms.',
    crumb: 'Sitemap',
  },
  '/404': {
    title: 'Page Not Found — Gaurav Nagarkoti',
    description: 'The page you requested could not be found. Return home or explore Solutions and Work.',
    path: '/404',
    noindex: true,
    h1: 'Page not found.',
    crawlText: 'The page you requested could not be found. Return home or contact Gaurav Nagarkoti.',
    crumb: 'Not found',
  },
}

function normalizePath(pathname) {
  const value = pathname === '' ? '/' : pathname.replace(/\/$/, '') || '/'
  return value
}

function labelFromSlug(slug) {
  return slug
    .split('-')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

function crumbName(path, fallback) {
  const meta = PAGE_META[path]
  return meta?.crumb || fallback
}

/**
 * Visible + JSON-LD breadcrumb trail. Home has no trail.
 * Nested URLs (e.g. /solutions/custom-software-development) insert the hub.
 */
export function getBreadcrumbTrail(pathname) {
  const normalized = normalizePath(pathname)
  if (normalized === '/') return []

  const known = PAGE_META[normalized]
  if (known?.noindex) return []

  const trail = [{ name: 'Home', path: '/' }]
  const parts = normalized.split('/').filter(Boolean)
  const hubPath = `/${parts[0]}`

  if (parts.length > 1 && PAGE_META[hubPath] && !PAGE_META[hubPath].noindex) {
    trail.push({ name: crumbName(hubPath, labelFromSlug(parts[0])), path: hubPath })
  }

  const currentName = known
    ? crumbName(normalized, known.h1)
    : labelFromSlug(parts[parts.length - 1] || 'Page')
  trail.push({ name: currentName, path: known?.path || normalized })
  return trail
}

/** Marketing routes to prerender as static HTML shells (excludes /404). */
export const PRERENDER_PATHS = [
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
]
