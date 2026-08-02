import { Link } from 'react-router-dom'
import { BRAND, FOOTER_LINKS } from '../data/site'

export default function Footer() {
  return (
    <footer className="bg-surface-container w-full py-section-gap border-t border-outline-variant mt-auto">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="md:col-span-4 flex flex-col gap-4">
          <Link
            to="/"
            className="text-headline-sm font-headline-sm font-bold text-primary tracking-tighter"
          >
            {BRAND.name}
          </Link>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-sm">
            {BRAND.description}
          </p>
          <p className="font-mono-data text-mono-data text-on-surface-variant">{BRAND.tagline}</p>
        </div>
        <div className="md:col-span-8 flex flex-wrap gap-x-8 gap-y-4 md:justify-end content-start">
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="font-mono-data text-mono-data text-on-surface-variant hover:text-primary transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  )
}
