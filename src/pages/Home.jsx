import { Link } from 'react-router-dom'
import Icon from '../components/Icon'
import { usePageMeta } from '../hooks/usePageMeta'

const metrics = [
  { label: 'Projects Delivered', value: '120+' },
  { label: 'Technologies', value: '15+' },
  { label: 'Years Experience', value: '12' },
  { label: 'Client Satisfaction', value: '99%' },
]

const problems = [
  {
    icon: 'rocket_launch',
    title: 'MVP?',
    body: 'Rapid prototyping and development to validate concepts quickly.',
    to: '/solutions#software-dev',
  },
  {
    icon: 'schema',
    title: 'ERP?',
    body: 'Custom enterprise resource planning solutions for streamlined operations.',
    to: '/solutions#erp',
  },
  {
    icon: 'manufacturing',
    title: 'Automation?',
    body: 'Eliminate manual tasks with intelligent workflow automation.',
    to: '/solutions#ai-automation',
  },
  {
    icon: 'memory',
    title: 'AI?',
    body: 'Integrate machine learning models to unlock predictive insights.',
    to: '/solutions#ai-automation',
  },
]

export default function Home() {
  usePageMeta('/')

  return (
    <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap">
      <section className="grid grid-cols-1 md:grid-cols-12 gap-gutter mb-section-gap">
        <div className="col-span-1 md:col-span-10 md:col-start-2 text-center">
          <div className="inline-flex items-center space-x-2 bg-surface-container-low px-3 py-1 rounded font-mono-data text-mono-data mb-8">
            <span className="w-2 h-2 rounded-full bg-primary block" />
            <span>Systems Architecture &amp; Engineering</span>
          </div>
          <h1 className="font-display-lg-mobile text-display-lg-mobile md:font-display-lg md:text-display-lg text-primary mb-8 tracking-tighter">
            Helping businesses build, automate and scale through technology.
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl mx-auto mb-12">
            We partner with ambitious companies to design and engineer resilient systems that drive
            operational efficiency and unlock new revenue streams.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/contact" className="btn-primary shadow-sm">
              Book Discovery Call
            </Link>
            <Link to="/work" className="btn-secondary">
              Explore Our Work
            </Link>
          </div>
        </div>
      </section>

      <section className="mb-section-gap" aria-label="Key metrics">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {metrics.map((m) => (
            <div
              key={m.label}
              className="bg-surface-container-lowest border border-outline-variant p-6 rounded flex flex-col justify-between"
            >
              <span className="font-mono-data text-mono-data text-on-surface-variant uppercase tracking-widest text-[10px]">
                {m.label}
              </span>
              <span className="font-headline-md text-headline-md text-primary mt-4">{m.value}</span>
            </div>
          ))}
          <div className="bg-primary text-on-primary p-6 rounded flex flex-col justify-between col-span-2 md:col-span-1">
            <span className="font-mono-data text-mono-data opacity-80 uppercase tracking-widest text-[10px]">
              Availability
            </span>
            <span className="font-headline-sm text-headline-sm mt-4">Accepting New Projects</span>
          </div>
        </div>
      </section>

      <section className="mb-section-gap grid grid-cols-1 md:grid-cols-12 gap-gutter">
        <div className="md:col-span-4">
          <h2 className="font-headline-md text-headline-md text-primary mb-4">Problems We Solve</h2>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Navigating complex technical landscapes requires a strategic approach. We focus on
            critical bottlenecks that hinder growth.
          </p>
        </div>
        <div className="md:col-span-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {problems.map((p) => (
              <Link
                key={p.title}
                to={p.to}
                className="border border-outline-variant p-6 rounded hover:bg-surface-container-low transition-colors group block"
              >
                <div className="flex items-center space-x-3 mb-2">
                  <Icon
                    name={p.icon}
                    className="text-primary group-hover:scale-110 transition-transform"
                  />
                  <h3 className="font-headline-sm text-headline-sm text-primary">{p.title}</h3>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant">{p.body}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-outline-variant pt-section-gap grid grid-cols-1 md:grid-cols-3 gap-gutter">
        <div>
          <h2 className="font-headline-sm text-headline-sm text-primary mb-3">Capabilities</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mb-4">
            Software, AI, process, ERP, commerce, and cloud engineering domains.
          </p>
          <Link to="/solutions" className="font-label-caps text-label-caps text-primary uppercase border-b border-primary pb-1">
            View Solutions
          </Link>
        </div>
        <div>
          <h2 className="font-headline-sm text-headline-sm text-primary mb-3">Industries</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mb-4">
            Healthcare, logistics, enterprise, and manufacturing — sector-specific architecture.
          </p>
          <Link to="/industries" className="font-label-caps text-label-caps text-primary uppercase border-b border-primary pb-1">
            Explore Industries
          </Link>
        </div>
        <div>
          <h2 className="font-headline-sm text-headline-sm text-primary mb-3">Start a Project</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mb-4">
            Share context for a structural assessment. We typically respond within 24 hours.
          </p>
          <Link to="/contact" className="btn-primary">
            Book a Discovery Call
          </Link>
        </div>
      </section>
    </div>
  )
}
