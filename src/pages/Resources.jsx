import { Link } from 'react-router-dom'
import Icon from '../components/Icon'
import { usePageMeta } from '../hooks/usePageMeta'

const philosophy = [
  {
    icon: 'architecture',
    title: 'Architecture First',
    body: 'Measure twice, cut once. Upfront system design prevents costly technical debt and ensures scalable foundations.',
    span: '',
  },
  {
    icon: 'speed',
    title: 'Velocity through Stability',
    body: 'True development speed comes from robust testing, clear documentation, and CI/CD pipelines, not cutting corners. Reliability enables continuous momentum.',
    span: 'md:col-span-2',
    invert: true,
    filled: true,
  },
  {
    icon: 'forum',
    title: 'Asynchronous Clarity',
    body: 'Over-communication via written artifacts. Decisions are documented, progress is visible, and meetings are reserved for high-bandwidth strategic alignment.',
    span: 'md:col-span-2',
  },
  {
    icon: 'security',
    title: 'Secure by Default',
    body: 'Security and compliance are integrated into the development lifecycle from day one, never bolted on as an afterthought.',
    span: '',
  },
]

const steps = [
  {
    num: '01',
    title: 'Discovery & System Design',
    body: 'Deep dive into business objectives, technical constraints, and data models. Delivering a comprehensive architecture blueprint before coding begins.',
    items: [
      'Technical Requirements Document',
      'Database Schema Design',
      'API Contract Definition',
    ],
    filled: false,
  },
  {
    num: '02',
    title: 'Iterative Engineering',
    body: 'Execution phase defined by weekly sprints, continuous integration, and transparent code reviews. Building functional increments of the system.',
    items: [
      'Weekly Progress Demos',
      'Automated Test Coverage',
      'Staging Environment Deployments',
    ],
    filled: true,
  },
  {
    num: '03',
    title: 'Handoff & Operations',
    body: 'Finalizing the build with comprehensive documentation, operational runbooks, and team training to ensure long-term maintainability.',
    items: [
      'Infrastructure as Code (IaC) Scripts',
      'Developer Documentation',
      'Performance Monitoring Setup',
    ],
    filled: false,
    last: true,
  },
]

export default function Resources() {
  usePageMeta('/resources')

  return (
    <>
      <section className="pt-24 pb-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto border-b border-outline-variant">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-end">
          <div className="md:col-span-8">
            <div className="inline-flex items-center space-x-2 mb-8 bg-surface-container-high px-3 py-1 rounded font-mono-data text-mono-data">
              <span className="w-2 h-2 rounded-full bg-primary" />
              <span>Partnership Model</span>
            </div>
            <h1 className="font-display-lg-mobile text-display-lg-mobile md:font-display-lg md:text-display-lg text-primary mb-8">
              Precision engineering.
              <br />
              Predictable delivery.
            </h1>
          </div>
          <div className="md:col-span-4 md:pb-4">
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              We are not just a vendor. We are a technical partner focused on clarity, rigorous
              architecture, and shipping reliable systems. No fluff, just results.
            </p>
          </div>
        </div>
      </section>

      <section className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="mb-16">
          <h2 className="font-headline-md text-headline-md text-primary mb-4">
            Engineering Philosophy
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
            Principles that guide every architectural decision and line of code.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {philosophy.map((card) =>
            card.invert ? (
              <div
                key={card.title}
                className={`bg-primary p-8 rounded-lg text-on-primary flex flex-col h-full relative overflow-hidden ${card.span}`}
              >
                <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
                  <Icon name={card.icon} className="text-[200px]" filled />
                </div>
                <Icon name={card.icon} className="mb-6 text-4xl" filled={card.filled} />
                <h3 className="font-headline-sm text-headline-sm mb-4">{card.title}</h3>
                <p className="font-body-md text-body-md mt-auto max-w-lg">{card.body}</p>
              </div>
            ) : (
              <div
                key={card.title}
                className={`bg-surface-container-low p-8 rounded-lg border border-outline-variant flex flex-col h-full hover:bg-surface-container transition-colors duration-300 ${card.span}`}
              >
                <Icon name={card.icon} className="text-primary mb-6 text-4xl" />
                <h3 className="font-headline-sm text-headline-sm text-primary mb-4">{card.title}</h3>
                <p className="font-body-md text-body-md text-on-surface-variant mt-auto max-w-lg">
                  {card.body}
                </p>
              </div>
            ),
          )}
        </div>
      </section>

      <section className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto border-t border-outline-variant">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          <div className="md:col-span-4">
            <h2 className="font-headline-md text-headline-md text-primary sticky top-32">
              The Process
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-4">
              A structured approach to transforming complex requirements into reliable software.
            </p>
          </div>
          <div className="md:col-span-8 space-y-12 mt-12 md:mt-0">
            {steps.map((step) => (
              <div key={step.num} className="relative pl-8 md:pl-0">
                {!step.last && (
                  <div className="hidden md:block absolute left-[-64px] top-0 bottom-0 w-px bg-outline-variant" />
                )}
                <div
                  className={`hidden md:flex absolute left-[-72px] top-1 w-4 h-4 rounded-full items-center justify-center ${
                    step.filled
                      ? 'bg-primary'
                      : 'bg-surface border-2 border-primary'
                  }`}
                />
                <div className="font-mono-data text-mono-data text-on-surface-variant mb-2">
                  Phase {step.num}
                </div>
                <h3 className="font-headline-sm text-headline-sm text-primary mb-4">{step.title}</h3>
                <p className="font-body-md text-body-md text-on-surface-variant mb-6">{step.body}</p>
                <ul className="space-y-2 font-mono-data text-mono-data text-on-surface">
                  {step.items.map((item) => (
                    <li key={item}>— {item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto text-center">
        <h2 className="font-display-lg-mobile text-display-lg-mobile md:font-display-lg md:text-display-lg text-primary mb-8">
          Ready to build?
        </h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant mb-12 max-w-2xl mx-auto">
          Let&apos;s discuss your technical challenges and establish a reliable path to production.
        </p>
        <Link to="/contact" className="btn-primary hover:bg-surface-tint">
          Initiate Project Discussion
        </Link>
      </section>
    </>
  )
}
