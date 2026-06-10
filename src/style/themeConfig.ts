import { alpha } from '@mui/material/styles'

export const colors = {
  primary: {
    main: '#6366F1',
    light: '#818CF8',
    dark: '#4F46E5',
    contrastText: '#FFFFFF',
  },

  secondary: {
    main: '#F59E0B',
    light: '#FBBF24',
    dark: '#D97706',
    contrastText: '#FFFFFF',
  },

  success: {
    main: '#10B981',
    light: '#34D399',
    dark: '#059669',
  },
  warning: {
    main: '#F59E0B',
    light: '#FBBF24',
    dark: '#D97706',
  },
  error: {
    main: '#F43F5E',
    light: '#FB7185',
    dark: '#E11D48',
  },
  info: {
    main: '#0EA5E9',
    light: '#38BDF8',
    dark: '#0284C7',
  },

  light: {
    background: {
      default: '#F8FAFC',
      paper: '#FFFFFF',
    },
    grey: {
      50: '#F8FAFC',
      100: '#F1F5F9',
      200: '#E2E8F0',
      300: '#CBD5E1',
      400: '#94A3B8',
      500: '#64748B',
      600: '#475569',
      700: '#334155',
      800: '#1E293B',
      900: '#0F172A',
    },
    text: {
      primary: '#0F172A',
      secondary: '#64748B',
    },
    divider: 'rgba(0, 0, 0, 0.06)',
    border: 'rgba(0, 0, 0, 0.08)',
    subtleBg: 'rgba(99, 102, 241, 0.03)',
    subtleBgHover: 'rgba(99, 102, 241, 0.06)',
    primaryBg: alpha('#6366F1', 0.05),
    primaryBgHover: alpha('#6366F1', 0.09),
    tableHeader: '#F1F5F9',
  },

  dark: {
    background: {
      default: '#0B1121',
      paper: '#131C2E',
    },
    grey: {
      50: '#0F172A',
      100: '#131C2E',
      200: '#1E293B',
      300: '#334155',
      400: '#475569',
      500: '#64748B',
      600: '#94A3B8',
      700: '#CBD5E1',
      800: '#E2E8F0',
      900: '#F1F5F9',
    },
    text: {
      primary: '#F1F5F9',
      secondary: '#94A3B8',
    },
    divider: 'rgba(255, 255, 255, 0.06)',
    border: 'rgba(255, 255, 255, 0.08)',
    subtleBg: 'rgba(99, 102, 241, 0.04)',
    subtleBgHover: 'rgba(99, 102, 241, 0.08)',
    primaryBg: alpha('#6366F1', 0.08),
    primaryBgHover: alpha('#6366F1', 0.12),
    tableHeader: '#1E293B',
  },
}

export const accentColors = {
  sapphire: { main: '#3B82F6', light: '#60A5FA', dark: '#2563EB' },
  emerald: { main: '#10B981', light: '#34D399', dark: '#059669' },
  amber: { main: '#F59E0B', light: '#FBBF24', dark: '#D97706' },
  rose: { main: '#F43F5E', light: '#FB7185', dark: '#E11D48' },
  violet: { main: '#8B5CF6', light: '#A78BFA', dark: '#7C3AED' },
  teal: { main: '#14B8A6', light: '#2DD4BF', dark: '#0D9488' },
  cyan: { main: '#06B6D4', light: '#22D3EE', dark: '#0891B2' },
}

export const accentGradients = {
  sapphire: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
  emerald: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
  amber: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
  rose: 'linear-gradient(135deg, #F43F5E 0%, #E11D48 100%)',
  violet: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
  teal: 'linear-gradient(135deg, #14B8A6 0%, #0D9488 100%)',
  cyan: 'linear-gradient(135deg, #06B6D4 0%, #0891B2 100%)',
}

export const gradients = {
  primary: 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)',
  primaryHorizontal: 'linear-gradient(90deg, #6366F1 0%, #4F46E5 100%)',
  primaryDark: 'linear-gradient(135deg, #4F46E5 0%, #4338CA 100%)',
  secondary: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
  secondaryDark: 'linear-gradient(135deg, #D97706 0%, #B45309 100%)',
  sidebar: 'linear-gradient(180deg, #0F172A 0%, #0B1121 100%)',
  sidebarDark: 'linear-gradient(180deg, #0B1121 0%, #0B1121 100%)',
  card: 'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
  cardHover: 'linear-gradient(180deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)',
  dashboard: 'linear-gradient(135deg, #0B1121 0%, #131C2E 45%, #1A2440 100%)',
  success: `linear-gradient(135deg, ${colors.success.light} 0%, ${colors.success.main} 100%)`,
  successDark: `linear-gradient(135deg, #059669 0%, #10B981 100%)`,
  warning: `linear-gradient(135deg, ${colors.warning.light} 0%, ${colors.warning.main} 100%)`,
  warningDark: `linear-gradient(135deg, #D97706 0%, #F59E0B 100%)`,
  error: `linear-gradient(135deg, ${colors.error.light} 0%, ${colors.error.main} 100%)`,
}

