import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../components/Icon'
import { SOLUTION_DOMAINS, SOLUTIONS } from '../data/solutions'
import { usePageMeta } from '../hooks/usePageMeta'
import { assertSceneBudget } from '../motion/SceneRegistry'
import { Atmosphere, Parallax, PrimaryCTA, ScrollOnce } from '../motion/patterns'
import { Narrative } from '../content/brandNarrative'

export default function Solutions() {
  usePageMeta('/solutions')
  assertSceneBudget('solutions', ['domainStory', 'cta'])
  const [activeId, setActiveId] = useState(SOLUTION_DOMAINS[0].id)
  const clickingRef = useRef(false)

  // Scrollspy: Domains sidebar / chips follow the section in view
  useEffect(() => {
    const sections = SOLUTION_DOMAINS.map((d) => document.getElementById(d.id)).filter(Boolean)
    if (!sections.length) return undefined

    const visible = new Map()

    const observer = new IntersectionObserver(
      (entries) => {
        if (clickingRef.current) return

        entries.forEach((entry) => {
          visible.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0)
        })

        const intersecting = sections.filter((el) => (visible.get(el.id) || 0) > 0.05)
        if (!intersecting.length) return

        intersecting.sort(
          (a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top,
        )
        const top =
          intersecting.find((el) => el.getBoundingClientRect().top >= 72) || intersecting[0]
        const bestId = top.id

        setActiveId((prev) => {
          if (prev === bestId) return prev
          const nextHash = `#${bestId}`
          if (window.location.hash !== nextHash) {
            window.history.replaceState(null, '', nextHash)
          }
          return bestId
        })
      },
      {
        // Active band near upper viewport (sticky nav offset)
        rootMargin: '-15% 0px -55% 0px',
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      },
    )

    sections.forEach((el) => observer.observe(el))

    const onHash = () => {
      const id = window.location.hash.replace(/^#/, '')
      if (id && SOLUTION_DOMAINS.some((d) => d.id === id)) {
        setActiveId(id)
      }
    }
    onHash()
    window.addEventListener('hashchange', onHash)

    return () => {
      observer.disconnect()
      window.removeEventListener('hashchange', onHash)
    }
  }, [])

  function activateDomain(id) {
    clickingRef.current = true
    setActiveId(id)
    window.setTimeout(() => {
      clickingRef.current = false
    }, 700)
  }

  const domainLinkClass = (id, variant) => {
    const active = activeId === id
    if (variant === 'chip') {
      return active
        ? 'snap-start shrink-0 font-mono-data text-mono-data px-3 py-2 rounded bg-primary text-on-primary'
        : 'snap-start shrink-0 font-mono-data text-mono-data px-3 py-2 rounded border border-outline-variant text-on-surface-variant'
    }
    return active
      ? 'relative font-body-md text-body-md text-primary font-bold pl-3 -ml-px border-l-2 border-primary'
      : 'relative font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors pl-3 -ml-px border-l-2 border-transparent'
  }

  return (
    <>
      <ScrollOnce className="pt-section-gap md:pt-section-gap-lg pb-16 md:pb-32 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          <div className="md:col-span-8 flex flex-col gap-6">
            <span className="font-mono-data text-mono-data text-on-surface-variant flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-outline-variant" /> WHAT I BUILD
            </span>
            <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-primary">
              Build software that gives your business a competitive advantage.
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mt-4">
              Six domains. One focus: turn operational friction into systems that ship, scale, and
              stay maintainable after I hand them over.
            </p>
          </div>
        </div>
      </ScrollOnce>

      <section className="px-margin-mobile md:px-margin-desktop pb-section-gap md:pb-section-gap-lg max-w-container-max mx-auto">
        <div className="domain-scroller mb-10" aria-label="Solution domains">
          {SOLUTION_DOMAINS.map((d) => (
            <a
              key={d.id}
              href={`#${d.id}`}
              aria-current={activeId === d.id ? 'true' : undefined}
              onClick={() => activateDomain(d.id)}
              className={domainLinkClass(d.id, 'chip')}
            >
              {d.label}
            </a>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          <aside className="hidden md:block md:col-span-3">
            <nav
              className="sticky top-32 flex flex-col gap-4 border-l border-outline-variant"
              aria-label="Solution domains"
            >
              <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest mb-2 pl-6">
                Domains
              </span>
              {SOLUTION_DOMAINS.map((d) => (
                <a
                  key={d.id}
                  href={`#${d.id}`}
                  aria-current={activeId === d.id ? 'true' : undefined}
                  onClick={() => activateDomain(d.id)}
                  className={domainLinkClass(d.id, 'side')}
                >
                  {d.label}
                </a>
              ))}
            </nav>
          </aside>

          <div className="md:col-span-9 flex flex-col gap-16 md:gap-32">
            {SOLUTIONS.map((s) => (
              <article
                key={s.id}
                id={s.id}
                className="grid grid-cols-1 lg:grid-cols-2 gap-gutter pt-8 border-t border-outline-variant scroll-mt-28"
              >
                <div className="flex flex-col gap-6">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-mono-data text-mono-data text-on-surface-variant">
                      {s.num}
                    </span>
                    <h2 className="font-headline-md text-headline-md text-primary">{s.title}</h2>
                  </div>
                  <p className="font-body-md text-body-md text-on-surface-variant">{s.body}</p>
                  <div className="mt-4 p-6 bg-surface-container-low border border-outline-variant rounded">
                    <h3 className="font-label-caps text-label-caps text-primary uppercase tracking-widest mb-3">
                      Problems Solved
                    </h3>
                    <ul className="font-body-md text-body-md text-on-surface flex flex-col gap-2">
                      {s.problems.map((p) => (
                        <li key={p} className="flex gap-2">
                          <span className="text-secondary shrink-0">—</span> {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="flex flex-col justify-between pt-16 lg:pt-0">
                  <div className="flex flex-col gap-8">
                    <div>
                      <h3 className="font-label-caps text-label-caps text-primary uppercase tracking-widest mb-4 border-b border-outline-variant pb-2">
                        Core Services
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {s.services.map((svc) => (
                          <span
                            key={svc}
                            className="font-mono-data text-mono-data px-3 py-1.5 bg-surface-container-lowest text-on-surface border border-outline-variant rounded flex items-center gap-2"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" /> {svc}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-label-caps text-label-caps text-primary uppercase tracking-widest mb-4 border-b border-outline-variant pb-2">
                        Ideal Clients
                      </h3>
                      <p className="font-body-md text-body-md text-on-surface-variant">{s.clients}</p>
                    </div>
                  </div>
                  <Link
                    to="/work"
                    className="inline-flex items-center gap-2 font-mono-data text-mono-data text-primary hover:opacity-80 transition-opacity mt-8 lg:mt-0 uppercase"
                  >
                    Related Work <Icon name="arrow_forward" />
                  </Link>
                  {s.proof && (
                    <p className="font-mono-data text-mono-data text-on-surface-variant mt-4">
                      {s.proof}
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-surface-container-low py-16 md:py-32 border-y border-outline-variant">
        <Parallax speed={0.1} className="absolute inset-0 pointer-events-none opacity-80">
          <Atmosphere />
        </Parallax>
        <div className="relative px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto text-center flex flex-col items-center">
          <ScrollOnce>
            <h2 className="font-headline-md text-headline-md text-primary max-w-2xl mb-6">
              Stuck on a system that keeps slowing you down?
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mb-10 max-w-xl">
              Tell me the bottleneck. I’ll map a path — architecture, automation, or a rebuild that
              actually pays for itself.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full">
              <PrimaryCTA>
                <Link to="/contact" className="btn-primary shadow-sm">
                  {Narrative.ctaStyle.primary}
                </Link>
              </PrimaryCTA>
              <Link to="/work" className="btn-outline">
                See Related Work
              </Link>
            </div>
          </ScrollOnce>
        </div>
      </section>
    </>
  )
}
