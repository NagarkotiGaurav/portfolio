/**
 * Per-route SEO metadata (shared by React meta hook + build-time prerender).
 * Keep titles unique; descriptions unique; h1/crawlText for non-JS crawlers.
 */
import { SERVICE_PAGES, SERVICE_PATHS } from './solutionPages.js'
import { ARTICLES, ARTICLE_PATHS } from './articles.js'
import { PROJECTS, PROJECT_PATHS } from './projects.js'
import { HIRE_PAGE, HIRE_PATH } from './hirePage.js'

function servicePageMeta() {
  return Object.fromEntries(
    SERVICE_PAGES.map((page) => [
      page.path,
      {
        title: page.title,
        description: page.description,
        path: page.path,
        h1: page.h1,
        crawlText: page.crawlText,
        crumb: page.crumb,
      },
    ]),
  )
}

function articlePageMeta() {
  return Object.fromEntries(
    ARTICLES.map((page) => [
      page.path,
      {
        title: page.title,
        description: page.description,
        path: page.path,
        h1: page.h1,
        crawlText: page.crawlText,
        crumb: page.crumb,
      },
    ]),
  )
}

function projectPageMeta() {
  return Object.fromEntries(
    PROJECTS.map((page) => [
      page.path,
      {
        title: page.title,
        description: page.description,
        path: page.path,
        h1: page.h1,
        crawlText: page.crawlText,
        crumb: page.crumb,
      },
    ]),
  )
}

export const PAGE_META = {
  '/': {
    title: 'Gaurav Nagarkoti | Custom Software Architect for US, UK & EU Teams',
    description:
      'Independent software architect for US, UK, and European operators. Custom software, commerce, automation, and internal platforms — remote, English, USD. Book a strategy call.',
    path: '/',
    h1: 'I build software that helps businesses grow faster.',
    crawlText:
      'Gaurav Nagarkoti is an independent software architect based in India, working remotely with operators in the United States, United Kingdom, and Europe. Custom software, web applications, business automation, ERP integrations, ecommerce, and internal platforms — English delivery, USD engagements, systems your team owns. Book a strategy call.',
    crumb: 'Home',
  },
  '/solutions': {
    title: 'Software Consulting Services | Gaurav Nagarkoti',
    description:
      'Custom software, web applications, business automation, ERP integration, commerce, and architecture — independent delivery, not a layered agency.',
    path: '/solutions',
    h1: 'Software systems for operators who need to own the stack.',
    crawlText:
      'Explore consulting solutions across custom software development, web applications, business automation, ERP and Odoo integration, ecommerce and payments, and software architecture. Each engagement starts with clarity on outcomes, constraints, and ownership.',
    crumb: 'Solutions',
  },
  '/work': {
    title: 'Work & Case Studies | Gaurav Nagarkoti',
    description:
      'Shipped work under NDA: commerce platforms, internal HR/CRM systems, WhatsApp automation, and an AI tutor — constraints and architecture, not client names or vanity metrics.',
    path: '/work',
    h1: 'Selected work. Built for operators.',
    crawlText:
      'Case studies from Gaurav Nagarkoti. Client names and domains withheld under NDA. Published work covers a corporate gifting marketplace, licensed merchandise ecommerce, internal HRMS and CRM, WhatsApp automation with n8n, eyewear catalog commerce, and an AI personal tutor. Architecture and constraints only.',
    crumb: 'Work',
  },
  '/industries': {
    title: 'Industries | Domain Fit — Gaurav Nagarkoti',
    description:
      'Where this work tends to show up: healthcare operations, logistics, enterprise modernization, and manufacturing visibility — without pretending every engagement is a certified industry program.',
    path: '/industries',
    h1: 'Industry systems shaped by real constraints.',
    crawlText:
      'Software consulting that respects sector constraints in healthcare operations, logistics, enterprise systems, and manufacturing visibility. Industry pages describe fit, not a claim of named delivery in every standard.',
    crumb: 'Industries',
  },
  '/insights': {
    title: 'Insights | Architecture & Engineering Strategy — Gaurav Nagarkoti',
    description:
      'Decision writing on custom software vs SaaS, when to build, and when to hire an independent architect instead of an agency.',
    path: '/insights',
    h1: 'Insights on architecture and engineering strategy.',
    crawlText:
      'Articles on when to build custom software, custom software versus SaaS, and agency versus independent architect. Written for operators who need a decision, then a path to implementation.',
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
      'Hire an independent architect for US, UK, and EU work: English, USD, overlap hours, architecture-first — not an offshore staff-aug bench.',
    path: '/resources',
    h1: 'You hire the architect — not a 100-person firm.',
    crawlText:
      'Why US, UK, and European operators hire Gaurav Nagarkoti: independent software architect based in India, remote English delivery, USD engagements, written decisions, and systems the client team owns. Not a layered agency and not staff augmentation.',
    crumb: 'Why Me',
  },
  [HIRE_PATH]: {
    title: HIRE_PAGE.title,
    description: HIRE_PAGE.description,
    path: HIRE_PAGE.path,
    h1: HIRE_PAGE.h1,
    crawlText: HIRE_PAGE.crawlText,
    crumb: HIRE_PAGE.crumb,
  },
  '/contact': {
    title: 'Contact | Book a Strategy Call — Gaurav Nagarkoti',
    description:
      'Book a strategy call for custom software, automation, or internal platforms. Remote for US, UK, and EU operators. English. USD. Typical reply within 24 hours.',
    path: '/contact',
    h1: 'Let’s talk about the work.',
    crawlText:
      'Contact Gaurav Nagarkoti to book a strategy call. Remote engagements for operators in the United States, United Kingdom, and Europe. English. Billed in USD. Typical response within 24 hours.',
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
      'HTML sitemap listing public pages on gauravnagarkoti.tech including solutions, dedicated service pages, work, industries, insights, process, resources, contact, privacy, and terms.',
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
  ...servicePageMeta(),
  ...articlePageMeta(),
  ...projectPageMeta(),
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
  ...SERVICE_PATHS,
  '/work',
  ...PROJECT_PATHS,
  '/industries',
  '/insights',
  ...ARTICLE_PATHS,
  '/process',
  '/resources',
  HIRE_PATH,
  '/contact',
  '/privacy',
  '/terms',
  '/sitemap',
]
