import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../components/Icon'
import { SOLUTION_DOMAINS, SOLUTIONS } from '../data/solutions'
import { usePageMeta } from '../hooks/usePageMeta'

export default function Solutions() {
  usePageMeta('/solutions')
  const [activeId, setActiveId] = useState(SOLUTION_DOMAINS[0].id)

  useEffect(() => {
    const onHash = () => {
      const id = window.location.hash.replace(/^#/, '')
      if (id && SOLUTION_DOMAINS.some((d) => d.id === id)) {
        setActiveId(id)
      }
    }
    onHash()
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  return (
    <>
      <header className="pt-section-gap pb-32 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          <div className="md:col-span-8 flex flex-col gap-6">
            <span className="font-mono-data text-mono-data text-on-surface-variant flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-outline-variant" /> CAPABILITIES ARCHITECTURE
            </span>
            <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-primary">
              Precision solutions for complex engineering challenges.
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mt-4">
              We translate business friction into structural software architecture across six core
              domains — mitigating risk, accelerating deployment, and ensuring operational
              resilience.
            </p>
          </div>
        </div>
      </header>

      <section className="px-margin-mobile md:px-margin-desktop pb-section-gap max-w-container-max mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          <aside className="hidden md:block md:col-span-3">
            <nav
              className="sticky top-32 flex flex-col gap-4 border-l border-outline-variant pl-6"
              aria-label="Solution domains"
            >
              <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest mb-2">
                Domains
              </span>
              {SOLUTION_DOMAINS.map((d) => (
                <a
                  key={d.id}
                  href={`#${d.id}`}
                  onClick={() => setActiveId(d.id)}
                  className={
                    activeId === d.id
                      ? 'font-body-md text-body-md text-primary font-bold hover:opacity-80 transition-opacity'
                      : 'font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors'
                  }
                >
                  {d.label}
                </a>
              ))}
            </nav>
          </aside>

          <div className="md:col-span-9 flex flex-col gap-32">
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
                  <div className="mt-4 p-6 bg-slate-50 border border-slate-200 rounded">
                    <h3 className="font-label-caps text-label-caps text-primary uppercase tracking-widest mb-3">
                      Problems Solved
                    </h3>
                    <ul className="font-body-md text-body-md text-on-surface-variant flex flex-col gap-2">
                      {s.problems.map((p) => (
                        <li key={p} className="flex gap-2">
                          <span className="text-primary">—</span> {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="flex flex-col justify-between pt-16 lg:pt-0">
                  <div className="flex flex-col gap-8">
                    <div>
                      <h3 className="font-label-caps text-label-caps text-primary uppercase tracking-widest mb-4 border-b border-slate-200 pb-2">
                        Core Services
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {s.services.map((svc) => (
                          <span
                            key={svc}
                            className="font-mono-data text-mono-data px-3 py-1 bg-slate-50 border border-slate-200 rounded flex items-center gap-2"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-primary" /> {svc}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-label-caps text-label-caps text-primary uppercase tracking-widest mb-4 border-b border-slate-200 pb-2">
                        Ideal Clients
                      </h3>
                      <p className="font-body-md text-body-md text-on-surface-variant">{s.clients}</p>
                    </div>
                  </div>
                  <Link
                    to="/work"
                    className="inline-flex items-center gap-2 font-mono-data text-mono-data text-primary hover:opacity-80 transition-opacity mt-8 lg:mt-0 uppercase"
                  >
                    View Case Studies <Icon name="arrow_forward" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-32 border-y border-slate-200">
        <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto text-center flex flex-col items-center">
          <h2 className="font-headline-md text-headline-md text-primary max-w-2xl mb-6">
            Ready to architect a solution for your specific operational friction?
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant mb-10 max-w-xl">
            Engage with our technical consulting team for a structural audit and capability
            assessment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/contact" className="btn-primary shadow-sm">
              Schedule Assessment
            </Link>
            <Link to="/process" className="btn-secondary">
              Review Process
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
