import type { Alpha } from '@mui/material/styles' // eslint-disable-line @typescript-eslint/no-unused-vars
import { alpha } from '@mui/material/styles'

export const colors = {
  primary: {
    main: '#ff5a3c',
    light: '#ff7a5c',
    dark: '#e04530',
    contrastText: '#ffffff',
  },

  secondary: {
    main: '#ff7a5c',
    light: '#ff9a7c',
    dark: '#e05a3c',
    contrastText: '#ffffff',
  },

  success: {
    main: '#10b981',
    light: '#34d399',
    dark: '#047857',
  },
  warning: {
    main: '#f59e0b',
    light: '#fbbf24',
    dark: '#d97706',
  },
  error: {
    main: '#ef4444',
    light: '#f87171',
    dark: '#dc2626',
  },
  info: {
    main: '#3b82f6',
    light: '#60a5fa',
    dark: '#2563eb',
  },

  light: {
    background: {
      default: '#f5f7fa',
      paper: '#ffffff',
    },
    grey: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#eeeeee',
      300: '#e0e0e0',
      400: '#bdbdbd',
      500: '#9e9e9e',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
    },
    text: {
      primary: '#1a1a2e',
      secondary: '#6b7280',
    },
    divider: 'rgba(0, 0, 0, 0.08)',
    border: 'rgba(0,0,0,0.04)',
    subtleBg: 'rgba(0,0,0,0.02)',
    subtleBgHover: 'rgba(0,0,0,0.04)',
    primaryBg: alpha('#ff5a3c', 0.04),
    primaryBgHover: alpha('#ff5a3c', 0.08),
    tableHeader: '#f8fafc',
  },

  dark: {
    background: {
      default: '#0f172a',
      paper: '#1e293b',
    },
    grey: {
      50: '#0f172a',
      100: '#1e293b',
      200: '#334155',
      300: '#475569',
      400: '#64748b',
      500: '#94a3b8',
      600: '#cbd5e1',
      700: '#e2e8f0',
      800: '#f1f5f9',
      900: '#f8fafc',
    },
    text: {
      primary: '#f1f5f9',
      secondary: '#94a3b8',
    },
    divider: 'rgba(255, 255, 255, 0.08)',
    border: 'rgba(255,255,255,0.04)',
    subtleBg: 'rgba(255,255,255,0.02)',
    subtleBgHover: 'rgba(255,255,255,0.04)',
    primaryBg: alpha('#ff5a3c', 0.08),
    primaryBgHover: alpha('#ff5a3c', 0.12),
    tableHeader: '#273548',
  },
}

export const gradients = {
  primary: 'linear-gradient(135deg, #ff5a3c 0%, #ff7a5c 100%)',
  primaryHorizontal: 'linear-gradient(90deg, #ff5a3c 0%, #ff7a5c 100%)',
  secondary: 'linear-gradient(135deg, #ff7a5c 0%, #ff9a7c 100%)',
  sidebar: 'linear-gradient(180deg, #ff5a3c 0%, #e04530 100%)',
  sidebarDark: 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)',
  success: `linear-gradient(135deg, ${colors.success.light} 0%, ${colors.success.main} 100%)`,
  error: `linear-gradient(135deg, ${colors.error.light} 0%, ${colors.error.main} 100%)`,
}

export const shadows = {
  light: {
    sm: '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.02)',
    md: '0 2px 8px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.04)',
    lg: '0 4px 12px rgba(0,0,0,0.08), 0 16px 48px rgba(0,0,0,0.04)',
    primary: '0 2px 8px rgba(255, 90, 60, 0.25)',
    primaryHover: '0 4px 12px rgba(255, 90, 60, 0.35)',
    primaryActive: '0 8px 24px rgba(255, 90, 60, 0.4)',
    dialog: '0 20px 60px rgba(0,0,0,0.15)',
  },
  dark: {
    sm: '0 1px 3px rgba(0,0,0,0.2), 0 4px 12px rgba(0,0,0,0.1)',
    md: '0 2px 8px rgba(0,0,0,0.3), 0 8px 24px rgba(0,0,0,0.2)',
    lg: '0 4px 12px rgba(0,0,0,0.4), 0 16px 48px rgba(0,0,0,0.3)',
    primary: '0 2px 8px rgba(255, 90, 60, 0.2)',
    primaryHover: '0 4px 12px rgba(255, 90, 60, 0.3)',
    primaryActive: '0 8px 24px rgba(255, 90, 60, 0.4)',
    dialog: '0 20px 60px rgba(0,0,0,0.5)',
  },
}

export const borderRadius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
}

export const transitions = {
  default: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)',
  fast: 'all 100ms cubic-bezier(0.4, 0, 0.2, 1)',
  slow: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
  spin: 'transform 0.3s ease',
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
  fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  h1: { fontSize: '2rem', fontWeight: 700, letterSpacing: '-0.025em' },
  h2: { fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.025em' },
  h3: { fontSize: '1.25rem', fontWeight: 600 },
  h4: { fontSize: '1.125rem', fontWeight: 600 },
  h5: { fontSize: '1rem', fontWeight: 600 },
  h6: { fontSize: '0.875rem', fontWeight: 600 },
  body1: { fontSize: '0.875rem', lineHeight: 1.6 },
  body2: { fontSize: '0.8125rem', lineHeight: 1.6 },
  caption: { fontSize: '0.75rem' },
  button: { fontSize: '0.875rem', fontWeight: 500, textTransform: 'none' as const },
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

export const commonHover = {
  row: (mode: 'light' | 'dark') => ({
    backgroundColor: getPrimaryBg(mode),
    transition: transitions.default,
  }),
  translateX: {
    '&:hover': {
      transform: 'translateX(4px)',
    },
  },
  translateY: {
    '&:hover': {
      transform: 'translateY(-1px)',
    },
  },
  lift: {
    '&:hover': {
      transform: 'translateY(-4px)',
    },
  },
}

export const themeConfig = {
  colors,
  gradients,
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
  commonHover,
}

export default themeConfig
