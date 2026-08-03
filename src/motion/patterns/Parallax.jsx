import useGsapScene from '../hooks/useGsapScene'
import { Motion } from '../../design/motionTokens'
import { prefersReducedMotion } from '../gsapSetup'

/**
 * Scroll-linked parallax (ambient / secondary). Intent: context.
 * @maturity Stable
 */
export default function Parallax({
  children,
  className = '',
  speed = 0.2,
  intent = Motion.intent.context,
  as: Tag = 'div',
}) {
  const ref = useGsapScene(({ gsap, root, reduced }) => {
    if (reduced || prefersReducedMotion()) return
    gsap.fromTo(
      root,
      { y: -40 * speed },
      {
        y: 80 * speed,
        ease: 'none',
        scrollTrigger: {
          trigger: root,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      },
    )
  }, [speed])

  return (
    <Tag ref={ref} className={className} data-intent={intent} data-parallax={speed}>
      {children}
    </Tag>
  )
}
