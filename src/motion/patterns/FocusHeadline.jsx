import { useLayoutEffect, useRef } from 'react'
import { Motion } from '../../design/motionTokens'
import { ensureGsap, prefersReducedMotion } from '../gsapSetup'

/**
 * Word-level headline reveal (never letters).
 * @maturity Stable
 */
export default function FocusHeadline({
  lines = [],
  as: Tag = 'h1',
  className = '',
  intent = Motion.intent.focus,
  animate = true,
}) {
  const ref = useRef(null)
  const label = lines.join(' ')

  useLayoutEffect(() => {
    const el = ref.current
    if (!el || !animate || !lines.length) return undefined

    if (prefersReducedMotion()) {
      el.style.opacity = '1'
      return undefined
    }

    const gsap = ensureGsap()
    const words = el.querySelectorAll('.fh-word')
    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { yPercent: 115, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: Motion.duration.slow,
          ease: Motion.ease.hero,
          stagger: Motion.stagger.normal,
          delay: 0.12,
        },
      )
    }, el)

    return () => ctx.revert()
  }, [lines, animate])

  return (
    <Tag
      ref={ref}
      className={className}
      data-intent={intent}
      aria-label={label}
      data-maturity="Stable"
    >
      {lines.map((line) => (
        <span key={line} className="fh-line block">
          {line.split(/\s+/).map((word, wi) => (
            <span key={`${line}-${wi}`} className="fh-word-mask">
              <span className="fh-word inline-block">{word}</span>
            </span>
          ))}
        </span>
      ))}
    </Tag>
  )
}
