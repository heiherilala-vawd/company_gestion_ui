import { describe, it, expect } from 'vitest'
import {
  presetToCron,
  getPresetFromCron,
  isValidCron,
  getCronDescription,
  getNextOccurrences,
} from '../../utili/cronUtils'

describe('presetToCron', () => {
  it('returns daily expression', () => {
    expect(
      presetToCron('daily', { minute: 30, hour: 8, dayOfWeek: 1, dayOfMonth: 1, month: 1 }),
    ).toBe('0 30 8 * * ?')
  })

  it('returns weekly expression', () => {
    expect(
      presetToCron('weekly', { minute: 0, hour: 9, dayOfWeek: 1, dayOfMonth: 1, month: 1 }),
    ).toBe('0 0 9 ? * MON')
  })

  it('clamps dayOfWeek 7 to SUN', () => {
    expect(
      presetToCron('weekly', { minute: 0, hour: 8, dayOfWeek: 7, dayOfMonth: 1, month: 1 }),
    ).toBe('0 0 8 ? * SUN')
  })

  it('clamps dayOfWeek 0 to MON', () => {
    expect(
      presetToCron('weekly', { minute: 0, hour: 8, dayOfWeek: 0, dayOfMonth: 1, month: 1 }),
    ).toBe('0 0 8 ? * MON')
  })

  it('returns biweekly expression', () => {
    expect(
      presetToCron('biweekly', { minute: 0, hour: 8, dayOfWeek: 1, dayOfMonth: 1, month: 1 }),
    ).toBe('0 0 8 1,15 * ?')
  })

  it('returns monthly expression', () => {
    expect(
      presetToCron('monthly', { minute: 0, hour: 8, dayOfWeek: 1, dayOfMonth: 15, month: 1 }),
    ).toBe('0 0 8 15 * ?')
  })

  it('returns yearly expression', () => {
    expect(
      presetToCron('yearly', { minute: 0, hour: 8, dayOfWeek: 1, dayOfMonth: 1, month: 6 }),
    ).toBe('0 0 8 1 6 ?')
  })

  it('returns custom expression', () => {
    expect(
      presetToCron('custom', { minute: 0, hour: 8, dayOfWeek: 1, dayOfMonth: 1, month: 1 }),
    ).toBe('0 0 8 * * ?')
  })
})

describe('getPresetFromCron', () => {
  it('returns daily preset', () => {
    const result = getPresetFromCron('0 30 8 * * ?')
    expect(result).not.toBeNull()
    expect(result!.preset).toBe('daily')
    expect(result!.opts).toMatchObject({ minute: 30, hour: 8 })
  })

  it('returns weekly preset', () => {
    const result = getPresetFromCron('0 0 9 ? * MON')
    expect(result).not.toBeNull()
    expect(result!.preset).toBe('weekly')
    expect(result!.opts).toMatchObject({ minute: 0, hour: 9, dayOfWeek: 1 })
  })

  it('returns biweekly preset', () => {
    const result = getPresetFromCron('0 0 8 1,15 * ?')
    expect(result).not.toBeNull()
    expect(result!.preset).toBe('biweekly')
    expect(result!.opts).toMatchObject({ minute: 0, hour: 8 })
  })

  it('returns monthly preset', () => {
    const result = getPresetFromCron('0 0 8 15 * ?')
    expect(result).not.toBeNull()
    expect(result!.preset).toBe('monthly')
    expect(result!.opts).toMatchObject({ minute: 0, hour: 8, dayOfMonth: 15 })
  })

  it('returns yearly preset', () => {
    const result = getPresetFromCron('0 0 8 1 6 ?')
    expect(result).not.toBeNull()
    expect(result!.preset).toBe('yearly')
    expect(result!.opts).toMatchObject({ minute: 0, hour: 8, dayOfMonth: 1, month: 6 })
  })

  it('returns null for null input', () => {
    expect(getPresetFromCron(null as unknown as string)).toBeNull()
  })

  it('returns null for empty string', () => {
    expect(getPresetFromCron('')).toBeNull()
  })

  it('returns null for too-short expression', () => {
    expect(getPresetFromCron('0 30 8')).toBeNull()
  })

  it('returns null for special every-minute expression', () => {
    expect(getPresetFromCron('0 * * * * ?')).toBeNull()
  })
})

describe('isValidCron', () => {
  it('returns true for a valid expression', () => {
    expect(isValidCron('0 30 8 * * ?')).toBe(true)
  })

  it('returns false for an invalid expression', () => {
    expect(isValidCron('not-a-cron')).toBe(false)
  })

  it('returns false for empty string', () => {
    expect(isValidCron('')).toBe(false)
  })
})

describe('getCronDescription', () => {
  it('returns a non-empty description for a valid expression', () => {
    const desc = getCronDescription('0 30 8 * * ?')
    expect(desc).toBeTruthy()
    expect(typeof desc).toBe('string')
  })
})

describe('getNextOccurrences', () => {
  it('returns an array of Dates for a valid expression', () => {
    const occurrences = getNextOccurrences('0 30 8 * * ?')
    expect(Array.isArray(occurrences)).toBe(true)
    expect(occurrences.length).toBe(3)
    occurrences.forEach((d) => {
      expect(d).toBeInstanceOf(Date)
    })
  })

  it('respects a custom count', () => {
    const occurrences = getNextOccurrences('0 30 8 * * ?', 5)
    expect(occurrences.length).toBe(5)
  })

  it('returns empty array for invalid expression', () => {
    const occurrences = getNextOccurrences('invalid')
    expect(occurrences).toEqual([])
  })
})
