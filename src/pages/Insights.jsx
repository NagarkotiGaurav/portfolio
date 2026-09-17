import { Link } from 'react-router-dom'
import Icon from '../components/Icon'
import { ARTICLES } from '../data/articles'
import { getPageMeta } from '../data/seo'
import { usePageMeta } from '../hooks/usePageMeta'
import { assertSceneBudget } from '../motion/SceneRegistry'
import { PageHero, ScrollOnce } from '../motion/patterns'

export default function Insights() {
  usePageMeta('/insights')
  const meta = getPageMeta('/insights')
  assertSceneBudget('insights', ['reveal'])

  return (
    <>
      <PageHero eyebrow="Insights" title={meta.h1} body={meta.description} />

      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap md:py-section-gap-lg">
        <div className="flex flex-col gap-8 max-w-3xl">
          {ARTICLES.map((article, index) => (
            <ScrollOnce key={article.slug} delay={index * 60}>
              <Link
                to={article.path}
                className="block border border-outline-variant p-6 md:p-8 rounded hover:bg-surface-container-low transition-colors group"
              >
                <p className="font-mono-data text-mono-data text-on-surface-variant uppercase tracking-widest mb-3">
                  {article.eyebrow}
                </p>
                <h2 className="font-headline-md text-headline-md text-primary mb-3 group-hover:opacity-80">
                  {article.h1}
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant mb-6">
                  {article.answerBlock}
                </p>
                <span className="font-label-caps text-label-caps text-primary uppercase tracking-widest inline-flex items-center gap-2">
                  Read <Icon name="arrow_forward" className="text-sm" />
                </span>
              </Link>
            </ScrollOnce>
          ))}
        </div>
      </section>
    </>
  )
}
