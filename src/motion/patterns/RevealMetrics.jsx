import { useEffect, useRef, useState } from 'react'
import { Motion } from '../../design/motionTokens'
import { ensureGsap, prefersReducedMotion } from '../gsapSetup'

/**
 * Rolling / count-up metrics (proof beat).
 * @maturity Stable
 */
export default function RevealMetrics({
  value,
  className = '',
  intent = 'focus',
  suffix = '',
  prefix = '',
}) {
  const ref = useRef(null)
  const [display, setDisplay] = useState(() =>
    prefersReducedMotion() ? `${prefix}${value}${suffix}` : `${prefix}0${suffix}`,
  )

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined

    const numeric = parseFloat(String(value).replace(/[^\d.]/g, ''))
    const restSuffix =
      suffix || String(value).replace(/^[\d.]+/, '') || ''
    const hasPlus = String(value).includes('+')
    const endSuffix = restSuffix || (hasPlus ? '+' : '')

    if (prefersReducedMotion() || Number.isNaN(numeric)) {
      setDisplay(`${prefix}${value}`)
      return undefined
    }

    const gsap = ensureGsap()
    const state = { n: 0 }
    let tween

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        tween = gsap.to(state, {
          n: numeric,
          duration: Motion.duration.slow,
          ease: Motion.ease.primary,
          onUpdate: () => {
            const rounded = Number.isInteger(numeric)
              ? Math.round(state.n)
              : state.n.toFixed(0)
            setDisplay(`${prefix}${rounded}${endSuffix}`)
          },
        })
        observer.disconnect()
      },
      { threshold: 0.4 },
    )

    observer.observe(el)
    return () => {
      observer.disconnect()
      tween?.kill()
    }
  }, [value, prefix, suffix])

  return (
    <span ref={ref} className={className} data-intent={intent}>
      {display}
    </span>
  )
}