export const shadows = {
  light: {
    sm: '0 1px 2px rgba(0,0,0,0.03), 0 1px 1px rgba(0,0,0,0.02)',
    md: '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.04)',
    lg: '0 2px 4px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.06)',
    xl: '0 4px 8px rgba(0,0,0,0.04), 0 16px 48px rgba(0,0,0,0.08)',
    primary: '0 4px 14px rgba(99, 102, 241, 0.25)',
    primaryHover: '0 8px 25px rgba(99, 102, 241, 0.35)',
    primaryActive: '0 12px 35px rgba(99, 102, 241, 0.4)',
    dialog: '0 24px 80px rgba(0,0,0,0.2)',
    sidebar: '2px 0 20px rgba(0,0,0,0.06)',
    card: '0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.04)',
    cardHover: '0 2px 4px rgba(0,0,0,0.04), 0 12px 32px rgba(0,0,0,0.08)',
    elevated: '0 4px 12px rgba(99, 102, 241, 0.15)',
    glow: '0 0 20px rgba(99, 102, 241, 0.15)',
  },
  dark: {
    sm: '0 1px 2px rgba(0,0,0,0.2), 0 1px 1px rgba(0,0,0,0.15)',
    md: '0 1px 3px rgba(0,0,0,0.25), 0 4px 12px rgba(0,0,0,0.2)',
    lg: '0 2px 4px rgba(0,0,0,0.3), 0 8px 24px rgba(0,0,0,0.25)',
    xl: '0 4px 8px rgba(0,0,0,0.3), 0 16px 48px rgba(0,0,0,0.35)',
    primary: '0 4px 14px rgba(99, 102, 241, 0.3)',
    primaryHover: '0 8px 25px rgba(99, 102, 241, 0.4)',
    primaryActive: '0 12px 35px rgba(99, 102, 241, 0.5)',
    dialog: '0 24px 80px rgba(0,0,0,0.6)',
    sidebar: '2px 0 20px rgba(0,0,0,0.3)',
    card: '0 1px 3px rgba(0,0,0,0.3), 0 4px 16px rgba(0,0,0,0.25)',
    cardHover: '0 2px 4px rgba(0,0,0,0.35), 0 12px 32px rgba(0,0,0,0.3)',
    elevated: '0 4px 12px rgba(99, 102, 241, 0.25)',
    glow: '0 0 20px rgba(99, 102, 241, 0.2)',
  },
}

export const borderRadius = {
  xs: 4,
  sm: 6,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 20,
  pill: 9999,
}

export const transitions = {
  default: 'all 0.2s ease',
  fast: 'all 0.1s ease',
  slow: 'all 0.35s ease',
  spring: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
  smooth: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
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
    '"Plus Jakarta Sans", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  headingFont:
    '"Plus Jakarta Sans", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  h1: {
    fontSize: '2rem',
    fontWeight: 700,
    letterSpacing: '-0.03em',
    lineHeight: 1.25,
  },
  h2: {
    fontSize: '1.5rem',
    fontWeight: 700,
    letterSpacing: '-0.02em',
    lineHeight: 1.3,
  },
  h3: { fontSize: '1.25rem', fontWeight: 600, letterSpacing: '-0.015em', lineHeight: 1.35 },
  h4: { fontSize: '1.125rem', fontWeight: 600, lineHeight: 1.4 },
  h5: { fontSize: '1rem', fontWeight: 600, lineHeight: 1.4 },
  h6: { fontSize: '0.875rem', fontWeight: 600, lineHeight: 1.5 },
  body1: { fontSize: '0.9375rem', lineHeight: 1.65, fontWeight: 400 },
  body2: { fontSize: '0.8125rem', lineHeight: 1.6, fontWeight: 400 },
  caption: { fontSize: '0.75rem', letterSpacing: '0.02em', fontWeight: 500 },
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
  accentColors,
  accentGradients,
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
