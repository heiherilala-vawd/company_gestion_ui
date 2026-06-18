import { describe, it, expect } from 'vitest'
import {
  lightTheme,
  darkTheme,
  spacing,
  commonStyles,
  themeColors,
  createAppTheme,
} from '../../../style/theme'

describe('theme', () => {
  describe('lightTheme', () => {
    it('has palette mode light', () => {
      expect(lightTheme).toBeDefined()
      expect(lightTheme.palette).toBeDefined()
      expect(lightTheme.palette.mode).toBe('light')
    })
    it('has components overrides', () => {
      expect(lightTheme.components).toBeDefined()
      expect(Object.keys(lightTheme.components!).length).toBeGreaterThan(0)
    })
    it('has spacing and typography', () => {
      expect(lightTheme.spacing).toBeDefined()
      expect(lightTheme.typography).toBeDefined()
    })
  })

  describe('darkTheme', () => {
    it('has palette mode dark', () => {
      expect(darkTheme).toBeDefined()
      expect(darkTheme.palette).toBeDefined()
      expect(darkTheme.palette.mode).toBe('dark')
    })
    it('has components overrides', () => {
      expect(darkTheme.components).toBeDefined()
      expect(Object.keys(darkTheme.components!).length).toBeGreaterThan(0)
    })
  })

  describe('spacing', () => {
    it('exports xs, sm, md, lg, xl values', () => {
      expect(spacing.xs).toBe(4)
      expect(spacing.sm).toBe(8)
      expect(spacing.md).toBe(16)
      expect(spacing.lg).toBe(24)
      expect(spacing.xl).toBe(32)
    })
  })

  describe('commonStyles', () => {
    it('has flexCenter, flexBetween, flexStart, flexEnd', () => {
      expect(commonStyles.flexCenter).toBeDefined()
      expect(commonStyles.flexCenter.display).toBe('flex')
      expect(commonStyles.flexBetween).toBeDefined()
      expect(commonStyles.flexStart).toBeDefined()
      expect(commonStyles.flexEnd).toBeDefined()
    })
    it('has gap function', () => {
      const result = commonStyles.gap(16)
      expect(result.gap).toBe(16)
      expect(result.display).toBe('flex')
    })
  })

  describe('themeColors', () => {
    it('exists and is an object', () => {
      expect(themeColors).toBeDefined()
      expect(typeof themeColors).toBe('object')
    })
  })

  describe('createAppTheme', () => {
    it('returns a theme with mode from palette', () => {
      const theme = createAppTheme('light')
      expect(theme).toBeDefined()
      expect(theme.palette.mode).toBe('light')
    })
    it('returns dark mode theme', () => {
      const theme = createAppTheme('dark')
      expect(theme).toBeDefined()
      expect(theme.palette.mode).toBe('dark')
    })
    it('has spacing function and typography', () => {
      const theme = createAppTheme('light')
      expect(typeof theme.spacing).toBe('function')
      expect(theme.typography).toBeDefined()
    })
    it('has components with overrides', () => {
      const theme = createAppTheme('light')
      expect(theme.components).toBeDefined()
      expect(Object.keys(theme.components!).length).toBeGreaterThan(0)
    })
  })
})
