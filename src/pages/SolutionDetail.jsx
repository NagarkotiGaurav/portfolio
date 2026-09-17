import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import Icon from '../components/Icon'
import { getPageMeta } from '../data/seo'
import { getRelatedServicePages, getServicePage } from '../data/solutionPages'
import { getProjectsByServicePath } from '../data/projects'
import { usePageMeta } from '../hooks/usePageMeta'
import { trackServicePageView, trackStrategyCall } from '../lib/analytics'
import { assertSceneBudget } from '../motion/SceneRegistry'
import { PageHero, PrimaryCTA, ScrollOnce } from '../motion/patterns'
import { Narrative } from '../content/brandNarrative'
import NotFound from './NotFound'

export default function SolutionDetail() {
  const { slug } = useParams()
  const page = getServicePage(slug)
  usePageMeta(page?.path || '/404')
  assertSceneBudget('solutionDetail', ['hero', 'cta'])

  useEffect(() => {
    if (!page) return undefined
    trackServicePageView(page.slug)
    return undefined
  }, [page])

  if (!page) return <NotFound />

  const meta = getPageMeta(page.path)
  const related = getRelatedServicePages(page)
  const relatedWork = getProjectsByServicePath(page.path)

  return (
    <>
      <PageHero eyebrow={page.eyebrow} title={meta.h1} body={page.answerBlock}>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-10">
          <PrimaryCTA>
            <Link
              to="/contact"
              className="btn-primary"
              onClick={() =>
                trackStrategyCall({ scene: 'solutions', service: page.slug, location: 'hero' })
              }
            >
              Book a strategy call about this
            </Link>
          </PrimaryCTA>
          <Link to="/process" className="btn-outline">
            How I deliver
          </Link>
        </div>
      </PageHero>

      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap md:py-section-gap-lg">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          <div className="md:col-span-8 flex flex-col gap-6">
            {page.intro.map((paragraph) => (
              <p key={paragraph} className="font-body-lg text-body-lg text-on-surface-variant">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter mt-16 md:mt-24">
          <ScrollOnce className="p-6 md:p-8 bg-surface-container-low border border-outline-variant rounded">
            <h2 className="font-label-caps text-label-caps text-primary uppercase tracking-widest mb-4">
              Who this is for
            </h2>
            <ul className="font-body-md text-body-md text-on-surface flex flex-col gap-3">
              {page.whoFor.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-secondary shrink-0">—</span> {item}
                </li>
              ))}
            </ul>
          </ScrollOnce>
          <ScrollOnce className="p-6 md:p-8 border border-outline-variant rounded" delay={80}>
            <h2 className="font-label-caps text-label-caps text-primary uppercase tracking-widest mb-4">
              Who this is not for
            </h2>
            <ul className="font-body-md text-body-md text-on-surface-variant flex flex-col gap-3">
              {page.whoNot.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-outline shrink-0">—</span> {item}
                </li>
              ))}
            </ul>
          </ScrollOnce>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter mt-16 md:mt-24 pt-8 border-t border-outline-variant">
          <div>
            <h2 className="font-headline-md text-headline-md text-primary mb-6">Typical problems</h2>
            <ul className="font-body-md text-body-md text-on-surface flex flex-col gap-3">
              {page.problems.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-secondary shrink-0">—</span> {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-headline-md text-headline-md text-primary mb-6">How I approach it</h2>
            <ol className="font-body-md text-body-md text-on-surface-variant flex flex-col gap-4">
              {page.approach.map((item, index) => (
                <li key={item} className="flex gap-3">
                  <span className="font-mono-data text-mono-data text-primary shrink-0">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {item}
                </li>
              ))}
            </ol>
            <Link
              to="/process"
              className="inline-flex items-center gap-2 font-mono-data text-mono-data text-primary hover:opacity-80 mt-6 uppercase"
            >
              Full delivery process <Icon name="arrow_forward" />
            </Link>
          </div>
        </div>

        <div className="mt-16 md:mt-24">
          <h2 className="font-label-caps text-label-caps text-primary uppercase tracking-widest mb-4 border-b border-outline-variant pb-2">
            What this usually includes
          </h2>
          <div className="flex flex-wrap gap-2 mt-4">
            {page.stack.map((item) => (
              <span
                key={item}
                className="font-mono-data text-mono-data px-3 py-1.5 bg-surface-container-lowest text-on-surface border border-outline-variant rounded"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {page.faqs?.length ? (
        <section className="border-y border-outline-variant bg-surface-container-low">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap md:py-section-gap-lg">
            <h2 className="font-headline-md text-headline-md text-primary mb-10">Questions</h2>
            <dl className="flex flex-col gap-8 max-w-3xl">
              {page.faqs.map((faq) => (
                <div key={faq.question}>
                  <dt className="font-headline-sm text-headline-sm text-primary mb-2">{faq.question}</dt>
                  <dd className="font-body-md text-body-md text-on-surface-variant">{faq.answer}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      ) : null}

      {relatedWork.length ? (
        <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pb-section-gap md:pb-section-gap-lg">
          <h2 className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest mb-8">
            Related work
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {relatedWork.map((item) => (
              <Link key={item.slug} to={item.path} className="story-panel block h-full group">
                <h3 className="font-headline-sm text-headline-sm text-primary mb-3 group-hover:opacity-80">
                  {item.crumb}
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant mb-6">{item.description}</p>
                <span className="font-label-caps text-label-caps text-primary uppercase tracking-widest inline-flex items-center gap-2">
                  Case study <Icon name="arrow_forward" className="text-sm" />
                </span>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {related.length ? (
        <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap md:py-section-gap-lg">
          <h2 className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest mb-8">
            Related services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {related.map((item) => (
              <Link
                key={item.slug}
                to={item.path}
                className="story-panel block h-full group"
              >
                <h3 className="font-headline-sm text-headline-sm text-primary mb-3 group-hover:opacity-80">
                  {item.serviceName}
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant mb-6">{item.description}</p>
                <span className="font-label-caps text-label-caps text-primary uppercase tracking-widest inline-flex items-center gap-2">
                  Open <Icon name="arrow_forward" className="text-sm" />
                </span>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <section className="border-t border-outline-variant">
        <ScrollOnce
          intent="feedback"
          className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap md:py-section-gap-lg text-center"
        >
          <h2 className="font-headline-md text-headline-md text-primary max-w-2xl mx-auto mb-6">
            If this is the bottleneck, let’s map the first slice.
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant mb-10 max-w-xl mx-auto">
            Send the constraint. I’ll tell you whether this service is the right motion — or what
            I’d do instead.
          </p>
          <PrimaryCTA>
            <Link
              to="/contact"
              className="btn-primary"
              onClick={() =>
                trackStrategyCall({ scene: 'solutions', service: page.slug, location: 'cta_band' })
              }
            >
              {Narrative.ctaStyle.primary}
            </Link>
          </PrimaryCTA>
        </ScrollOnce>
      </section>
    </>
  )
}
