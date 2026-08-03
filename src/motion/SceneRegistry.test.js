import { describe, expect, it } from 'vitest'
import { assertSceneBudget, scenes } from './SceneRegistry'
import { Motion } from '../design/motionTokens'

describe('SceneRegistry', () => {
  it('defines home within motion budget', () => {
    expect(scenes.home.budget).toBeLessThanOrEqual(Motion.budget.maxPrimariesPerPage)
    expect(scenes.home.primaries.length).toBeLessThanOrEqual(scenes.home.budget)
  })

  it('assertSceneBudget does not throw for valid usage', () => {
    expect(() => assertSceneBudget('home', ['hero', 'statement', 'friction'])).not.toThrow()
  })
})
