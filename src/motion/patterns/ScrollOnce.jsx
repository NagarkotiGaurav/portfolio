import { useEffect, useRef, useState } from 'react'
import { Motion } from '../../design/motionTokens'
import { prefersReducedMotion } from '../gsapSetup'

/**
 * Once-in-view reveal (default ScrollTrigger mode: once).
 * @maturity Stable
 */
export default function ScrollOnce({
  children,
  className = '',
  intent = 'guide',
  delay = 0,
  as: Tag = 'div',
}) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(() => prefersReducedMotion())

  useEffect(() => {
    const node = ref.current
    if (!node || prefersReducedMotion()) {
      setVisible(true)
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.16, rootMargin: '0px 0px -6% 0px' },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      data-intent={intent}
      className={`scroll-once ${visible ? 'scroll-once-visible' : ''} ${className}`.trim()}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  )
}

// silence unused Motion import warning by exporting token reference for docs
export const scrollOnceDuration = Motion.duration.normal
