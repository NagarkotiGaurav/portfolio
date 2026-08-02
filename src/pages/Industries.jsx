import { Link } from 'react-router-dom'
import { usePageMeta } from '../hooks/usePageMeta'

const industries = [
  {
    num: '01',
    title: 'Healthcare',
    problems:
      'Data silos across legacy EMRs, stringent HIPAA compliance requirements, and high-latency patient data retrieval impacting clinical decisions.',
    solutions:
      'FHIR-compliant interoperability layers, zero-trust architecture data pipelines, and real-time clinical decision support interfaces.',
    results: '40% reduction in data retrieval latency. 100% compliance audit pass rate.',
  },
  {
    num: '02',
    title: 'Logistics',
    problems:
      'Opaque supply chain nodes, inefficient last-mile routing algorithms, and disjointed inventory forecasting.',
    solutions:
      'Event-driven architecture for real-time tracking, predictive AI routing models, and automated ledger consensus.',
    results: '22% increase in last-mile efficiency. 99.9% real-time tracking accuracy.',
  },
  {
    num: '03',
    title: 'Enterprise',
    problems:
      'Technical debt in monolithic core systems, fractured identity management, and slow deployment cycles.',
    solutions:
      'Microservices strangler fig migration, federated IAM implementation, and automated CI/CD pipeline orchestration.',
    results: '3x faster deployment frequency. 60% reduction in identity-related support tickets.',
  },
  {
    num: '04',
    title: 'Manufacturing',
    problems:
      'Lack of shop-floor visibility, reactive equipment maintenance, and disconnected IT/OT environments.',
    solutions:
      'IoT sensor integration pipelines, predictive maintenance machine learning models, and unified SCADA dashboards.',
    results: '15% reduction in unplanned downtime. Granular yield tracking enabled.',
  },
]

export default function Industries() {
  usePageMeta('/industries')

  return (
    <>
      <section className="w-full py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto border-b border-outline-variant">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-end">
          <div className="md:col-span-8">
            <span className="font-mono-data text-mono-data text-on-surface-variant mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-outline-variant" />
              INDUSTRY EXPERTISE
            </span>
            <h1 className="font-display-lg-mobile text-display-lg-mobile md:font-display-lg md:text-display-lg text-primary mb-6">
              Engineered for precise sector demands.
            </h1>
          </div>
          <div className="md:col-span-4 md:pb-4">
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              We don&apos;t just build software; we architect solutions grounded in the specific
              operational realities of your industry. From complex logistics to high-stakes
              healthcare, our approach is defined by domain authority.
            </p>
          </div>
        </div>
      </section>

      <section className="w-full py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
          {industries.map((ind) => (
            <div
              key={ind.num}
              className="bg-surface-container-lowest border border-outline-variant p-8 md:p-12 hover:shadow-sm transition-shadow duration-300"
            >
              <div className="flex justify-between items-start mb-16">
                <h2 className="font-headline-md text-headline-md text-primary">{ind.title}</h2>
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
            </div>
          ))}
        </div>
        <div className="mt-16 text-center">
          <Link to="/contact" className="btn-primary">
            Book a Discovery Call
          </Link>
        </div>
      </section>
    </>
  )
}
