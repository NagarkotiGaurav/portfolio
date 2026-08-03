import { Motion } from '../design/motionTokens'

/**
 * Scene registry — enforces motion budget per page.
 * @maturity Stable
 * @see docs/MotionSystem.md
 */
export const scenes = {
  home: {
    id: 'home',
    emotion: 'curiosity',
    budget: Motion.budget.maxPrimariesPerPage,
    primaries: ['hero', 'statement', 'friction'],
    beats: ['hook', 'insight', 'proof', 'cta'],
  },
  solutions: {
    id: 'solutions',
    emotion: 'confidence',
    budget: 2,
    primaries: ['domainStory', 'cta'],
    beats: ['problem', 'insight', 'proof', 'cta'],
  },
  process: {
    id: 'process',
    emotion: 'clarity',
    budget: 2,
    primaries: ['timelineDraw', 'cta'],
    beats: ['guide', 'proof', 'cta'],
  },
  resources: {
    id: 'resources',
    emotion: 'trust',
    budget: 2,
    primaries: ['processGuide', 'cta'],
    beats: ['trust', 'guide', 'cta'],
  },
  work: {
    id: 'work',
    emotion: 'credibility',
    budget: 2,
    primaries: ['proof', 'cta'],
    beats: ['proof', 'cta'],
  },
  contact: {
    id: 'contact',
    emotion: 'trust',
    budget: 1,
    primaries: ['cta'],
    beats: ['trust', 'cta'],
  },
  industries: {
    id: 'industries',
    emotion: 'confidence',
    budget: 1,
    primaries: ['reveal'],
    beats: ['insight', 'cta'],
  },
  insights: {
    id: 'insights',
    emotion: 'expertise',
    budget: 1,
    primaries: ['reveal'],
    beats: ['insight'],
  },
}

export function assertSceneBudget(sceneId, activePrimaries = []) {
  const scene = scenes[sceneId]
  if (!scene) return
  if (import.meta.env.DEV && activePrimaries.length > scene.budget) {
    // eslint-disable-next-line no-console
    console.warn(
      `[Experience] Scene "${sceneId}" exceeds budget ${scene.budget}:`,
      activePrimaries,
    )
  }
}

export default scenes
