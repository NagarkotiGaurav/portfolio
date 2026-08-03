import { useEffect, useState } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'
import { Motion } from '../../design/motionTokens'
import { prefersReducedMotion } from '../gsapSetup'

/**
 * Navigation narrative — route transition rules.
 * @maturity Stable
 * @see docs/MotionSystem.md
 */
export default function NavigationNarrative({ children }) {
  const location = useLocation()
  const navType = useNavigationType()
  const [phase, setPhase] = useState('idle')

  useEffect(() => {
    if (prefersReducedMotion()) {
      setPhase('idle')
      return undefined
    }
    // Deep links / hash: skip theatrical intro
    if (location.hash) {
      setPhase('idle')
      return undefined
    }
    // Back navigation: reduced transition
    if (navType === 'POP') {
      setPhase('reduced-in')
      const t = window.setTimeout(() => setPhase('idle'), Motion.duration.fast * 1000)
      return () => window.clearTimeout(t)
    }

    setPhase('entering')
    const t = window.setTimeout(() => setPhase('idle'), Motion.duration.normal * 1000)
    return () => window.clearTimeout(t)
  }, [location.pathname, location.hash, navType])

  return (
    <div
      data-nav-phase={phase}
      className={`nav-narrative nav-narrative--${phase}`}
      data-intent={Motion.intent.transition}
    >
      {children}
    </div>
  )
}
