import { SxProps, Theme } from '@mui/material'

export const theme = {
  colors: {
    primary: '#1976d2',
    secondary: '#dc004e',
    success: '#2e7d32',
    warning: '#ed6c02',
    error: '#d32f2f',
    background: {
      default: '#fafafa',
      paper: '#ffffff',
    },
  },
}

export const commonStyles = {
  flexCenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  } as const,

  flexBetween: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  } as const,

  flexStart: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  } as const,

  gap: (gap: number) =>
    ({
      display: 'flex',
      alignItems: 'center',
      gap,
    }) as const,

  container: {
    p: 2,
  } as const,

  card: {
    p: 2,
    boxShadow: 1,
  } as const,
}

export const spacing = {
  xs: 0.5,
  sm: 1,
  md: 2,
  lg: 3,
  xl: 4,
}

export const typography = {
  h1: {
    fontSize: '2rem',
    fontWeight: 600,
  },
  h2: {
    fontSize: '1.5rem',
    fontWeight: 600,
  },
  h3: {
    fontSize: '1.25rem',
    fontWeight: 600,
  },
  body: {
    fontSize: '0.875rem',
  },
  caption: {
    fontSize: '0.75rem',
    color: 'text.secondary',
  },
}

export const breakpoints = {
  xs: '@media (max-width: 599px)',
  sm: '@media (min-width: 600px)',
  md: '@media (min-width: 900px)',
  lg: '@media (min-width: 1200px)',
  xl: '@media (min-width: 1536px)',
}
