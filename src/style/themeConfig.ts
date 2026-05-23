import { alpha } from '@mui/material/styles'

export const colors = {
  primary: {
    main: '#6CA568',
    light: '#8BCB7B',
    dark: '#4E8B56',
    contrastText: '#F3F6ED',
  },

  secondary: {
    main: '#D4A76A',
    light: '#E8C48A',
    dark: '#B8894A',
    contrastText: '#071F16',
  },

  success: {
    main: '#6CA568',
    light: '#8BCB7B',
    dark: '#4E8B56',
  },
  warning: {
    main: '#E8B84B',
    light: '#F0CC7A',
    dark: '#C49A2E',
  },
  error: {
    main: '#E57A7A',
    light: '#EF9F9F',
    dark: '#C45A5A',
  },
  info: {
    main: '#7AB8D4',
    light: '#9ECDE3',
    dark: '#5A9BB8',
  },

  light: {
    background: {
      default: '#F2F0EB',
      paper: '#FFFFFF',
    },
    grey: {
      50: '#F8F7F4',
      100: '#EDEBE6',
      200: '#DDDAD3',
      300: '#C4C0B8',
      400: '#A39F97',
      500: '#838078',
      600: '#65625C',
      700: '#4A4843',
      800: '#302E2B',
      900: '#1A1917',
    },
    text: {
      primary: '#1A2920',
      secondary: '#5A6B5E',
    },
    divider: 'rgba(0, 0, 0, 0.06)',
    border: 'rgba(0, 0, 0, 0.07)',
    subtleBg: 'rgba(108, 165, 104, 0.03)',
    subtleBgHover: 'rgba(108, 165, 104, 0.06)',
    primaryBg: alpha('#6CA568', 0.05),
    primaryBgHover: alpha('#6CA568', 0.09),
    tableHeader: '#EDEBE6',
  },

  dark: {
    background: {
      default: '#071F16',
      paper: '#0F2F23',
    },
    grey: {
      50: '#0A281D',
      100: '#0F2F23',
      200: '#1A3D30',
      300: '#2A4F3F',
      400: '#426854',
      500: '#5E826D',
      600: '#7C9E89',
      700: '#9FBAA8',
      800: '#C3D6C8',
      900: '#E3EDE6',
    },
    text: {
      primary: '#F3F6ED',
      secondary: '#9FBAA8',
    },
    divider: 'rgba(255, 255, 255, 0.06)',
    border: 'rgba(255, 255, 255, 0.07)',
    subtleBg: 'rgba(108, 165, 104, 0.04)',
    subtleBgHover: 'rgba(108, 165, 104, 0.08)',
    primaryBg: alpha('#6CA568', 0.08),
    primaryBgHover: alpha('#6CA568', 0.12),
    tableHeader: '#1A3D30',
  },
}

export const natureColors = {
  forest: { main: '#2D5A27', light: '#4A7A42', dark: '#1A3D16' },
  moss: { main: '#5A7A4A', light: '#7A9E68', dark: '#3D5A30' },
  earth: { main: '#8B6F47', light: '#A88B63', dark: '#6D532F' },
  clay: { main: '#B87D5B', light: '#D4A084', dark: '#9A6040' },
  bark: { main: '#6B4C3B', light: '#8B6C5B', dark: '#4D3020' },
  leaf: { main: '#7CB342', light: '#9CCC65', dark: '#558B2F' },
  charcoal: { main: '#2C2C2C', light: '#4A4A4A', dark: '#1A1A1A' },
}

export const natureGradients = {
  forest: 'linear-gradient(135deg, #2D5A27 0%, #4A7A42 100%)',
  earth: 'linear-gradient(135deg, #8B6F47 0%, #6D532F 100%)',
  clay: 'linear-gradient(135deg, #B87D5B 0%, #9A6040 100%)',
  bark: 'linear-gradient(135deg, #6B4C3B 0%, #4D3020 100%)',
  moss: 'linear-gradient(135deg, #5A7A4A 0%, #3D5A30 100%)',
  leaf: 'linear-gradient(135deg, #7CB342 0%, #558B2F 100%)',
}

export const gradients = {
  primary: 'linear-gradient(135deg, #6CA568 0%, #4E8B56 100%)',
  primaryHorizontal: 'linear-gradient(90deg, #6CA568 0%, #4E8B56 100%)',
  primaryDark: 'linear-gradient(135deg, #4E8B56 0%, #3D7044 100%)',
  secondary: 'linear-gradient(135deg, #D4A76A 0%, #E8C48A 100%)',
  secondaryDark: 'linear-gradient(135deg, #B8894A 0%, #D4A76A 100%)',
  sidebar: 'linear-gradient(180deg, #0A281D 0%, #071F16 100%)',
  sidebarDark: 'linear-gradient(180deg, #071F16 0%, #071F16 100%)',
  card: 'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
  cardHover: 'linear-gradient(180deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.03) 100%)',
  dashboard: 'linear-gradient(135deg, #071F16 0%, #0E2E24 45%, #13372B 100%)',
  success: `linear-gradient(135deg, ${colors.success.light} 0%, ${colors.success.main} 100%)`,
  successDark: `linear-gradient(135deg, #4E8B56 0%, #6CA568 100%)`,
  warning: `linear-gradient(135deg, ${colors.warning.light} 0%, ${colors.warning.main} 100%)`,
  warningDark: `linear-gradient(135deg, #C49A2E 0%, #E8B84B 100%)`,
  error: `linear-gradient(135deg, ${colors.error.light} 0%, ${colors.error.main} 100%)`,
}

