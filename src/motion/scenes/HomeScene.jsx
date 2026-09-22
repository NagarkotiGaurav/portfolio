import { Link } from 'react-router-dom'
import Icon from '../../components/Icon'
import { Narrative } from '../../content/brandNarrative'
import { Motion } from '../../design/motionTokens'
import { assertSceneBudget } from '../SceneRegistry'
import useGsapScene from '../hooks/useGsapScene'
import {
  Atmosphere,
  FocusHeadline,
  Marquee,
  PrimaryCTA,
  RevealMetrics,
  ScrollOnce,
} from '../patterns'
import { track, trackStrategyCall } from '../../lib/analytics'
import { getFeaturedProjects } from '../../data/projects'

const friction = [
  {
    title: 'Manual work is expensive',
    body: 'Every repetitive task burns budget. Every delayed response costs customers.',
    to: '/solutions/business-automation',
  },
  {
    title: 'Legacy systems stall growth',
    body: 'When the stack can’t keep up, every new idea becomes a six-month project.',
    to: '/solutions/custom-software-development',
  },
  {
    title: 'Disconnected tools create friction',
    body: 'Data silos slow decisions. I connect the systems your team already depends on.',
    to: '/solutions/erp-odoo-integration',
  },
]

const path = [
  { label: 'Solutions', to: '/solutions' },
  { label: 'Hire me', to: '/hire-software-architect' },
  { label: 'Case Studies', to: '/work' },
  { label: 'How I Work', to: '/process' },
  { label: 'Book a Call', to: '/contact' },
]

/**
 * Home experience — Curiosity. Budget: hero, statement, friction.
 * @maturity Stable
 */
