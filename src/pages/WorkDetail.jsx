import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import Icon from '../components/Icon'
import { getPageMeta } from '../data/seo'
import { getProject, getRelatedProjects } from '../data/projects'
import { usePageMeta } from '../hooks/usePageMeta'
import { contextFromPath, trackCaseStudyOpen, trackStrategyCall } from '../lib/analytics'
import { assertSceneBudget } from '../motion/SceneRegistry'
import { PageHero, PrimaryCTA, ScrollOnce } from '../motion/patterns'
import { Narrative } from '../content/brandNarrative'
import NotFound from './NotFound'

export default function WorkDetail() {
  const { slug } = useParams()
  const project = getProject(slug)
  usePageMeta(project?.path || '/404')
  assertSceneBudget('workDetail', ['hero', 'cta'])

  useEffect(() => {
    if (!project) return undefined
    trackCaseStudyOpen(project.slug)
    return undefined
  }, [project])

  if (!project) return <NotFound />

  const meta = getPageMeta(project.path)
  const relatedService = contextFromPath(project.servicePath).service
  const related = getRelatedProjects(project)

  return (
    <>
      <PageHero eyebrow={project.eyebrow} title={meta.h1} body={project.answerBlock}>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-10">
          <PrimaryCTA>
            <Link
              to="/contact"
              className="btn-primary"
              onClick={() =>
                trackStrategyCall({
                  scene: 'work',
                  service: relatedService,
                  location: 'hero',
                  content: project.slug,
                })
              }
            >
              Book a strategy call
            </Link>
          </PrimaryCTA>
          <Link to={project.servicePath} className="btn-outline">
            Related service
          </Link>
        </div>
      </PageHero>

      <article className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap md:py-section-gap-lg">
        {project.liveUrls?.length ? (
          <p className="font-mono-data text-mono-data text-on-surface-variant mb-10">
            Live:{' '}
            {project.liveUrls.map((item, index) => (
              <span key={item.href}>
                {index > 0 ? ' · ' : null}
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:opacity-80"
                >
                  {item.label}
                </a>
              </span>
            ))}
          </p>
        ) : null}

        <div className="max-w-3xl flex flex-col gap-6 mb-16">
          {project.intro.map((paragraph) => (
            <p key={paragraph} className="font-body-lg text-body-lg text-on-surface-variant">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="max-w-3xl flex flex-col gap-12 md:gap-16">
          {project.sections.map((section) => (
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

        {project.stack?.length ? (
          <section className="max-w-3xl mt-16">
            <h2 className="font-headline-sm text-headline-sm text-primary mb-4">Stack on this engagement</h2>
            <ul className="font-mono-data text-mono-data text-on-surface-variant flex flex-col gap-2">
              {project.stack.map((item) => (
                <li key={item}>— {item}</li>
              ))}
            </ul>
          </section>
        ) : null}

        {project.faqs?.length ? (
          <section className="max-w-3xl mt-16">
            <h2 className="font-headline-md text-headline-md text-primary mb-8">Questions</h2>
            <dl className="flex flex-col gap-8">
              {project.faqs.map((faq) => (
                <div key={faq.question}>
                  <dt className="font-headline-sm text-headline-sm text-primary mb-2">{faq.question}</dt>
                  <dd className="font-body-md text-body-md text-on-surface-variant">{faq.answer}</dd>
                </div>
              ))}
            </dl>
          </section>
        ) : null}

        {related.length ? (
          <section className="max-w-3xl mt-16">
            <h2 className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest mb-6">
              Related work
            </h2>
            <div className="flex flex-col gap-4">
              {related.map((item) => (
                <Link key={item.slug} to={item.path} className="story-panel block group">
                  <h3 className="font-headline-sm text-headline-sm text-primary mb-2 group-hover:opacity-80">
                    {item.crumb}
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant">{item.description}</p>
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        <ScrollOnce intent="feedback" className="max-w-3xl mt-16 md:mt-24 pt-12 border-t border-outline-variant">
          <h2 className="font-headline-md text-headline-md text-primary mb-4">Need this class of system?</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mb-8">
            Bring the constraint. I will tell you whether this pattern applies — then whether I am
            the right person to do the work. Remote. English. USD.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <PrimaryCTA>
              <Link
                to="/contact"
                className="btn-primary"
                onClick={() =>
                  trackStrategyCall({
                    scene: 'work',
                    service: relatedService,
                    location: 'cta_band',
                    content: project.slug,
                  })
                }
              >
                {Narrative.ctaStyle.primary}
              </Link>
            </PrimaryCTA>
            <Link
              to={project.servicePath}
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
