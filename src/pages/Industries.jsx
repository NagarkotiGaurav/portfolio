import { Link } from 'react-router-dom'
import { usePageMeta } from '../hooks/usePageMeta'
import { assertSceneBudget } from '../motion/SceneRegistry'
import { PageHero, PrimaryCTA, ScrollOnce } from '../motion/patterns'
import { Narrative } from '../content/brandNarrative'

const industries = [
  {
    num: '01',
    title: 'Healthcare',
    problems:
      'Data silos across legacy EMRs, stringent HIPAA compliance requirements, and high-latency patient data retrieval impacting clinical decisions.',
    solutions:
      'FHIR-compliant interoperability layers, zero-trust architecture data pipelines, and real-time clinical decision support interfaces.',
    results:
      'Typical focus: lower retrieval latency for clinical workflows and clearer audit-ready data paths—outcomes scoped per engagement.',
  },
  {
    num: '02',
    title: 'Logistics',
    problems:
      'Opaque supply chain nodes, inefficient last-mile routing algorithms, and disjointed inventory forecasting.',
    solutions:
      'Event-driven architecture for real-time tracking, predictive AI routing models, and automated ledger consensus.',
    results:
      'Typical focus: tighter last-mile visibility and inventory/order sync—measured against your operational KPIs after discovery.',
  },
  {
    num: '03',
    title: 'Enterprise',
    problems:
      'Technical debt in monolithic core systems, fractured identity management, and slow deployment cycles.',
    solutions:
      'Microservices strangler fig migration, federated IAM implementation, and automated CI/CD pipeline orchestration.',
    results:
      'Typical focus: safer modernization paths, clearer identity boundaries, and faster release cadence without big-bang rewrites.',
  },
  {
    num: '04',
    title: 'Manufacturing',
    problems:
      'Lack of shop-floor visibility, reactive equipment maintenance, and disconnected IT/OT environments.',
    solutions:
      'IoT sensor integration pipelines, predictive maintenance machine learning models, and unified SCADA dashboards.',
    results:
      'Typical focus: better shop-floor visibility and maintenance signals—specific gains defined with plant and IT stakeholders.',
  },
]

export default function Industries() {
  usePageMeta('/industries')
  assertSceneBudget('industries', ['reveal'])

  return (
    <>
      <PageHero
        eyebrow="Industry expertise"
        lines={['Engineered for precise', 'sector demands.']}
        body="I don’t ship generic platforms into specialized worlds. Every system is grounded in the operational realities of your industry — from logistics to healthcare to manufacturing."
      />

      <section className="w-full py-section-gap md:py-section-gap-lg px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
          {industries.map((ind, i) => (
            <ScrollOnce
              key={ind.num}
              delay={i * 70}
              className="bg-surface-container-lowest border border-outline-variant p-6 sm:p-8 md:p-12 hover:shadow-sm transition-shadow duration-300"
            >
              <div className="flex justify-between items-start gap-4 mb-10 md:mb-16">
                <h2 className="font-headline-sm sm:font-headline-md text-headline-sm sm:text-headline-md text-primary">
                  {ind.title}
                </h2>
                <span className="font-mono-data text-mono-data bg-surface-container px-3 py-1 rounded">
                  {ind.num}
                </span>
              </div>
              <div className="space-y-8">
                <div>
                  <h3 className="font-label-caps text-label-caps text-on-surface-variant mb-2 border-b border-outline-variant pb-2">
                    SPECIFIC PROBLEMS
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface">{ind.problems}</p>
                </div>
                <div>
                  <h3 className="font-label-caps text-label-caps text-on-surface-variant mb-2 border-b border-outline-variant pb-2">
                    TAILORED SOLUTIONS
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface">{ind.solutions}</p>
                </div>
                <div className="bg-surface px-6 py-4 border border-outline-variant">
                  <h3 className="font-label-caps text-label-caps text-primary mb-1">
                    INDUSTRY RESULTS
                  </h3>
                  <p className="font-mono-data text-mono-data text-on-surface-variant">
                    {ind.results}
                  </p>
                </div>
              </div>
            </ScrollOnce>
          ))}
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
