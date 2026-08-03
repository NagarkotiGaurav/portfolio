import { useLayoutEffect, useRef } from 'react'
import { ensureGsap, prefersReducedMotion } from '../gsapSetup'

/**
 * Run a GSAP scene factory with automatic context cleanup on unmount/route change.
 * @param {(ctx: { gsap: typeof import('gsap').gsap, selector: Function, reduced: boolean }) => void} factory
 * @param {unknown[]} deps
 */
export function useGsapScene(factory, deps = []) {
  const rootRef = useRef(null)

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return undefined

    const gsap = ensureGsap()
    const reduced = prefersReducedMotion()
    const ctx = gsap.context(() => {
      factory({ gsap, selector: gsap.utils.selector(root), reduced, root })
    }, root)

    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return rootRef
}

export default useGsapScene
