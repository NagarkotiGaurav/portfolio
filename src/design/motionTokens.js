/**
 * Motion tokens — never hardcode timings in components.
 * @see docs/MotionSystem.md
 */
export const Motion = {
  duration: {
    fast: 0.3,
    normal: 0.6,
    slow: 1.2,
    cinematic: 2,
  },
  ease: {
    primary: 'power4.out',
    hero: 'expo.out',
    smooth: 'sine.inOut',
  },
  stagger: {
    tight: 0.05,
    normal: 0.08,
    wide: 0.15,
  },
  intent: {
    focus: 'focus',
    guide: 'guide',
    feedback: 'feedback',
    transition: 'transition',
    context: 'context',
    celebration: 'celebration',
  },
  budget: {
    maxPrimariesPerPage: 3,
    maxActiveTimelines: 3,
    maxScrollTriggersPerPage: 4,
    heroMaxMs: 1200,
  },
}

export default Motion
