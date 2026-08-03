import { Link } from 'react-router-dom'
import { usePageMeta } from '../hooks/usePageMeta'

export default function NotFound() {
  usePageMeta('/404')

  return (
    <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap md:py-section-gap-lg text-center">
      <p className="font-mono-data text-mono-data text-on-surface-variant mb-4">ERROR 404</p>
      <h1 className="font-display-lg-mobile text-display-lg-mobile md:font-display-lg md:text-display-lg text-primary mb-6">
        Page not found.
      </h1>
      <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl mx-auto mb-12">
        The page you requested does not exist or has been moved. Use the navigation or return home
        to continue.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link to="/" className="btn-primary">
          Return Home
        </Link>
        <Link to="/contact" className="btn-outline">
          Contact Me
        </Link>
      </div>
    </section>
  )
}
