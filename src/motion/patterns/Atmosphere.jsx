import { useEffect, useRef } from 'react'
import { Motion } from '../../design/motionTokens'
import { useMotion } from '../MotionProvider'
import { ensureGsap, prefersReducedMotion } from '../gsapSetup'

/**
 * Ambient atmosphere: noise + grid + orb + light + scroll parallax.
 * Mouse shift 2–5% on fine pointers only.
 * @maturity Stable
 */
export default function Atmosphere({ className = '', parallax = true }) {
  const rootRef = useRef(null)
  const { reduced, finePointer } = useMotion()

  useEffect(() => {
    const root = rootRef.current
    if (!root || reduced || !finePointer) return undefined

    const onMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 5
      const y = (e.clientY / window.innerHeight - 0.5) * 4
      root.style.setProperty('--atm-x', `${x}%`)
      root.style.setProperty('--atm-y', `${y}%`)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [reduced, finePointer])

  useEffect(() => {
    const root = rootRef.current
    if (!root || !parallax || prefersReducedMotion()) return undefined

    const gsap = ensureGsap()
    const orb = root.querySelector('.atmosphere-orb')
    const grid = root.querySelector('.atmosphere-grid')
    const ctx = gsap.context(() => {
      if (orb) {
        gsap.to(orb, {
          yPercent: 28,
          ease: 'none',
          scrollTrigger: {
            trigger: root.parentElement || root,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })
      }
      if (grid) {
        gsap.to(grid, {
          yPercent: 12,
          ease: 'none',
          scrollTrigger: {
            trigger: root.parentElement || root,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })
      }
    }, root)

    return () => ctx.revert()
  }, [parallax])

  return (
    <div
      ref={rootRef}
      className={`atmosphere pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      data-intent={Motion.intent.context}
      aria-hidden
    >
      <div className="atmosphere-grid absolute inset-0" />
      <div className="atmosphere-glow absolute inset-0" />
      <div className="atmosphere-orb absolute" />
      <div className="atmosphere-noise absolute inset-0" />
    </div>
  )
}