export default function HomeScene() {
  assertSceneBudget('home', ['hero', 'statement', 'friction'])

  const rootRef = useGsapScene(({ gsap, selector, reduced }) => {
    if (reduced) return
    const q = selector
    const tl = gsap.timeline({
      defaults: { ease: Motion.ease.hero },
      onComplete: () => track({ intent: 'focus', scene: 'home', action: 'hero_complete' }),
    })

    tl.fromTo(
      q('[data-hero-meta]'),
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: Motion.duration.normal },
      0,
    )
      .fromTo(
        q('[data-hero-brand]'),
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: Motion.duration.normal },
        0.1,
      )
      .fromTo(
        q('[data-hero-sub]'),
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: Motion.duration.normal },
        0.45,
      )
      .fromTo(
        q('[data-hero-cta]'),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: Motion.duration.normal },
        0.55,
      )
      .fromTo(
        q('[data-hero-path]'),
        { opacity: 0 },
        { opacity: 1, duration: Motion.duration.normal },
        0.7,
      )
      .fromTo(
        q('[data-scroll-cue]'),
        { opacity: 0, y: -6 },
        { opacity: 0.7, y: 0, duration: Motion.duration.normal },
        0.85,
      )
  }, [])

  return (
    <div ref={rootRef} data-scene="home" data-emotion="curiosity">
      {/* Primary 1 — Hero */}
      <section className="relative overflow-hidden border-b border-outline-variant">
        <Atmosphere />
        <div className="relative max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-16 md:pt-32 pb-16 md:pb-28">
          <div className="max-w-4xl">
            <div
              data-hero-meta
              className="flex items-start sm:items-center gap-3 mb-8 md:mb-10 opacity-0"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-primary hero-pulse block mt-1.5 sm:mt-0 shrink-0" />
              <span className="font-mono-data text-[12px] sm:text-mono-data text-on-surface-variant uppercase tracking-widest leading-relaxed">
                <span className="sm:hidden">{Narrative.roles[0]}</span>
                <span className="hidden sm:inline">{Narrative.roles.join(' · ')}</span>
              </span>
            </div>

            <p
              data-hero-brand
              className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-[0.12em] sm:tracking-[0.2em] mb-4 md:mb-6 opacity-0"
            >
              {Narrative.name}
            </p>

            <FocusHeadline
              className="font-display-lg-mobile text-display-lg-mobile md:font-display-lg md:text-display-lg text-primary tracking-tighter mb-6 md:mb-8 max-w-3xl"
              lines={['I build software', 'that helps businesses', 'grow faster.']}
            />

            <p
              data-hero-sub
              className="font-body-lg text-body-lg text-on-surface-variant max-w-xl mb-8 md:mb-12 opacity-0"
            >
              Independent architect for US, UK, and European operators. I design and build custom
              software, commerce platforms, internal systems, automation, and AI products — in
              English, billed in USD, owned by your team. Based in India. Not a staff-aug bench.
            </p>

            <div
              data-hero-cta
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-12 md:mb-16 w-full sm:w-auto opacity-0"
            >
              <PrimaryCTA>
                <Link
                  to="/contact"
                  className="btn-primary"
                  onClick={() => trackStrategyCall({ scene: 'home', location: 'hero' })}
                >
                  {Narrative.ctaStyle.primary}
                </Link>
              </PrimaryCTA>
              <Link to="/work" className="btn-outline">
                {Narrative.ctaStyle.secondary}
              </Link>
            </div>

            <nav
              data-hero-path
              aria-label="Primary paths"
              className="flex flex-wrap gap-x-8 gap-y-3 opacity-0"
            >
              {path.map((item, i) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="font-mono-data text-mono-data text-on-surface-variant hover:text-primary transition-colors inline-flex items-center gap-2"
                >
                  <span className="text-outline">{String(i + 1).padStart(2, '0')}</span>
                  {item.label}
                </Link>
              ))}
            </nav>

            <p
              data-scroll-cue
              className="mt-16 font-mono-data text-mono-data text-on-surface-variant uppercase tracking-widest opacity-0"
            >
              Scroll
            </p>
          </div>
        </div>
      </section>

      {/* Proof — metrics (supports hero, not a 4th primary) */}
      <ScrollOnce
        intent="focus"
        className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-16 md:py-20"
      >
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4" aria-label="Proof metrics">
          {Narrative.trustSignals
            .filter((s) => s.id !== 'availability')
            .map((m) => (
              <div
                key={m.id}
                className="bg-surface-container-lowest border border-outline-variant p-4 sm:p-6 flex flex-col justify-between min-h-[6.5rem] sm:min-h-[7.5rem]"
              >
                <span className="font-mono-data text-mono-data text-on-surface-variant uppercase tracking-widest text-[10px] leading-snug">
                  {m.label}
                </span>
                <RevealMetrics
                  value={m.value}
                  className="font-headline-sm sm:font-headline-md text-headline-sm sm:text-headline-md text-primary mt-3 sm:mt-4"
                />
              </div>
            ))}
          <div className="bg-primary text-on-primary p-4 sm:p-6 flex flex-col justify-between col-span-2 md:col-span-1 min-h-[6.5rem] sm:min-h-[7.5rem]">
            <span className="font-mono-data text-mono-data opacity-80 uppercase tracking-widest text-[10px]">
              Availability
            </span>
            <span className="font-headline-sm text-headline-sm mt-3 sm:mt-4">
              Accepting new projects
            </span>
          </div>
        </div>
      </ScrollOnce>

      <Marquee
        items={[
          'Custom Software',
          'Web Applications',
          'Business Automation',
          'ERP Integration',
          'Ecommerce & Payments',
          'Software Architecture',
          ...Narrative.roles,
        ]}
      />

      {/* Primary 2 — Sticky statement (pin on desktop) */}
      <StickyStatement />

      {/* Primary 3 — Friction / problem path */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap md:py-section-gap-lg">
        <ScrollOnce className="mb-12 md:mb-16 max-w-2xl" intent="guide">
          <p className="font-mono-data text-mono-data text-on-surface-variant uppercase tracking-widest mb-4">
            Where I help
          </p>
          <h2 className="font-headline-md text-headline-md text-primary">
            Build software that gives your business a competitive advantage.
          </h2>
        </ScrollOnce>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {friction.map((item, i) => (
            <ScrollOnce key={item.title} delay={i * 90} intent="guide">
              <Link to={item.to} className="story-panel block h-full group">
                <span className="font-mono-data text-mono-data text-on-surface-variant">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-headline-sm text-headline-sm text-primary mt-6 mb-4 group-hover:opacity-80 transition-opacity">
                  {item.title}
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant mb-8">{item.body}</p>
                <span className="font-label-caps text-label-caps text-primary uppercase tracking-widest inline-flex items-center gap-2">
                  Explore <Icon name="arrow_forward" className="text-sm" />
                </span>
              </Link>
            </ScrollOnce>
          ))}
        </div>
      </section>

      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pb-section-gap md:pb-section-gap-lg">
        <ScrollOnce className="mb-10 max-w-2xl">
          <p className="font-mono-data text-mono-data text-on-surface-variant uppercase tracking-widest mb-4">
            Selected work
          </p>
          <h2 className="font-headline-md text-headline-md text-primary">
            Proof before the call.
          </h2>
        </ScrollOnce>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {getFeaturedProjects().map((project) => (
            <ScrollOnce key={project.slug}>
              <Link to={project.path} className="story-panel block h-full group">
                <span className="font-mono-data text-mono-data text-on-surface-variant uppercase tracking-widest">
                  {project.eyebrow}
                </span>
                <h3 className="font-headline-sm text-headline-sm text-primary mt-6 mb-4 group-hover:opacity-80 transition-opacity">
                  {project.crumb}
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant mb-8">{project.description}</p>
                <span className="font-label-caps text-label-caps text-primary uppercase tracking-widest inline-flex items-center gap-2">
                  Case study <Icon name="arrow_forward" className="text-sm" />
                </span>
              </Link>
            </ScrollOnce>
          ))}
        </div>
      </section>

      {/* CTA beat */}
      <ScrollOnce intent="feedback" className="border-t border-outline-variant">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap md:py-section-gap-lg text-center">
          <h2 className="font-display-lg-mobile text-display-lg-mobile md:text-headline-md md:font-headline-md text-primary mb-6">
            Ready to remove the bottleneck?
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl mx-auto mb-10">
            Tell me what you’re building. I’ll tell you what’s possible — and what I’d ship first.
          </p>
          <PrimaryCTA>
            <Link
              to="/contact"
              className="btn-primary"
              onClick={() => trackStrategyCall({ scene: 'home', location: 'cta_band' })}
            >
              {Narrative.ctaStyle.primary}
            </Link>
          </PrimaryCTA>
        </div>
      </ScrollOnce>
    </div>
  )
}

function StickyStatement() {
  const ref = useGsapScene(({ gsap, root, reduced }) => {
    if (reduced) return
    const mm = gsap.matchMedia()
    mm.add('(min-width: 768px)', () => {
      gsap.fromTo(
        root.querySelector('[data-statement-line]'),
        { opacity: 0.35, y: 40 },
        {
          opacity: 1,
          y: 0,
          ease: Motion.ease.smooth,
          scrollTrigger: {
            trigger: root,
            start: 'top 70%',
            end: 'top 20%',
            scrub: true,
          },
        },
      )
    })
  }, [])

  return (
    <section
      ref={ref}
      className="border-y border-outline-variant bg-surface-container-low"
      data-primary="statement"
    >
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-16 md:py-32">
        <h2
          data-statement-line
          className="font-display-lg-mobile text-display-lg-mobile md:font-display-lg md:text-display-lg text-primary tracking-tighter max-w-4xl"
        >
          Technology
          <br />
          shouldn’t
          <br />
          slow your
          <br />
          business down.
        </h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-lg mt-8 md:mt-10">
          I design systems that remove friction — so your team ships faster, operates cleaner, and
          spends less time fighting the stack.
        </p>
      </div>
    </section>
  )
}
