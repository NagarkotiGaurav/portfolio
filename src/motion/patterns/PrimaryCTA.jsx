import { cloneElement, isValidElement, useRef } from 'react'
import { Motion } from '../../design/motionTokens'
import { useMotion } from '../MotionProvider'

/**
 * Magnetic primary CTA — wraps child in a span so any element works.
 * @maturity Stable
 */
export default function PrimaryCTA({
  children,
  intent = Motion.intent.feedback,
  strength = 0.22,
  className = '',
}) {
  const ref = useRef(null)
  const { reduced, finePointer } = useMotion()

  const onMove = (e) => {
    if (reduced || !finePointer || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    ref.current.style.transform = `translate(${x * strength}px, ${y * strength}px)`
  }

  const onLeave = () => {
    if (!ref.current) return
    ref.current.style.transform = 'translate(0, 0)'
  }

  const child = isValidElement(children)
    ? cloneElement(children, {
        className: [children.props.className, 'w-full sm:w-auto'].filter(Boolean).join(' '),
      })
    : children

  return (
    <span
      ref={ref}
      data-intent={intent}
      className={`magnetic-cta inline-flex ${className}`.trim()}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {child}
    </span>
  )
}
