import { useState } from 'react'
import { Link } from 'react-router-dom'
import { usePageMeta } from '../hooks/usePageMeta'
import { assertSceneBudget } from '../motion/SceneRegistry'
import { PageHero, Parallax, PrimaryCTA, ScrollOnce } from '../motion/patterns'
import { Narrative } from '../content/brandNarrative'

const tabs = [
  'Featured Projects',
  'Case Studies',
  'Architecture Gallery',
  'Open Source',
  'Engineering Lab',
]

export default function Work() {
  usePageMeta('/work')
  assertSceneBudget('work', ['proof', 'cta'])
  const [active, setActive] = useState(0)

  return (
    <>
      <PageHero
        eyebrow="Work"
        lines={['Selected work.', 'Built for impact.']}
        body="Architectures, systems, and outcomes from engagements where the software had to hold up under real business pressure."
      >
        <div
          className="mt-12 flex gap-2 overflow-x-auto pb-4 -mx-margin-mobile px-margin-mobile md:mx-0 md:px-0 border-b border-outline-variant"
          role="tablist"
          aria-label="Work categories"
          style={{ scrollbarWidth: 'none' }}
        >
          {tabs.map((tab, i) => (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={active === i}
              className={
                active === i
                  ? 'shrink-0 font-mono-data text-mono-data text-primary bg-surface-container px-4 py-2 rounded flex items-center gap-2'
                  : 'shrink-0 font-mono-data text-mono-data text-on-surface-variant hover:text-primary px-4 py-2 transition-colors'
              }
              onClick={() => setActive(i)}
            >
              {active === i && <span className="w-2 h-2 rounded-full bg-primary block" />}
              {tab}
            </button>
          ))}
        </div>
      </PageHero>

      <section className="py-16 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          <ScrollOnce className="md:col-span-8 border border-outline-variant rounded overflow-hidden bg-surface-container-lowest">
            <Parallax speed={0.15} className="h-96 w-full relative overflow-hidden">
              <img
                className="absolute inset-0 w-full h-[120%] object-cover -top-[10%]"
                src="/images/work-case-study-01.jpg"
                alt="Architectural diagram of a cloud-native microservices payment flow"
                width={512}
                height={279}
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
            </Parallax>
          </ScrollOnce>
          <ScrollOnce delay={120} className="md:col-span-4 flex flex-col justify-between p-8 border border-outline-variant rounded bg-surface-container-low">
            <div>
              <div className="font-mono-data text-mono-data text-on-surface-variant mb-4">
                CASE STUDY — 01
              </div>
              <h2 className="font-headline-md text-headline-md text-primary mb-6">
                Global Payment Infrastructure Realignment
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-label-caps text-label-caps text-on-surface-variant mb-2 uppercase tracking-widest">
                    Problem
                  </h3>
                  <p className="font-body-md text-body-md">
                    Legacy monolithic system struggling with 10k TPS during peak transactional
                    windows, causing severe latency.
                  </p>
                </div>
                <div>
                  <h3 className="font-label-caps text-label-caps text-on-surface-variant mb-2 uppercase tracking-widest">
                    Solution
                  </h3>
                  <p className="font-body-md text-body-md">
                    Decoupled architecture utilizing event-driven microservices on AWS, prioritizing
                    asynchronous processing.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-outline-variant">
              <h3 className="font-label-caps text-label-caps text-on-surface-variant mb-4 uppercase tracking-widest">
                Focus
              </h3>
              <ul className="space-y-3 font-body-md text-body-md text-on-surface">
                <li>Peak-load payment path redesign</li>
                <li>Event-driven services on AWS</li>
                <li>Clearer failure modes under traffic spikes</li>
              </ul>
              <p className="mt-4 font-mono-data text-mono-data text-on-surface-variant">
                Detailed metrics and client references are added as case studies are published.
              </p>
            </div>
          </ScrollOnce>
        </div>

        <ScrollOnce className="mt-16 text-center">
          <PrimaryCTA>
            <Link to="/contact" className="btn-primary">
              {Narrative.ctaStyle.primary}
            </Link>
          </PrimaryCTA>
        </ScrollOnce>
      </section>
    </>
  )
}
