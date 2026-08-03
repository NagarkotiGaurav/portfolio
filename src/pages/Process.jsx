import { Link } from 'react-router-dom'
import Icon from '../components/Icon'
import { usePageMeta } from '../hooks/usePageMeta'
import { assertSceneBudget } from '../motion/SceneRegistry'
import useGsapScene from '../motion/hooks/useGsapScene'
import { Motion } from '../design/motionTokens'
import { PrimaryCTA, ScrollOnce } from '../motion/patterns'
import { Narrative } from '../content/brandNarrative'

const phases = [
  {
    num: '01',
    title: 'Discovery',
    icon: 'radar',
    body: 'Align on business objectives, technical constraints, and outcomes. I set baseline success metrics before writing a single line of code.',
    mobile: 'Align on objectives, constraints, and success metrics.',
    items: ['Stakeholder Interviews', 'Technical Feasibility Assessment', 'Resource Mapping'],
  },
  {
    num: '02',
    title: 'Research',
    icon: 'science',
    body: 'Deep dive into existing systems, market context, and stack options. Assumptions get validated against real data — not wishful diagrams.',
    mobile: 'Deep dive into existing systems and market context.',
  },
  {
    num: '03',
    title: 'Architecture',
    icon: 'architecture',
    body: 'Design the structural foundation: blueprints for scale, security, and performance under load — clear enough that your team can own them.',
    mobile: 'Designing the structural foundation.',
  },
  {
    num: '04',
    title: 'Proposal',
    icon: 'description',
    body: 'A concrete plan: scope, timeline, deliverables, and trade-offs — so you approve with eyes open before execution starts.',
    mobile: 'Formalizing the plan and detailed scoping.',
  },
  {
    num: '05',
    title: 'Development',
    icon: 'terminal',
    body: 'Iterative build and integration with rigorous engineering standards and continuous delivery — shipping increments you can evaluate.',
    mobile: 'Iterative coding and integration.',
    ongoing: ['06. Testing', '07. Deployment', '08. Optimization', '09. Support'],
    last: true,
  },
]

function TimelineSpine() {
  return (
    <span
      className="process-guide-line pointer-events-none absolute left-1/2 top-6 z-0 w-px bg-primary origin-top"
      style={{ bottom: '-5.5rem' }}
      aria-hidden
    />
  )
}

function PhaseCard({ phase }) {
  return (
    <div className="bg-surface-container-low p-6 md:p-8 border border-outline-variant rounded">
      <p className="font-body-md text-body-md text-on-surface-variant mb-6 hidden md:block">
        {phase.body}
      </p>
      <p className="font-body-md text-body-md text-on-surface-variant md:hidden">{phase.mobile}</p>
      {phase.items && (
        <ul className="hidden md:block space-y-3 font-mono-data text-mono-data text-on-surface">
          {phase.items.map((item) => (
            <li key={item} className="flex items-start">
              <span className="text-outline mr-3">—</span> {item}
            </li>
          ))}
        </ul>
      )}
      {phase.ongoing && (
        <div className="hidden md:block mt-4 p-4 bg-surface-container-lowest border border-outline-variant rounded">
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
  )
}

export default function Process() {
  usePageMeta('/process')
  assertSceneBudget('process', ['timelineDraw', 'cta'])

  const listRef = useGsapScene(({ gsap, root, reduced }) => {
    if (reduced) {
      root.querySelectorAll('.process-guide-line').forEach((el) => {
        gsap.set(el, { scaleY: 1, xPercent: -50 })
      })
      return
    }
    gsap.utils.toArray('.process-guide-line', root).forEach((line) => {
      gsap.fromTo(
        line,
        { scaleY: 0, xPercent: -50 },
        {
          scaleY: 1,
          xPercent: -50,
          ease: Motion.ease.primary,
          scrollTrigger: {
            trigger: line.parentElement,
            start: 'top 75%',
            end: 'bottom 40%',
            scrub: true,
          },
        },
      )
    })
    gsap.utils.toArray('.process-node', root).forEach((node) => {
      gsap.fromTo(
        node,
        { scale: 0.85, opacity: 0.5 },
        {
          scale: 1,
          opacity: 1,
          duration: Motion.duration.normal,
          ease: Motion.ease.primary,
          scrollTrigger: {
            trigger: node,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        },
      )
    })
  }, [])

  return (
    <>
      <ScrollOnce className="pt-section-gap md:pt-section-gap-lg pb-16 md:pb-32 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          <div className="col-span-1 md:col-span-8">
            <span className="inline-block px-2 py-1 bg-surface-container-high text-on-surface-variant font-mono-data text-mono-data rounded uppercase tracking-wider mb-6">
              <span className="inline-block w-2 h-2 rounded-full bg-outline mr-2 align-middle" />
              Methodology
            </span>
            <h1 className="font-display-lg-mobile text-display-lg-mobile md:font-display-lg md:text-display-lg text-primary mb-8 tracking-tighter">
              How I deliver.
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
              A clear path from first conversation to production — so you always know what happens
              next, and why.
            </p>
          </div>
        </div>
      </ScrollOnce>

      <section className="pb-section-gap md:pb-section-gap-lg px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <ol ref={listRef} className="flex flex-col gap-16 list-none m-0 p-0" data-primary="timelineDraw">
          {phases.map((phase) => (
            <li key={phase.num} className="group">
              <div className="grid grid-cols-[3rem_minmax(0,1fr)] md:grid-cols-[minmax(0,3fr)_3rem_minmax(0,8fr)] gap-4 md:gap-gutter items-start">
                <div className="hidden md:block pt-2 order-1 md:order-none">
                  <span className="font-mono-data text-mono-data text-on-surface-variant group-hover:text-primary transition-colors">
                    Phase {phase.num}
                  </span>
                  <h3 className="font-headline-md text-headline-md text-primary mt-2">{phase.title}</h3>
                </div>

                <div className="relative flex flex-col items-center self-stretch w-12 justify-self-center">
                  {!phase.last && <TimelineSpine />}
                  <div className="process-node group-hover:bg-primary group-hover:text-on-primary transition-colors duration-300">
                    <span className="md:hidden font-mono-data text-mono-data">{phase.num}</span>
                    <Icon name={phase.icon} className="hidden md:block text-[20px]" />
                  </div>
                </div>

                <div className="min-w-0">
                  <h3 className="md:hidden font-headline-sm text-headline-sm text-primary mb-4">
                    {phase.title}
                  </h3>
                  <PhaseCard phase={phase} />
                </div>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <ScrollOnce className="pb-section-gap md:pb-section-gap-lg px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto text-center border-t border-outline-variant pt-section-gap md:pt-section-gap-lg">
        <h2 className="font-headline-md text-headline-md text-primary mb-4">Ready to start?</h2>
        <p className="font-body-md text-body-md text-on-surface-variant mb-8 max-w-xl mx-auto">
          Tell me the objective and the constraint. I’ll map a clear path to execution.
        </p>
        <PrimaryCTA>
          <Link to="/contact" className="btn-primary">
            {Narrative.ctaStyle.primary}
          </Link>
        </PrimaryCTA>
      </ScrollOnce>
    </>
  )
}
