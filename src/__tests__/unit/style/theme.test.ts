import { describe, it, expect } from 'vitest'
import { lightTheme, darkTheme } from '../../../style/theme'

describe('theme', () => {
  it('exports lightTheme with palette mode light', () => {
    expect(lightTheme).toBeDefined()
    expect(lightTheme.palette).toBeDefined()
    expect(lightTheme.palette.mode).toBe('light')
  })

  it('exports darkTheme with palette mode dark', () => {
    expect(darkTheme).toBeDefined()
    expect(darkTheme.palette).toBeDefined()
    expect(darkTheme.palette.mode).toBe('dark')
  })

  it('lightTheme has components overrides', () => {
    expect(lightTheme.components).toBeDefined()
    expect(Object.keys(lightTheme.components!).length).toBeGreaterThan(0)
  })

  it('darkTheme has components overrides', () => {
    expect(darkTheme.components).toBeDefined()
    expect(Object.keys(darkTheme.components!).length).toBeGreaterThan(0)
  })

  it('lightTheme has spacing and typography', () => {
    expect(lightTheme.spacing).toBeDefined()
    expect(lightTheme.typography).toBeDefined()
  })
})
