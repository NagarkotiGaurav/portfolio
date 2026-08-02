import { useState } from 'react'
import { usePageMeta } from '../hooks/usePageMeta'

const tabs = [
  'Featured Projects',
  'Case Studies',
  'Architecture Gallery',
  'Open Source',
  'Engineering Lab',
]

export default function Work() {
  usePageMeta('/work')
  const [active, setActive] = useState(0)

  return (
    <>
      <section className="pt-section-gap pb-16 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <h1 className="font-display-lg-mobile text-display-lg-mobile md:font-display-lg md:text-display-lg text-primary mb-8 max-w-4xl">
          Engineering at scale. Designed for impact.
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mb-12">
          An archive of our most complex technical implementations. From distributed systems to
          high-frequency trading platforms, explore the architecture behind the solutions.
        </p>
        <div
          className="flex flex-wrap gap-4 border-b border-outline-variant pb-4"
          role="tablist"
          aria-label="Work categories"
        >
          {tabs.map((tab, i) => (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={active === i}
              className={
                active === i
                  ? 'font-mono-data text-mono-data text-primary bg-surface-container px-4 py-2 rounded flex items-center gap-2'
                  : 'font-mono-data text-mono-data text-on-surface-variant hover:text-primary px-4 py-2 transition-colors'
              }
              onClick={() => setActive(i)}
            >
              {active === i && <span className="w-2 h-2 rounded-full bg-primary block" />}
              {tab}
            </button>
          ))}
        </div>
      </section>

      <section className="py-16 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          <div className="md:col-span-8 border border-outline-variant rounded overflow-hidden bg-surface-container-lowest">
            <div className="h-96 w-full relative">
              <img
                className="absolute inset-0 w-full h-full object-cover"
                src="/images/work-case-study-01.jpg"
                alt="Architectural diagram of a cloud-native microservices payment flow"
                width={512}
                height={279}
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
            </div>
          </div>
          <div className="md:col-span-4 flex flex-col justify-between p-8 border border-outline-variant rounded bg-slate-50">
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
                Results
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="font-headline-sm text-headline-sm text-primary">99.999%</div>
                  <div className="font-mono-data text-mono-data text-on-surface-variant">
                    Uptime SLA
                  </div>
                </div>
                <div>
                  <div className="font-headline-sm text-headline-sm text-primary">45ms</div>
                  <div className="font-mono-data text-mono-data text-on-surface-variant">
                    P99 Latency
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
