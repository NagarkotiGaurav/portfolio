import { Link } from 'react-router-dom'
import { usePageMeta } from '../hooks/usePageMeta'
import { SERVICE_PAGES } from '../data/solutionPages'
import { ARTICLES } from '../data/articles'
import { PROJECTS } from '../data/projects'

const SECTIONS = [
  {
    title: 'Main',
    links: [
      { to: '/', label: 'Home', blurb: 'Gaurav Nagarkoti — custom software and architecture consultant' },
      { to: '/solutions', label: 'Solutions', blurb: 'Software consulting services index' },
      { to: '/work', label: 'Work', blurb: 'Shipped case studies — commerce, internal systems, automation, AI' },
      { to: '/industries', label: 'Industries', blurb: 'Healthcare, logistics, enterprise, manufacturing' },
      { to: '/insights', label: 'Insights', blurb: 'Architecture and strategy analysis' },
      { to: '/process', label: 'Process', blurb: 'How delivery works, step by step' },
      { to: '/resources', label: 'Why Me', blurb: 'Partnership model and philosophy' },
      { to: '/hire-software-architect', label: 'Hire', blurb: 'Freelance software architect for US, UK, and EU operators' },
      { to: '/contact', label: 'Contact', blurb: 'Book a strategy call' },
    ],
  },
  {
    title: 'Services',
    links: SERVICE_PAGES.map((page) => ({
      to: page.path,
      label: page.serviceName,
      blurb: page.description,
    })),
  },
  {
    title: 'Work',
    links: PROJECTS.map((page) => ({
      to: page.path,
      label: page.crumb,
      blurb: page.description,
    })),
  },
  {
    title: 'Insights',
    links: ARTICLES.map((page) => ({
      to: page.path,
      label: page.crumb,
      blurb: page.description,
    })),
  },
  {
    title: 'Legal',
    links: [
      { to: '/privacy', label: 'Privacy Policy', blurb: 'How we handle personal information' },
      { to: '/terms', label: 'Terms of Service', blurb: 'Website and engagement terms' },
    ],
  },
]

export default function SitemapPage() {
  usePageMeta('/sitemap')

  return (
    <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap md:py-section-gap-lg">
      <div className="max-w-3xl mb-16">
        <p className="font-mono-data text-mono-data text-on-surface-variant mb-4 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-outline-variant" />
          SITE INDEX
        </p>
        <h1 className="font-display-lg-mobile text-display-lg-mobile md:font-headline-md md:text-headline-md text-primary mb-4">
          Sitemap
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant">
          Browse every public page on this site. Search engines can also read the machine-readable
          index at{' '}
          <a
            className="text-primary underline underline-offset-2 hover:opacity-80"
            href="/sitemap.xml"
            target="_blank"
            rel="noreferrer"
          >
            /sitemap.xml
          </a>
          .
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
        {SECTIONS.map((section) => (
          <div key={section.title}>
            <h2 className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest mb-6 border-b border-outline-variant pb-2">
              {section.title}
            </h2>
            <ul className="space-y-4">
              {section.links.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="group block border border-outline-variant p-5 rounded hover:bg-surface-container-low transition-colors"
                  >
                    <span className="font-headline-sm text-headline-sm text-primary group-hover:opacity-80">
                      {link.label}
                    </span>
                    <span className="block font-mono-data text-mono-data text-on-surface-variant mt-1">
                      {link.to}
                    </span>
                    <span className="block font-body-md text-body-md text-on-surface-variant mt-2">
                      {link.blurb}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
