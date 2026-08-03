import { useState } from 'react'
import Icon from '../components/Icon'
import { usePageMeta } from '../hooks/usePageMeta'
import { assertSceneBudget } from '../motion/SceneRegistry'
import { PageHero, Parallax, ScrollOnce } from '../motion/patterns'

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
  assertSceneBudget('insights', ['reveal'])
  const [active, setActive] = useState('All')

  return (
    <>
      <PageHero
        eyebrow="Insights"
        lines={['Insights & Analysis']}
        body="Technical writing on architecture, automation, and the engineering decisions that actually move business outcomes."
      >
        <div className="mt-10 md:mt-12 flex flex-wrap gap-3" role="group" aria-label="Insight categories">
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
      </PageHero>

      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap md:py-section-gap-lg border-b border-outline-variant">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-start">
          <ScrollOnce className="md:col-span-8">
            <Parallax speed={0.18} className="mb-6 overflow-hidden border border-outline-variant">
              <img
                className="w-full aspect-video object-cover scale-110"
                src="/images/insights-featured.jpg"
                alt="Abstract geometric illustration representing software architecture"
                width={512}
                height={279}
                loading="lazy"
                decoding="async"
              />
            </Parallax>
          </ScrollOnce>
          <ScrollOnce delay={100} className="md:col-span-4 flex flex-col gap-6 md:pt-4">
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
              Decoupling too early can introduce fatal operational complexity. Here’s how I think about
              the inflection point where microservices become a necessity — not a trend-driven risk.
            </p>
            <span className="font-label-caps text-label-caps text-primary border-b border-primary self-start hover:opacity-80 transition-opacity mt-4 pb-1 flex items-center gap-2 cursor-default">
              READ ANALYSIS <Icon name="arrow_forward" className="text-sm" />
            </span>
          </ScrollOnce>
        </div>
      </section>
    </>
  )
}
