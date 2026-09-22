import { Link } from 'react-router-dom'
import { HIRE_PAGE, HIRE_PATH } from '../data/hirePage'
import { PROJECTS } from '../data/projects'
import { getPageMeta } from '../data/seo'
import { usePageMeta } from '../hooks/usePageMeta'
import { trackStrategyCall } from '../lib/analytics'
import { assertSceneBudget } from '../motion/SceneRegistry'
import { PageHero, PrimaryCTA, ScrollOnce } from '../motion/patterns'
import { Narrative } from '../content/brandNarrative'

function HireCta({ location, className = 'btn-primary', children }) {
  return (
    <PrimaryCTA>
      <Link
        to="/contact"
        className={className}
        onClick={() =>
          trackStrategyCall({
            scene: 'hire',
            service: 'software-architecture',
            location,
          })
        }
      >
        {children}
      </Link>
    </PrimaryCTA>
  )
}

export default function HireSoftwareArchitect() {
  usePageMeta(HIRE_PATH)
  const meta = getPageMeta(HIRE_PATH)
  const page = HIRE_PAGE
  assertSceneBudget('hire', ['hero', 'cta'])

  return (
    <>
      <PageHero eyebrow={page.eyebrow} title={meta.h1} body={page.answerBlock}>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-10">
          <HireCta location="hero">{Narrative.ctaStyle.primary}</HireCta>
          <Link to="/work" className="btn-outline">
            See selected work
          </Link>
        </div>
      </PageHero>

      <article className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap md:py-section-gap-lg">
        <section className="max-w-3xl p-6 md:p-8 bg-surface-container-low border border-outline-variant rounded mb-16 md:mb-24">
          <h2 className="font-headline-sm text-headline-sm text-primary mb-4">What you get when you hire me</h2>
          <p className="font-body-lg text-body-lg text-on-surface">{page.definition}</p>
          <p className="font-body-md text-body-md text-on-surface-variant mt-6">
            Architecture and delivery ownership: decisions written down, then built — not handed to an
            unknown bench. Depth lives on the service pages:
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 mt-4 font-mono-data text-mono-data">
            {page.offers.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="text-primary hover:opacity-80">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="max-w-3xl mb-16 md:mb-24">
          <h2 className="font-headline-md text-headline-md text-primary mb-8">
            Who this is for (and who should look elsewhere)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-headline-sm text-headline-sm text-primary mb-4">For</h3>
              <ul className="font-body-md text-body-md text-on-surface-variant flex flex-col gap-3">
                {page.forWho.map((item) => (
                  <li key={item}>— {item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-headline-sm text-headline-sm text-primary mb-4">Not for</h3>
              <ul className="font-body-md text-body-md text-on-surface-variant flex flex-col gap-3">
                {page.notFor.map((item) => (
                  <li key={item}>— {item}</li>
                ))}
              </ul>
            </div>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant mt-8">
            More on the model:{' '}
            <Link to="/insights/agency-vs-independent-architect" className="text-primary hover:opacity-80">
              agency vs independent
            </Link>{' '}
            and{' '}
            <Link to="/resources" className="text-primary hover:opacity-80">
              why work with me
            </Link>
            .
          </p>
        </section>

        <section className="max-w-3xl mb-16 md:mb-24">
          <h2 className="font-headline-md text-headline-md text-primary mb-8">New build or existing system?</h2>
          <div className="flex flex-col gap-10">
            {page.buildModes.map((mode) => (
              <div key={mode.heading}>
                <h3 className="font-headline-sm text-headline-sm text-primary mb-3">{mode.heading}</h3>
                <p className="font-body-md text-body-md text-on-surface-variant mb-4">{mode.body}</p>
                <ul className="flex flex-wrap gap-x-6 gap-y-2 font-mono-data text-mono-data">
                  {mode.links.map((item) => (
                    <li key={item.to}>
                      <Link to={item.to} className="text-primary hover:opacity-80">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-3xl mb-16 md:mb-24">
          <h2 className="font-headline-md text-headline-md text-primary mb-8">How we can work together</h2>
          <div className="flex flex-col gap-10">
            {page.shapes.map((shape) => (
              <div key={shape.heading}>
                <h3 className="font-headline-sm text-headline-sm text-primary mb-3">{shape.heading}</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">{shape.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16 md:mb-24">
          <h2 className="font-headline-md text-headline-md text-primary mb-4 max-w-3xl">
            Proof: systems shaped for operators
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant mb-8 max-w-3xl">
            Client names withheld under NDA. Architecture and constraints only — no invented metrics.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {PROJECTS.map((project) => (
              <Link key={project.slug} to={project.path} className="story-panel block h-full group">
                <p className="font-mono-data text-mono-data text-on-surface-variant uppercase tracking-widest mb-3">
                  {project.eyebrow}
                </p>
                <h3 className="font-headline-sm text-headline-sm text-primary mb-3 group-hover:opacity-80">
                  {project.crumb}
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant">{project.description}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="max-w-3xl mb-16 md:mb-24">
          <h2 className="font-headline-md text-headline-md text-primary mb-8">
            Independent architect vs agency, staff-aug, marketplace, or fractional-CTO-only
          </h2>
          <div className="flex flex-col border-t border-outline-variant">
            {page.compare.map((row) => (
              <div
                key={row.alternative}
                className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-6 py-5 border-b border-outline-variant"
              >
                <h3 className="font-headline-sm text-headline-sm text-primary">{row.alternative}</h3>
                <p className="md:col-span-2 font-body-md text-body-md text-on-surface-variant m-0">
                  {row.difference}
                </p>
              </div>
            ))}
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant mt-8">
            Also:{' '}
            <Link to="/process" className="text-primary hover:opacity-80">
              how I deliver
            </Link>
            .
          </p>
        </section>

        <section className="max-w-3xl mb-16 md:mb-24">
          <h2 className="font-headline-md text-headline-md text-primary mb-6">Remote with US, UK &amp; EU teams</h2>
          <ul className="font-body-md text-body-md text-on-surface-variant flex flex-col gap-3">
            {page.trust.map((item) => (
              <li key={item}>— {item}</li>
            ))}
          </ul>
        </section>

        <section className="max-w-3xl mb-16 md:mb-24 p-6 md:p-8 bg-surface-container-low border border-outline-variant rounded">
          <h2 className="font-headline-md text-headline-md text-primary mb-4">What to bring to a strategy call</h2>
          <ol className="font-body-md text-body-md text-on-surface flex flex-col gap-3 mb-8">
            {page.bring.map((item, index) => (
              <li key={item} className="flex gap-3">
                <span className="font-mono-data text-mono-data text-primary shrink-0">
                  {String(index + 1).padStart(2, '0')}
                </span>
                {item}
              </li>
            ))}
          </ol>
          <HireCta location="form">{Narrative.ctaStyle.primary}</HireCta>
        </section>

        <section className="max-w-3xl mb-16 md:mb-24">
          <h2 className="font-headline-md text-headline-md text-primary mb-8">Questions</h2>
          <dl className="flex flex-col gap-8">
            {page.faqs.map((faq) => (
              <div key={faq.question}>
                <dt className="font-headline-sm text-headline-sm text-primary mb-2">{faq.question}</dt>
                <dd className="font-body-md text-body-md text-on-surface-variant">{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="max-w-3xl mb-16">
          <h2 className="font-headline-sm text-headline-sm text-primary mb-6">Related solutions</h2>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 font-mono-data text-mono-data">
            {page.offers.map((item) => (
              <li key={`related-${item.to}`}>
                <Link to={item.to} className="text-primary hover:opacity-80">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/process" className="text-primary hover:opacity-80">
                Process
              </Link>
            </li>
            <li>
              <Link to="/work" className="text-primary hover:opacity-80">
                Work
              </Link>
            </li>
          </ul>
        </section>

        <ScrollOnce intent="feedback" className="max-w-3xl pt-12 border-t border-outline-variant">
          <h2 className="font-headline-md text-headline-md text-primary mb-4">Ready to hire an architect?</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mb-8">
            Send the constraint. I will tell you whether I am the right person — then whether the next
            step is a review, a blueprint, or a build.
          </p>
          <HireCta location="cta_band">{Narrative.ctaStyle.primary}</HireCta>
        </ScrollOnce>
      </article>
    </>
  )
}
