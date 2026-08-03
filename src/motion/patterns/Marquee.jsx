import { Motion } from '../../design/motionTokens'
import useGsapScene from '../hooks/useGsapScene'
import { prefersReducedMotion } from '../gsapSetup'

/**
 * Infinite tech/roles marquee — ambient proof strip.
 * @maturity Experimental
 */
export default function Marquee({ items = [], className = '' }) {
  const ref = useGsapScene(({ gsap, root, reduced }) => {
    if (reduced || prefersReducedMotion() || !items.length) return
    const track = root.querySelector('[data-marquee-track]')
    if (!track) return
    gsap.to(track, {
      xPercent: -50,
      duration: 28,
      ease: 'none',
      repeat: -1,
    })
  }, [items])

  const loop = [...items, ...items]

  return (
    <div
      ref={ref}
      className={`overflow-hidden border-y border-outline-variant ${className}`}
      data-intent={Motion.intent.context}
    >
      <div
        data-marquee-track
        className="flex w-max gap-10 py-4 will-change-transform"
      >
        {loop.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="font-mono-data text-mono-data text-on-surface-variant uppercase tracking-widest whitespace-nowrap"
          >
            {item}
            <span className="mx-10 text-outline-variant">/</span>
          </span>
        ))}
      </div>
    </div>
  )
}
