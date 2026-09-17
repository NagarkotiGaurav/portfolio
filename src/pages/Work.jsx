import { Link } from 'react-router-dom'
import Icon from '../components/Icon'
import { usePageMeta } from '../hooks/usePageMeta'
import { getPageMeta } from '../data/seo'
import { PROJECTS } from '../data/projects'
import { assertSceneBudget } from '../motion/SceneRegistry'
import { PageHero, PrimaryCTA, ScrollOnce } from '../motion/patterns'
import { Narrative } from '../content/brandNarrative'
import { trackStrategyCall } from '../lib/analytics'

export default function Work() {
  usePageMeta('/work')
  const meta = getPageMeta('/work')
  assertSceneBudget('work', ['proof', 'cta'])

  return (
    <>
      <PageHero eyebrow="Work" title={meta.h1} body={meta.description} />

      <section className="py-16 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <ScrollOnce className="max-w-2xl mb-16">
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            These are systems I shipped. Client names and domains are withheld under NDA.
            Constraints and architecture only — no invented revenue numbers. If you are a US, UK,
            or EU operator, this is the proof that the work is real.
          </p>
        </ScrollOnce>

        <div className="flex flex-col gap-8 max-w-3xl">
          {PROJECTS.map((project, index) => (
            <ScrollOnce key={project.slug} delay={index * 50}>
              <Link
                to={project.path}
                className="block border border-outline-variant p-6 md:p-8 rounded hover:bg-surface-container-low transition-colors group"
              >
                <p className="font-mono-data text-mono-data text-on-surface-variant uppercase tracking-widest mb-3">
                  {project.eyebrow}
                </p>
                <h2 className="font-headline-md text-headline-md text-primary mb-3 group-hover:opacity-80">
                  {project.h1}
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant mb-6">
                  {project.answerBlock}
                </p>
                <span className="font-label-caps text-label-caps text-primary uppercase tracking-widest inline-flex items-center gap-2">
                  Read the case <Icon name="arrow_forward" className="text-sm" />
                </span>
              </Link>
            </ScrollOnce>
          ))}
        </div>

        <ScrollOnce className="mt-16 text-center">
          <PrimaryCTA>
            <Link
              to="/contact"
              className="btn-primary"
              onClick={() => trackStrategyCall({ scene: 'work' })}
            >
              {Narrative.ctaStyle.primary}
            </Link>
          </PrimaryCTA>
        </ScrollOnce>
      </section>
    </>
  )
}
