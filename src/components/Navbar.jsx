import { useEffect, useId, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { BRAND, NAV_LINKS } from '../data/site'
import { logger } from '../lib/logger'
import Icon from './Icon'

const linkClass = ({ isActive }) =>
  [
    'font-label-caps text-label-caps uppercase tracking-widest transition-opacity duration-200',
    isActive
      ? 'text-primary border-b-2 border-primary pb-1'
      : 'text-on-surface-variant hover:text-primary hover:opacity-80',
  ].join(' ')

function prefetchRoute(link) {
  if (typeof link.prefetch !== 'function') return
  link
    .prefetch()
    .then(() => logger.debug('nav.prefetch_ok', { to: link.to }))
    .catch((err) => logger.warn('nav.prefetch_failed', { to: link.to, error: String(err) }))
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const menuId = useId()

  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <nav className="bg-surface w-full top-0 sticky border-b border-outline-variant z-50">
      <div className="flex justify-between items-center h-20 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <Link
          to="/"
          className="text-headline-sm font-headline-sm font-bold text-primary tracking-tighter hover:opacity-80 transition-opacity"
          onClick={() => setOpen(false)}
        >
          {BRAND.name}
        </Link>

        <div className="hidden md:flex items-center gap-8 h-full">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={linkClass}
              onMouseEnter={() => prefetchRoute(link)}
              onFocus={() => prefetchRoute(link)}
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <Link
          to="/contact"
          className="hidden md:inline-flex bg-primary text-on-primary px-6 py-3 font-label-caps text-label-caps uppercase tracking-widest rounded hover:opacity-80 transition-opacity"
          onMouseEnter={() => prefetchRoute({ to: '/contact', prefetch: () => import('../pages/Contact') })}
        >
          Book a Discovery Call
        </Link>

        <button
          type="button"
          className="md:hidden text-primary p-2"
          aria-expanded={open}
          aria-controls={menuId}
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <Icon name={open ? 'close' : 'menu'} />
        </button>
      </div>

      {open && (
        <div
          id={menuId}
          className="md:hidden border-t border-outline-variant bg-surface px-margin-mobile pb-8 pt-4 flex flex-col gap-4"
        >
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={linkClass}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
          <Link
            to="/contact"
            className="mt-2 bg-primary text-on-primary px-6 py-3 font-label-caps text-label-caps uppercase tracking-widest rounded text-center hover:opacity-80 transition-opacity"
            onClick={() => setOpen(false)}
          >
            Book a Discovery Call
          </Link>
        </div>
      )}
    </nav>
  )
}
