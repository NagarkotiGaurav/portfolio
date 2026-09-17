import { Link } from 'react-router-dom'
import Icon from '../components/Icon'
import { usePageMeta } from '../hooks/usePageMeta'
import { assertSceneBudget } from '../motion/SceneRegistry'
import { PageHero, PrimaryCTA, ScrollOnce } from '../motion/patterns'
import { Narrative } from '../content/brandNarrative'
import { getPageMeta } from '../data/seo'
import { trackStrategyCall } from '../lib/analytics'

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
  const meta = getPageMeta('/resources')
  assertSceneBudget('resources', ['processGuide', 'cta'])

  return (
    <>
      <PageHero
        eyebrow="Why work with me"
        title={meta.h1}
        body="I’m a technical partner for operators who need an architect, not a bench. Remote for US, UK, and EU teams. English. USD. Written decisions. Systems you own."
      />

      <section className="py-section-gap md:py-section-gap-lg px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <ScrollOnce className="mb-16">
          <h2 className="font-headline-md text-headline-md text-primary mb-4">
            Engineering Philosophy
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
            Principles that guide every architectural decision and line of code.
          </p>
        </ScrollOnce>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {philosophy.map((card, i) =>
            card.invert ? (
              <ScrollOnce
                key={card.title}
                delay={i * 80}
                className={`bg-primary p-8 rounded-lg text-on-primary flex flex-col h-full relative overflow-hidden ${card.span}`}
              >
                <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
                  <Icon name={card.icon} className="text-[200px]" filled />
                </div>
                <Icon name={card.icon} className="mb-6 text-4xl" filled={card.filled} />
                <h3 className="font-headline-sm text-headline-sm mb-4">{card.title}</h3>
                <p className="font-body-md text-body-md mt-auto max-w-lg">{card.body}</p>
              </ScrollOnce>
            ) : (
              <ScrollOnce
                key={card.title}
                delay={i * 80}
                className={`bg-surface-container-low p-8 rounded-lg border border-outline-variant flex flex-col h-full hover:bg-surface-container transition-colors duration-300 ${card.span}`}
              >
                <Icon name={card.icon} className="text-primary mb-6 text-4xl" />
                <h3 className="font-headline-sm text-headline-sm text-primary mb-4">{card.title}</h3>
                <p className="font-body-md text-body-md text-on-surface-variant mt-auto max-w-lg">
                  {card.body}
                </p>
              </ScrollOnce>
            ),
          )}
        </div>
      </section>

      <section className="py-section-gap md:py-section-gap-lg px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto border-t border-outline-variant">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          <ScrollOnce className="md:col-span-4">
            <div className="md:sticky md:top-32">
              <h2 className="font-headline-md text-headline-md text-primary">The Process</h2>
              <p className="font-body-md text-body-md text-on-surface-variant mt-4 max-w-sm">
                A structured approach to transforming complex requirements into reliable software.
              </p>
            </div>
          </ScrollOnce>

          <ol className="md:col-span-8 flex flex-col gap-12 list-none m-0 p-0 mt-10 md:mt-0">
            {steps.map((step, i) => (
              <ScrollOnce
                as="li"
                key={step.num}
                delay={i * 60}
                className="grid grid-cols-[3rem_minmax(0,1fr)] gap-4 md:gap-6 items-start"
              >
                <div className="relative flex flex-col items-center self-stretch w-12 justify-self-center">
                  {!step.last && (
                    <span
                      className="pointer-events-none absolute left-1/2 top-2 z-0 w-px -translate-x-1/2 bg-outline-variant"
                      style={{ bottom: '-3.5rem' }}
                      aria-hidden
                    />
                  )}
                  <span
                    className={`relative z-10 w-4 h-4 shrink-0 rounded-full ${
                      step.filled ? 'bg-primary' : 'bg-surface border-2 border-primary'
                    }`}
                    aria-hidden
                  />
                </div>

                <div className="min-w-0 pt-0">
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
              </ScrollOnce>
            ))}
          </ol>
        </div>
      </section>

      <ScrollOnce className="py-section-gap md:py-section-gap-lg px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto text-center">
        <h2 className="font-display-lg-mobile text-display-lg-mobile md:font-display-lg md:text-display-lg text-primary mb-8">
          Ready to build?
        </h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant mb-12 max-w-2xl mx-auto">
          Tell me the constraint. I’ll map a clear path to something your team can ship and own.
        </p>
        <PrimaryCTA>
          <Link
            to="/contact"
            className="btn-primary"
            onClick={() => trackStrategyCall({ scene: 'resources' })}
          >
            {Narrative.ctaStyle.primary}
          </Link>
        </PrimaryCTA>
      </ScrollOnce>
    </>
  )
}
