import { useEffect, useId, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { BRAND, NAV_LINKS } from '../data/site'
import { trackStrategyCall } from '../lib/analytics'
import { logger } from '../lib/logger'
import Icon from './Icon'

const linkClass = ({ isActive }) =>
  [
    'font-label-caps text-label-caps uppercase tracking-widest transition-opacity duration-200 py-3',
    isActive
      ? 'text-primary border-b-2 border-primary pb-1'
      : 'text-on-surface-variant hover:text-primary hover:opacity-80',
  ].join(' ')

const mobileLinkClass = ({ isActive }) =>
  [
    'font-label-caps text-label-caps uppercase tracking-widest transition-opacity duration-200 py-3 block',
    isActive ? 'text-primary' : 'text-on-surface-variant',
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
      <div className="flex justify-between items-center min-h-16 md:h-20 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto gap-3">
        <Link
          to="/"
          className="flex flex-col justify-center hover:opacity-80 transition-opacity min-w-0 flex-1"
          onClick={() => setOpen(false)}
        >
          <span className="text-headline-sm font-headline-sm font-bold text-primary tracking-tighter leading-none truncate">
            <span className="md:hidden">{BRAND.shortName}</span>
            <span className="hidden md:inline">{BRAND.name}</span>
          </span>
          <span className="hidden sm:block font-mono-data text-[11px] text-on-surface-variant tracking-wide mt-1 truncate">
            {BRAND.role}
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-6 lg:gap-8 h-full">
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

        <div className="hidden md:flex items-center gap-4 shrink-0">
          {BRAND.isBeta && (
            <span
              className="font-mono-data text-[10px] uppercase tracking-widest text-on-surface-variant border border-outline-variant px-1.5 py-0.5 rounded leading-none"
              title={BRAND.betaNotice}
            >
              {BRAND.betaLabel}
            </span>
          )}
          <Link
            to="/contact"
            className="inline-flex bg-primary text-on-primary px-5 lg:px-6 py-3 font-label-caps text-label-caps uppercase tracking-widest rounded hover:opacity-80 transition-opacity whitespace-nowrap"
            onMouseEnter={() =>
              prefetchRoute({ to: '/contact', prefetch: () => import('../pages/Contact') })
            }
            onClick={() => trackStrategyCall({ scene: 'nav', location: 'nav' })}
          >
            Book a Strategy Call
          </Link>
        </div>

        <div className="md:hidden flex items-center gap-2 shrink-0">
          {BRAND.isBeta && (
            <span
              className="font-mono-data text-[10px] uppercase tracking-widest text-on-surface-variant border border-outline-variant px-1.5 py-0.5 rounded leading-none"
              title={BRAND.betaNotice}
            >
              {BRAND.betaLabel}
            </span>
          )}
          <button
            type="button"
            className="text-primary p-2 min-w-11 min-h-11 inline-flex items-center justify-center"
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            <Icon name={open ? 'close' : 'menu'} />
          </button>
        </div>
      </div>

      {open && (
        <div
          id={menuId}
          className="md:hidden border-t border-outline-variant bg-surface px-margin-mobile pb-8 pt-2 flex flex-col max-h-[calc(100dvh-4rem)] overflow-y-auto"
        >
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={mobileLinkClass}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
          <Link
            to="/contact"
            className="mt-4 bg-primary text-on-primary px-6 py-4 font-label-caps text-label-caps uppercase tracking-widest rounded text-center hover:opacity-80 transition-opacity min-h-12 inline-flex items-center justify-center"
            onClick={() => {
              setOpen(false)
              trackStrategyCall({ scene: 'nav', location: 'nav' })
            }}
          >
            Book a Strategy Call
          </Link>
          {BRAND.isBeta && (
            <p className="mt-4 font-mono-data text-[11px] text-on-surface-variant leading-relaxed">
              {BRAND.betaLabel} — early access. Content may change.
            </p>
          )}
        </div>
      )}
    </nav>
  )
}
