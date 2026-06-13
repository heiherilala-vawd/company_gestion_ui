import { describe, it, expect } from 'vitest'
import utils from '../../utili/index'

describe('barrel export', () => {
  it('default export has a generateId function', () => {
    expect(utils).toBeDefined()
    expect(utils.generateId).toBeDefined()
    expect(typeof utils.generateId).toBe('function')
  })

  it('generateId works via barrel', () => {
    const id = utils.generateId()
    expect(typeof id).toBe('string')
    expect(id.length).toBeGreaterThan(0)
  })
})
