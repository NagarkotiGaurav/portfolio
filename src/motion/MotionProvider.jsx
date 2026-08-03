import { createContext, useContext, useMemo } from 'react'
import { ensureGsap, hasFinePointer, prefersReducedMotion } from './gsapSetup'
import { Motion } from '../design/motionTokens'

const MotionContext = createContext({
  reduced: false,
  finePointer: false,
  tokens: Motion,
  gsap: null,
})

export function MotionProvider({ children }) {
  const value = useMemo(() => {
    ensureGsap()
    return {
      reduced: prefersReducedMotion(),
      finePointer: hasFinePointer(),
      tokens: Motion,
      gsap: ensureGsap(),
    }
  }, [])

  return <MotionContext.Provider value={value}>{children}</MotionContext.Provider>
}

export function useMotion() {
  return useContext(MotionContext)
}

export default MotionProvider
