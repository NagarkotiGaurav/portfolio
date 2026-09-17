import { Link } from 'react-router-dom'
import { usePageMeta } from '../hooks/usePageMeta'
import { getPageMeta } from '../data/seo'
import { assertSceneBudget } from '../motion/SceneRegistry'
import { PageHero, PrimaryCTA, ScrollOnce } from '../motion/patterns'
import { Narrative } from '../content/brandNarrative'
import { trackStrategyCall } from '../lib/analytics'

const industries = [
  {
    num: '01',
    title: 'Healthcare operations',
    href: '/solutions/custom-software-development',
    problems:
      'Fragmented operational tools, slow handoffs between clinical and admin workflows, and audit trails that appear only after something breaks.',
    solutions:
      'Owned operator systems and integrations designed around your constraints — not a claim that every engagement is a certified EHR or HIPAA program.',
    results:
      'Typical focus: clearer data paths and fewer swivel-chair steps. Specific standards (if required) are scoped in writing after discovery.',
  },
  {
    num: '02',
    title: 'Logistics',
    href: '/solutions/business-automation',
    problems:
      'Status living in inboxes, inventory that disagrees with orders, and last-mile work that cannot be seen until it is late.',
    solutions:
      'Process mapping plus systems that move orders and exceptions forward — automation and integrations, not a generic tracking product.',
    results:
      'Typical focus: visibility and sync. KPIs are set against your operation after discovery.',
  },
  {
    num: '03',
    title: 'Enterprise systems',
    href: '/solutions/software-architecture',
    problems:
      'A core system nobody wants to touch, identity scattered across tools, and releases that feel dangerous.',
    solutions:
      'Architecture first: what to keep, wrap, or replace, then a sequence your team can run. Not a 50-person transformation factory.',
    results:
      'Typical focus: a safer modernization path and a blueprint that can be implemented without a big-bang date.',
  },
  {
    num: '04',
    title: 'Manufacturing & ops',
    href: '/solutions/erp-odoo-integration',
    problems:
      'Shop-floor or warehouse truth in one tool, finance in another, and reports that never reconcile.',
    solutions:
      'ERP/CRM integration and data contracts so inventory, orders, and finance agree. Not an unsolicited SCADA or IoT product pitch.',
    results:
      'Typical focus: one owner per entity (SKU, order, invoice) and integrations that survive the next upgrade.',
  },
]

export default function Industries() {
  usePageMeta('/industries')
  const meta = getPageMeta('/industries')
  assertSceneBudget('industries', ['reveal'])

  return (
    <>
      <PageHero
        eyebrow="Industry fit"
        title={meta.h1}
        body="These are places this work tends to show up. They are not a promise that every standard in the sector has already been delivered."
      />

      <section className="w-full py-section-gap md:py-section-gap-lg px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
          {industries.map((ind, i) => (
            <ScrollOnce
              key={ind.num}
              delay={i * 70}
              className="bg-surface-container-lowest border border-outline-variant p-6 sm:p-8 md:p-12"
            >
              <div className="flex justify-between items-start gap-4 mb-10 md:mb-16">
                <h2 className="font-headline-sm sm:font-headline-md text-headline-sm sm:text-headline-md text-primary">
                  {ind.title}
                </h2>
                <span className="font-mono-data text-mono-data bg-surface-container px-3 py-1 rounded">
                  {ind.num}
                </span>
              </div>
              <div className="space-y-8">
                <div>
                  <h3 className="font-label-caps text-label-caps text-on-surface-variant mb-2 border-b border-outline-variant pb-2">
                    Typical friction
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface">{ind.problems}</p>
                </div>
                <div>
                  <h3 className="font-label-caps text-label-caps text-on-surface-variant mb-2 border-b border-outline-variant pb-2">
                    How I usually help
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface">{ind.solutions}</p>
                </div>
                <div className="bg-surface px-6 py-4 border border-outline-variant">
                  <h3 className="font-label-caps text-label-caps text-primary mb-1">Fit, not a case study</h3>
                  <p className="font-mono-data text-mono-data text-on-surface-variant">{ind.results}</p>
                </div>
                <Link
                  to={ind.href}
                  className="inline-flex font-mono-data text-mono-data text-primary hover:opacity-80 uppercase"
                >
                  Related service
                </Link>
              </div>
            </ScrollOnce>
          ))}
        </div>
        <ScrollOnce className="mt-16 text-center">
          <PrimaryCTA>
            <Link
              to="/contact"
              className="btn-primary"
              onClick={() => trackStrategyCall({ scene: 'industries' })}
            >
              {Narrative.ctaStyle.primary}
            </Link>
          </PrimaryCTA>
        </ScrollOnce>
      </section>
    </>
  )
}
