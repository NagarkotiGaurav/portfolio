import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import Icon from '../components/Icon'
import { getPageMeta } from '../data/seo'
import { getArticle } from '../data/articles'
import { usePageMeta } from '../hooks/usePageMeta'
import { contextFromPath, trackInsightOpen, trackStrategyCall } from '../lib/analytics'
import { assertSceneBudget } from '../motion/SceneRegistry'
import { PageHero, PrimaryCTA, ScrollOnce } from '../motion/patterns'
import { Narrative } from '../content/brandNarrative'
import NotFound from './NotFound'

export default function InsightDetail() {
  const { slug } = useParams()
  const article = getArticle(slug)
  usePageMeta(article?.path || '/404')
  assertSceneBudget('insights', ['reveal'])

  useEffect(() => {
    if (!article) return undefined
    trackInsightOpen(article.slug)
    return undefined
  }, [article])

  if (!article) return <NotFound />

  const meta = getPageMeta(article.path)
  const relatedService = contextFromPath(article.servicePath).service

  return (
    <>
      <PageHero eyebrow={article.eyebrow} title={meta.h1} body={article.answerBlock}>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-10">
          <PrimaryCTA>
            <Link
              to="/contact"
              className="btn-primary"
              onClick={() =>
                trackStrategyCall({
                  scene: 'insights',
                  service: relatedService,
                  location: 'hero',
                  content: article.slug,
                })
              }
            >
              Book a strategy call
            </Link>
          </PrimaryCTA>
          <Link to={article.servicePath} className="btn-outline">
            Related service
          </Link>
        </div>
      </PageHero>

      <article className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap md:py-section-gap-lg">
        <div className="max-w-3xl flex flex-col gap-6 mb-16">
          {article.intro.map((paragraph) => (
            <p key={paragraph} className="font-body-lg text-body-lg text-on-surface-variant">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="max-w-3xl flex flex-col gap-12 md:gap-16">
          {article.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="font-headline-md text-headline-md text-primary mb-4">{section.heading}</h2>
              {section.body.map((paragraph) => (
                <p key={paragraph} className="font-body-md text-body-md text-on-surface-variant mb-4">
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </div>

        {article.checklist?.length ? (
          <section className="max-w-3xl mt-16 md:mt-24 p-6 md:p-8 bg-surface-container-low border border-outline-variant rounded">
            <h2 className="font-headline-sm text-headline-sm text-primary mb-4">Checklist</h2>
            <ol className="font-body-md text-body-md text-on-surface flex flex-col gap-3">
              {article.checklist.map((item, index) => (
                <li key={item} className="flex gap-3">
                  <span className="font-mono-data text-mono-data text-primary shrink-0">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {item}
                </li>
              ))}
            </ol>
          </section>
        ) : null}

        {article.faqs?.length ? (
          <section className="max-w-3xl mt-16">
            <h2 className="font-headline-md text-headline-md text-primary mb-8">Questions</h2>
            <dl className="flex flex-col gap-8">
              {article.faqs.map((faq) => (
                <div key={faq.question}>
                  <dt className="font-headline-sm text-headline-sm text-primary mb-2">{faq.question}</dt>
                  <dd className="font-body-md text-body-md text-on-surface-variant">{faq.answer}</dd>
                </div>
              ))}
            </dl>
          </section>
        ) : null}

        <ScrollOnce intent="feedback" className="max-w-3xl mt-16 md:mt-24 pt-12 border-t border-outline-variant">
          <h2 className="font-headline-md text-headline-md text-primary mb-4">Need this decided on a live system?</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mb-8">
            Bring the constraint. I will tell you whether to build, buy, wrap, or stop — then whether I
            am the right person to do the work.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <PrimaryCTA>
              <Link
                to="/contact"
                className="btn-primary"
                onClick={() =>
                  trackStrategyCall({
                    scene: 'insights',
                    service: relatedService,
                    location: 'cta_band',
                    content: article.slug,
                  })
                }
              >
                {Narrative.ctaStyle.primary}
              </Link>
            </PrimaryCTA>
            <Link
              to={article.servicePath}
              className="inline-flex items-center gap-2 font-mono-data text-mono-data text-primary hover:opacity-80 uppercase"
            >
              Open the related service <Icon name="arrow_forward" />
            </Link>
          </div>
        </ScrollOnce>
      </article>
    </>
  )
}
