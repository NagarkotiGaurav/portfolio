import { Link } from 'react-router-dom'
import Icon from '../components/Icon'
import { usePageMeta } from '../hooks/usePageMeta'

const phases = [
  {
    num: '01',
    title: 'Discovery',
    icon: 'radar',
    body: 'Initial alignment on business objectives, technical constraints, and desired outcomes. We establish the baseline metrics for success before writing a single line of code.',
    mobile: 'Initial alignment on business objectives and technical constraints.',
    items: ['Stakeholder Interviews', 'Technical Feasibility Assessment', 'Resource Mapping'],
  },
  {
    num: '02',
    title: 'Research',
    icon: 'science',
    body: 'Deep dive into existing systems, market context, and potential technology stacks. We validate assumptions through empirical data gathering.',
    mobile: 'Deep dive into existing systems and market context.',
  },
  {
    num: '03',
    title: 'Architecture',
    icon: 'architecture',
    body: 'Designing the structural foundation. We create robust system blueprints ensuring scalability, security, and performance under load.',
    mobile: 'Designing the structural foundation.',
  },
  {
    num: '04',
    title: 'Proposal',
    icon: 'description',
    body: 'Formalizing the plan. Detailed scoping, timelines, and deliverables are presented for stakeholder approval before execution begins.',
    mobile: 'Formalizing the plan and detailed scoping.',
  },
  {
    num: '05',
    title: 'Development',
    icon: 'terminal',
    body: 'Iterative coding and integration. We build the solution using rigorous engineering standards and continuous integration practices.',
    mobile: 'Iterative coding and integration.',
    ongoing: ['06. Testing', '07. Deployment', '08. Optimization', '09. Support'],
    last: true,
  },
]

export default function Process() {
  usePageMeta('/process')

  return (
    <>
      <section className="pt-section-gap pb-32 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          <div className="col-span-1 md:col-span-8">
            <span className="inline-block px-2 py-1 bg-surface-container-high text-on-surface-variant font-mono-data text-mono-data rounded uppercase tracking-wider mb-6">
              <span className="inline-block w-2 h-2 rounded-full bg-outline mr-2 align-middle" />
              Methodology
            </span>
            <h1 className="font-display-lg-mobile text-display-lg-mobile md:font-display-lg md:text-display-lg text-primary mb-8 tracking-tighter">
              Engineering predictability.
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
              A highly transparent, 9-step chronological flow designed for rigorous technical
              execution and business alignment. Precision over guesswork.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="grid grid-cols-1 gap-y-16 relative">
          {phases.map((phase) => (
            <div
              key={phase.num}
              className="process-item relative flex flex-col md:flex-row md:items-start gap-6 group"
            >
              {!phase.last && (
                <>
                  <div
                    className="process-line hidden md:block"
                    style={{ left: 'calc(25% + 23px)' }}
                  />
                  <div className="process-line md:hidden" />
                </>
              )}

              <div className="md:hidden z-10 flex-shrink-0 w-12 h-12 rounded-full bg-surface-container-lowest border border-primary flex items-center justify-center font-mono-data text-mono-data text-primary">
                {phase.num}
              </div>

              <div className="hidden md:grid md:grid-cols-12 md:w-full md:gap-gutter items-start">
                <div className="col-span-3 pt-2">
                  <span className="font-mono-data text-mono-data text-on-surface-variant group-hover:text-primary transition-colors">
                    Phase {phase.num}
                  </span>
                  <h3 className="font-headline-md text-headline-md text-primary mt-2">
                    {phase.title}
                  </h3>
                </div>
                <div className="col-span-1 flex justify-center z-10 relative">
                  <div className="w-12 h-12 rounded-full bg-surface-container-lowest border border-primary flex items-center justify-center group-hover:bg-primary group-hover:text-on-primary transition-colors duration-300">
                    <Icon name={phase.icon} className="text-[20px]" />
                  </div>
                </div>
                <div className="col-span-8 bg-surface-container-low p-8 border border-outline-variant rounded">
                  <p className="font-body-md text-body-md text-on-surface-variant mb-6">
                    {phase.body}
                  </p>
                  {phase.items && (
                    <ul className="space-y-3 font-mono-data text-mono-data text-on-surface">
                      {phase.items.map((item) => (
                        <li key={item} className="flex items-start">
                          <span className="text-outline mr-3">—</span> {item}
                        </li>
                      ))}
                    </ul>
                  )}
                  {phase.ongoing && (
                    <div className="mt-4 p-4 bg-surface-container-lowest border border-outline-variant rounded">
                      <span className="font-mono-data text-mono-data text-primary block mb-2">
                        Ongoing phases include:
                      </span>
                      <ul className="space-y-2 font-mono-data text-mono-data text-on-surface-variant">
                        {phase.ongoing.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              <div className="md:hidden pl-16 -mt-12">
                <h3 className="font-headline-sm text-headline-sm text-primary mb-4">{phase.title}</h3>
                <div className="bg-surface-container-low p-6 border border-outline-variant rounded">
                  <p className="font-body-md text-body-md text-on-surface-variant mb-4">
                    {phase.mobile}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="pb-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto text-center border-t border-outline-variant pt-section-gap">
        <h2 className="font-headline-md text-headline-md text-primary mb-4">
          Ready for predictable delivery?
        </h2>
        <p className="font-body-md text-body-md text-on-surface-variant mb-8 max-w-xl mx-auto">
          Start with a discovery conversation. We map objectives, constraints, and a clear path to
          execution.
        </p>
        <Link to="/contact" className="btn-primary">
          Book a Discovery Call
        </Link>
      </section>
    </>
  )
}
