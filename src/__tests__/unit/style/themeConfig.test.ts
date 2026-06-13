import {
  getShadow,
  getModeValue,
  getBorder,
  getSubtleBg,
  getSubtleBgHover,
  getPrimaryBg,
  getPrimaryBgHover,
  getTableHeader,
  getDivider,
  getTextPrimary,
  getTextSecondary,
  colors,
  gradients,
  shadows,
  accentColors,
  accentGradients,
  borderRadius,
  transitions,
  spacing,
  typography,
  themeConfig,
} from '../../../style/themeConfig'

describe('themeConfig', () => {
  describe('getShadow', () => {
    it('returns light md shadow', () => {
      expect(getShadow('light', 'md')).toBe(shadows.light.md)
    })
    it('returns dark xl shadow', () => {
      expect(getShadow('dark', 'xl')).toBe(shadows.dark.xl)
    })
  })

  describe('getModeValue', () => {
    it('returns light value when mode is light', () => {
      expect(getModeValue('light', 'a', 'b')).toBe('a')
    })
    it('returns dark value when mode is dark', () => {
      expect(getModeValue('dark', 'a', 'b')).toBe('b')
    })
  })

  describe('getBorder', () => {
    it('returns light border', () => {
      expect(getBorder('light')).toBe(colors.light.border)
    })
    it('returns dark border', () => {
      expect(getBorder('dark')).toBe(colors.dark.border)
    })
  })

  describe('getDivider', () => {
    it('returns light divider', () => {
      expect(getDivider('light')).toBe(colors.light.divider)
    })
    it('returns dark divider', () => {
      expect(getDivider('dark')).toBe(colors.dark.divider)
    })
  })

  describe('getTextPrimary', () => {
    it('returns light text primary', () => {
      expect(getTextPrimary('light')).toBe(colors.light.text.primary)
    })
    it('returns dark text primary', () => {
      expect(getTextPrimary('dark')).toBe(colors.dark.text.primary)
    })
  })

  describe('getTextSecondary', () => {
    it('returns light text secondary', () => {
      expect(getTextSecondary('light')).toBe(colors.light.text.secondary)
    })
    it('returns dark text secondary', () => {
      expect(getTextSecondary('dark')).toBe(colors.dark.text.secondary)
    })
  })

  describe('getSubtleBg', () => {
    it('returns light subtleBg', () => {
      expect(getSubtleBg('light')).toBe(colors.light.subtleBg)
    })
    it('returns dark subtleBg', () => {
      expect(getSubtleBg('dark')).toBe(colors.dark.subtleBg)
    })
  })

  describe('getSubtleBgHover', () => {
    it('returns light subtleBgHover', () => {
      expect(getSubtleBgHover('light')).toBe(colors.light.subtleBgHover)
    })
    it('returns dark subtleBgHover', () => {
      expect(getSubtleBgHover('dark')).toBe(colors.dark.subtleBgHover)
    })
  })

  describe('getPrimaryBg', () => {
    it('returns light primaryBg', () => {
      expect(getPrimaryBg('light')).toBe(colors.light.primaryBg)
    })
    it('returns dark primaryBg', () => {
      expect(getPrimaryBg('dark')).toBe(colors.dark.primaryBg)
    })
  })

  describe('getPrimaryBgHover', () => {
    it('returns light primaryBgHover', () => {
      expect(getPrimaryBgHover('light')).toBe(colors.light.primaryBgHover)
    })
    it('returns dark primaryBgHover', () => {
      expect(getPrimaryBgHover('dark')).toBe(colors.dark.primaryBgHover)
    })
  })

  describe('getTableHeader', () => {
    it('returns light tableHeader', () => {
      expect(getTableHeader('light')).toBe(colors.light.tableHeader)
    })
    it('returns dark tableHeader', () => {
      expect(getTableHeader('dark')).toBe(colors.dark.tableHeader)
    })
  })

  describe('colors values', () => {
    it('primary.main is #6366F1', () => {
      expect(colors.primary.main).toBe('#6366F1')
    })
    it('success.main is #10B981', () => {
      expect(colors.success.main).toBe('#10B981')
    })
    it('error.main is #F43F5E', () => {
      expect(colors.error.main).toBe('#F43F5E')
    })
  })

  describe('accentColors', () => {
    it('sapphire.main is #3B82F6', () => {
      expect(accentColors.sapphire.main).toBe('#3B82F6')
    })
  })

  describe('accentGradients', () => {
    it('sapphire is a linear-gradient string', () => {
      expect(accentGradients.sapphire).toContain('linear-gradient')
    })
  })

  describe('gradients', () => {
    it('primary is a linear-gradient string', () => {
      expect(gradients.primary).toContain('linear-gradient')
    })
  })

  describe('borderRadius', () => {
    it('md is 8', () => {
      expect(borderRadius.md).toBe(8)
    })
    it('xl is 16', () => {
      expect(borderRadius.xl).toBe(16)
    })
    it('pill is 9999', () => {
      expect(borderRadius.pill).toBe(9999)
    })
  })

  describe('transitions', () => {
    it('default is a string', () => {
      expect(typeof transitions.default).toBe('string')
    })
  })

  describe('spacing', () => {
    it('md is 16', () => {
      expect(spacing.md).toBe(16)
    })
  })

  describe('typography', () => {
    it('fontFamily contains Inter', () => {
      expect(typography.fontFamily).toContain('Inter')
    })
  })

  describe('themeConfig default export', () => {
    it('has all exported properties', () => {
      expect(themeConfig.colors).toBe(colors)
      expect(themeConfig.gradients).toBe(gradients)
      expect(themeConfig.accentColors).toBe(accentColors)
      expect(themeConfig.accentGradients).toBe(accentGradients)
      expect(themeConfig.shadows).toBe(shadows)
      expect(themeConfig.borderRadius).toBe(borderRadius)
      expect(themeConfig.transitions).toBe(transitions)
      expect(themeConfig.spacing).toBe(spacing)
      expect(themeConfig.typography).toBe(typography)
      expect(themeConfig.getShadow).toBe(getShadow)
      expect(themeConfig.getModeValue).toBe(getModeValue)
      expect(themeConfig.getBorder).toBe(getBorder)
      expect(themeConfig.getSubtleBg).toBe(getSubtleBg)
      expect(themeConfig.getSubtleBgHover).toBe(getSubtleBgHover)
      expect(themeConfig.getPrimaryBg).toBe(getPrimaryBg)
      expect(themeConfig.getPrimaryBgHover).toBe(getPrimaryBgHover)
      expect(themeConfig.getTableHeader).toBe(getTableHeader)
      expect(themeConfig.getDivider).toBe(getDivider)
      expect(themeConfig.getTextPrimary).toBe(getTextPrimary)
      expect(themeConfig.getTextSecondary).toBe(getTextSecondary)
    })
  })
})