export const shadows = {
  light: {
    sm: '0 2px 8px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.03)',
    md: '0 4px 16px rgba(0,0,0,0.05), 0 2px 4px rgba(0,0,0,0.04)',
    lg: '0 8px 32px rgba(0,0,0,0.06), 0 4px 8px rgba(0,0,0,0.04)',
    primary: '0 4px 14px rgba(108, 165, 104, 0.25)',
    primaryHover: '0 8px 25px rgba(108, 165, 104, 0.35)',
    primaryActive: '0 12px 35px rgba(108, 165, 104, 0.4)',
    dialog: '0 24px 80px rgba(0,0,0,0.15)',
    sidebar: '2px 0 20px rgba(0,0,0,0.08)',
    card: '0 10px 30px rgba(0,0,0,0.08)',
    cardHover: '0 16px 40px rgba(0,0,0,0.12)',
  },
  dark: {
    sm: '0 2px 8px rgba(0,0,0,0.2), 0 1px 2px rgba(0,0,0,0.15)',
    md: '0 4px 16px rgba(0,0,0,0.25), 0 2px 4px rgba(0,0,0,0.2)',
    lg: '0 8px 32px rgba(0,0,0,0.3), 0 4px 8px rgba(0,0,0,0.25)',
    primary: '0 4px 14px rgba(108, 165, 104, 0.3)',
    primaryHover: '0 8px 25px rgba(108, 165, 104, 0.4)',
    primaryActive: '0 12px 35px rgba(108, 165, 104, 0.5)',
    dialog: '0 24px 80px rgba(0,0,0,0.6)',
    sidebar: '2px 0 20px rgba(0,0,0,0.3)',
    card: '0 10px 30px rgba(0,0,0,0.25)',
    cardHover: '0 16px 40px rgba(0,0,0,0.35)',
  },
}

export const borderRadius = {
  xs: 2,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  pill: 9999,
}

export const transitions = {
  default: 'all 0.25s ease',
  fast: 'all 0.15s ease',
  slow: 'all 0.4s ease',
  spring: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
}

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
}

export const typography = {
  fontFamily:
    '"Inter", "Manrope", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  h1: {
    fontSize: '1.75rem',
    fontWeight: 600,
    letterSpacing: '-0.02em',
    lineHeight: 1.3,
  },
  h2: {
    fontSize: '1.375rem',
    fontWeight: 600,
    letterSpacing: '-0.02em',
    lineHeight: 1.35,
  },
  h3: { fontSize: '1.125rem', fontWeight: 600, letterSpacing: '-0.015em' },
  h4: { fontSize: '1rem', fontWeight: 600 },
  h5: { fontSize: '0.9375rem', fontWeight: 600 },
  h6: { fontSize: '0.875rem', fontWeight: 600 },
  body1: { fontSize: '0.9375rem', lineHeight: 1.6, fontWeight: 400 },
  body2: { fontSize: '0.875rem', lineHeight: 1.6, fontWeight: 400 },
  caption: { fontSize: '0.75rem', letterSpacing: '0.02em', fontWeight: 400 },
  button: {
    fontSize: '0.875rem',
    fontWeight: 600,
    textTransform: 'none' as const,
    letterSpacing: '0.01em',
  },
}

export const getShadow = (mode: 'light' | 'dark', size: keyof typeof shadows.light) => {
  return mode === 'light' ? shadows.light[size] : shadows.dark[size]
}

export const getModeValue = <T>(mode: 'light' | 'dark', lightVal: T, darkVal: T) => {
  return mode === 'light' ? lightVal : darkVal
}

export const getBorder = (mode: 'light' | 'dark') => {
  return mode === 'light' ? colors.light.border : colors.dark.border
}

export const getSubtleBg = (mode: 'light' | 'dark') => {
  return mode === 'light' ? colors.light.subtleBg : colors.dark.subtleBg
}

export const getSubtleBgHover = (mode: 'light' | 'dark') => {
  return mode === 'light' ? colors.light.subtleBgHover : colors.dark.subtleBgHover
}

export const getPrimaryBg = (mode: 'light' | 'dark') => {
  return mode === 'light' ? colors.light.primaryBg : colors.dark.primaryBg
}

export const getPrimaryBgHover = (mode: 'light' | 'dark') => {
  return mode === 'light' ? colors.light.primaryBgHover : colors.dark.primaryBgHover
}

export const getTableHeader = (mode: 'light' | 'dark') => {
  return mode === 'light' ? colors.light.tableHeader : colors.dark.tableHeader
}

export const getDivider = (mode: 'light' | 'dark') => {
  return mode === 'light' ? colors.light.divider : colors.dark.divider
}

export const getTextPrimary = (mode: 'light' | 'dark') => {
  return mode === 'light' ? colors.light.text.primary : colors.dark.text.primary
}

export const getTextSecondary = (mode: 'light' | 'dark') => {
  return mode === 'light' ? colors.light.text.secondary : colors.dark.text.secondary
}

export const themeConfig = {
  colors,
  gradients,
  natureColors,
  natureGradients,
  shadows,
  borderRadius,
  transitions,
  spacing,
  typography,
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
}

export default themeConfig
