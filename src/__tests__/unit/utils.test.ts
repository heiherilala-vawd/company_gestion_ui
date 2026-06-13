import { describe, it, expect } from 'vitest'
import generateId from '../../utili/utils'

const UUID_V4_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/

describe('generateId', () => {
  it('returns a string', () => {
    const id = generateId()
    expect(typeof id).toBe('string')
  })

  it('matches UUID v4 format (version digit is 4 at position 13)', () => {
    const id = generateId()
    expect(id).toMatch(UUID_V4_REGEX)
    expect(id[14]).toBe('4')
  })

  it('produces no duplicates across 1000 calls', () => {
    const ids = new Set<string>()
    for (let i = 0; i < 1000; i++) {
      ids.add(generateId())
    }
    expect(ids.size).toBe(1000)
  })
})
