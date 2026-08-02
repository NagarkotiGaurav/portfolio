import { useState } from 'react'
import Icon from '../components/Icon'
import { usePageMeta } from '../hooks/usePageMeta'

const categories = [
  'All',
  'Software Engineering',
  'Architecture',
  'AI',
  'Automation',
  'Scaling',
  'Security',
]

export default function Insights() {
  usePageMeta('/insights')
  const [active, setActive] = useState('All')

  return (
    <>
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap border-b border-outline-variant">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          <div className="md:col-span-8 flex flex-col gap-6">
            <h1 className="font-display-lg-mobile text-display-lg-mobile md:font-display-lg md:text-display-lg text-primary">
              Insights &amp; Analysis
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
              Deep technical dives, architectural patterns, and strategic engineering perspectives.
              We dismantle complex software challenges to extract actionable methodologies.
            </p>
          </div>
        </div>
        <div className="mt-16 flex flex-wrap gap-4" role="group" aria-label="Insight categories">
          {categories.map((cat) => {
            const selected = active === cat
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActive(cat)}
                className={
                  selected
                    ? 'font-mono-data text-mono-data bg-surface-container-low text-primary px-3 py-1 rounded flex items-center gap-2'
                    : 'font-mono-data text-mono-data bg-surface text-on-surface-variant border border-outline-variant px-3 py-1 rounded flex items-center gap-2 cursor-pointer hover:bg-surface-container-low'
                }
              >
                <span
                  className={`w-2 h-2 rounded-full ${selected ? 'bg-primary' : 'bg-outline-variant'}`}
                />
                {cat}
              </button>
            )
          })}
        </div>
      </section>

      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap border-b border-outline-variant">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-start">
          <div className="md:col-span-8">
            <div className="mb-6">
              <img
                className="w-full aspect-video object-cover border border-outline-variant"
                src="/images/insights-featured.jpg"
                alt="Abstract geometric illustration representing software architecture"
                width={512}
                height={279}
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
          <div className="md:col-span-4 flex flex-col gap-6 md:pt-4">
            <div className="flex items-center gap-3">
              <span className="font-mono-data text-mono-data bg-surface-container-lowest border border-outline-variant text-primary px-2 py-1 rounded text-xs uppercase tracking-wider">
                Architecture
              </span>
              <span className="font-mono-data text-mono-data text-on-surface-variant text-xs">
                OCT 24, 2024
              </span>
            </div>
            <h2 className="font-headline-md text-headline-md text-primary">
              Microservices vs. Monoliths: A Tradeoff Analysis for High-Growth Startups
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Decoupling architecture too early can introduce fatal operational complexity. We analyze
              the exact inflection point where transitioning to microservices becomes a mathematical
              necessity rather than a trend-driven risk.
            </p>
            <span className="font-label-caps text-label-caps text-primary border-b border-primary self-start hover:opacity-80 transition-opacity mt-4 pb-1 flex items-center gap-2 cursor-default">
              READ ANALYSIS <Icon name="arrow_forward" className="text-sm" />
            </span>
          </div>
        </div>
      </section>
    </>
  )
}
