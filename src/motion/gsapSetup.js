import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Motion } from '../design/motionTokens'

let registered = false

export function ensureGsap() {
  if (!registered) {
    gsap.registerPlugin(ScrollTrigger)
    registered = true
  }
  return gsap
}

export function prefersReducedMotion() {
  if (typeof window === 'undefined' || !window.matchMedia) return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function hasFinePointer() {
  if (typeof window === 'undefined' || !window.matchMedia) return false
  return window.matchMedia('(pointer: fine)').matches
}

export { gsap, ScrollTrigger, Motion }
