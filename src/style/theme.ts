import { createTheme, ThemeOptions, alpha } from '@mui/material/styles'

const SPACING_UNIT = 8

export const spacing = {
  xs: 0.5 * SPACING_UNIT, // 4px
  sm: 1 * SPACING_UNIT, // 8px
  md: 2 * SPACING_UNIT, // 16px
  lg: 3 * SPACING_UNIT, // 24px
  xl: 4 * SPACING_UNIT, // 32px
}

export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
}

const transitions = {
  default: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)',
}

const primaryGradient = 'linear-gradient(135deg, #ff5a3c 0%, #ff7a5c 100%)'

const lightPalette = {
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
  action: {
    hover: 'rgba(255, 90, 60, 0.08)',
    selected: 'rgba(255, 90, 60, 0.12)',
    disabled: 'rgba(0, 0, 0, 0.26)',
  },
}

const darkPalette = {
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
  action: {
    hover: 'rgba(255, 90, 60, 0.12)',
    selected: 'rgba(255, 90, 60, 0.16)',
    disabled: 'rgba(255, 255, 255, 0.26)',
  },
}

const commonComponentOverrides = (mode: 'light' | 'dark'): ThemeOptions['components'] => ({
  MuiCssBaseline: {
    styleOverrides: {
      '@import':
        'url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap")',
      body: {
        fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      },
    },
  },
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: borderRadius.md,
        textTransform: 'none',
        fontWeight: 500,
        transition: transitions.default,
        padding: '8px 20px',
        '&:hover': {
          transform: 'translateY(-1px)',
          boxShadow:
            mode === 'light'
              ? '0 4px 12px rgba(255, 90, 60, 0.25)'
              : '0 4px 12px rgba(255, 90, 60, 0.15)',
        },
      },
      containedPrimary: {
        background: primaryGradient,
        boxShadow:
          mode === 'light'
            ? '0 2px 8px rgba(255, 90, 60, 0.3)'
            : '0 2px 8px rgba(255, 90, 60, 0.2)',
        '&:hover': {
          background: primaryGradient,
          filter: 'brightness(1.1)',
        },
      },
      containedSecondary: {
        background: 'linear-gradient(135deg, #ff7a5c 0%, #ff9a7c 100%)',
      },
      outlined: {
        borderColor: mode === 'light' ? 'rgba(0,0,0,0.12)' : 'rgba(255,255,255,0.12)',
        '&:hover': {
          borderColor: '#ff5a3c',
          backgroundColor: alpha('#ff5a3c', 0.04),
        },
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: borderRadius.lg,
        boxShadow:
          mode === 'light'
            ? '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.02)'
            : '0 1px 3px rgba(0,0,0,0.2), 0 4px 12px rgba(0,0,0,0.1)',
        transition: transitions.default,
        backgroundColor: mode === 'light' ? '#ffffff' : '#1e293b',
        border:
          mode === 'light' ? '1px solid rgba(0,0,0,0.04)' : '1px solid rgba(255,255,255,0.04)',
        '&:hover': {
          boxShadow:
            mode === 'light'
              ? '0 2px 8px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.04)'
              : '0 2px 8px rgba(0,0,0,0.3), 0 8px 24px rgba(0,0,0,0.2)',
        },
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        borderRadius: borderRadius.md,
        transition: transitions.default,
        backgroundImage: 'none',
      },
      elevation1: {
        boxShadow:
          mode === 'light'
            ? '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.02)'
            : '0 1px 3px rgba(0,0,0,0.2), 0 4px 12px rgba(0,0,0,0.1)',
      },
      elevation2: {
        boxShadow:
          mode === 'light'
            ? '0 2px 8px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.04)'
            : '0 2px 8px rgba(0,0,0,0.3), 0 8px 24px rgba(0,0,0,0.2)',
      },
    },
  },
  MuiTextField: {
    styleOverrides: {
      root: {
        marginBottom: spacing.md,
        '& .MuiOutlinedInput-root': {
          borderRadius: borderRadius.md,
          transition: transitions.default,
          backgroundColor: mode === 'light' ? '#fafafa' : '#273548',
          '&:hover': {
            backgroundColor: mode === 'light' ? '#f5f5f5' : '#2d3f56',
          },
          '&.Mui-focused': {
            backgroundColor: mode === 'light' ? '#ffffff' : '#334155',
            boxShadow: `0 0 0 3px ${alpha('#ff5a3c', 0.12)}`,
          },
          '& fieldset': {
            borderColor: mode === 'light' ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)',
            transition: transitions.default,
          },
          '&:hover fieldset': {
            borderColor: alpha('#ff5a3c', 0.5),
          },
          '&.Mui-focused fieldset': {
            borderColor: '#ff5a3c',
          },
        },
        '& .MuiInputLabel-root': {
          fontWeight: 500,
          color: mode === 'light' ? '#6b7280' : '#94a3b8',
          '&.Mui-focused': {
            color: '#ff5a3c',
          },
        },
      },
    },
  },
  MuiSelect: {
    styleOverrides: {
      select: {
        borderRadius: borderRadius.md,
        backgroundColor: mode === 'light' ? '#fafafa' : '#273548',
        transition: transitions.default,
        minHeight: 36,
      },
    },
  },
  MuiTable: {
    styleOverrides: {
      root: {
        borderRadius: borderRadius.lg,
        overflow: 'hidden',
      },
    },
  },
  MuiTableContainer: {
    styleOverrides: {
      root: {
        borderRadius: borderRadius.lg,
        border:
          mode === 'light' ? '1px solid rgba(0,0,0,0.04)' : '1px solid rgba(255,255,255,0.04)',
        boxShadow:
          mode === 'light'
            ? '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.02)'
            : '0 1px 3px rgba(0,0,0,0.2), 0 4px 12px rgba(0,0,0,0.1)',
      },
    },
  },
  MuiTableHead: {
    styleOverrides: {
      root: {
        backgroundColor: mode === 'light' ? '#f8fafc' : '#273548',
        '& .MuiTableCell-head': {
          fontWeight: 600,
          fontSize: '0.75rem',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          color: mode === 'light' ? '#6b7280' : '#94a3b8',
          borderBottom:
            mode === 'light' ? '2px solid rgba(0,0,0,0.04)' : '2px solid rgba(255,255,255,0.04)',
          padding: '12px 16px',
        },
      },
    },
  },
  MuiTableBody: {
    styleOverrides: {
      root: {
        '& .MuiTableCell-body': {
          borderBottom:
            mode === 'light' ? '1px solid rgba(0,0,0,0.04)' : '1px solid rgba(255,255,255,0.04)',
          padding: '12px 16px',
          fontSize: '0.875rem',
          transition: transitions.default,
          color: mode === 'light' ? '#1a1a2e' : '#f1f5f9',
        },
        '& .MuiTableRow-root': {
          transition: transitions.default,
          '&:hover': {
            backgroundColor:
              mode === 'light' ? 'rgba(255, 90, 60, 0.04)' : 'rgba(255, 90, 60, 0.08)',
          },
        },
      },
    },
  },
  MuiChip: {
    styleOverrides: {
      root: {
        borderRadius: borderRadius.sm,
        fontWeight: 500,
        transition: transitions.default,
      },
      colorPrimary: {
        backgroundColor: alpha('#ff5a3c', 0.1),
        color: '#ff5a3c',
      },
    },
  },
  MuiAlert: {
    styleOverrides: {
      root: {
        borderRadius: borderRadius.md,
        border: 'none',
      },
      standardSuccess: {
        backgroundColor: alpha('#10b981', 0.1),
        color: mode === 'light' ? '#047857' : '#34d399',
      },
      standardError: {
        backgroundColor: alpha('#ef4444', 0.1),
        color: mode === 'light' ? '#dc2626' : '#f87171',
      },
      standardWarning: {
        backgroundColor: alpha('#f59e0b', 0.1),
        color: mode === 'light' ? '#d97706' : '#fbbf24',
      },
      standardInfo: {
        backgroundColor: alpha('#3b82f6', 0.1),
        color: mode === 'light' ? '#2563eb' : '#60a5fa',
      },
    },
  },
  MuiLinearProgress: {
    styleOverrides: {
      root: {
        borderRadius: borderRadius.xl,
        backgroundColor: mode === 'light' ? '#f3f4f6' : '#374151',
        height: 6,
      },
      bar: {
        borderRadius: borderRadius.xl,
        background: primaryGradient,
      },
    },
  },
  MuiTypography: {
    styleOverrides: {
      h1: {
        fontWeight: 700,
        fontSize: '2rem',
        letterSpacing: '-0.025em',
      },
      h2: {
        fontWeight: 700,
        fontSize: '1.5rem',
        letterSpacing: '-0.025em',
      },
      h3: {
        fontWeight: 600,
        fontSize: '1.25rem',
        letterSpacing: '-0.025em',
      },
      h4: {
        fontWeight: 600,
        fontSize: '1.125rem',
      },
      h5: {
        fontWeight: 600,
        fontSize: '1rem',
      },
      h6: {
        fontWeight: 600,
        fontSize: '0.875rem',
      },
      body1: {
        fontSize: '0.875rem',
        lineHeight: 1.6,
      },
      body2: {
        fontSize: '0.8125rem',
        lineHeight: 1.6,
      },
      caption: {
        fontSize: '0.75rem',
        color: mode === 'light' ? '#6b7280' : '#94a3b8',
      },
    },
  },
  MuiLink: {
    styleOverrides: {
      root: {
        color: '#ff5a3c',
        textDecoration: 'none',
        transition: transitions.default,
        '&:hover': {
          color: '#e04530',
          textDecoration: 'underline',
        },
      },
    },
  },
  MuiListItemButton: {
    styleOverrides: {
      root: {
        borderRadius: borderRadius.md,
        margin: '2px 8px',
        transition: transitions.default,
        '&.Mui-selected': {
          backgroundColor: alpha('#ff5a3c', 0.1),
          color: '#ff5a3c',
          '&:hover': {
            backgroundColor: alpha('#ff5a3c', 0.15),
          },
          '& .MuiListItemIcon-root': {
            color: '#ff5a3c',
          },
        },
      },
    },
  },
  MuiDialog: {
    styleOverrides: {
      paper: {
        borderRadius: borderRadius.xl,
        boxShadow:
          mode === 'light' ? '0 20px 60px rgba(0,0,0,0.15)' : '0 20px 60px rgba(0,0,0,0.5)',
      },
    },
  },
  MuiTooltip: {
    styleOverrides: {
      tooltip: {
        borderRadius: borderRadius.sm,
        backgroundColor: mode === 'light' ? '#1a1a2e' : '#f1f5f9',
        color: mode === 'light' ? '#ffffff' : '#1a1a2e',
        fontSize: '0.75rem',
        padding: '6px 12px',
        boxShadow: mode === 'light' ? '0 4px 12px rgba(0,0,0,0.1)' : '0 4px 12px rgba(0,0,0,0.3)',
      },
      arrow: {
        color: mode === 'light' ? '#1a1a2e' : '#f1f5f9',
      },
    },
  },
  MuiSkeleton: {
    styleOverrides: {
      root: {
        backgroundColor: mode === 'light' ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.06)',
      },
    },
  },
})

export const createAppTheme = (mode: 'light' | 'dark') => {
  const palette = mode === 'light' ? lightPalette : darkPalette

  return createTheme({
    palette: {
      mode,
      ...palette,
    },
    typography: {
      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      h1: {
        fontWeight: 700,
        fontSize: '2rem',
        letterSpacing: '-0.025em',
      },
      h2: {
        fontWeight: 700,
        fontSize: '1.5rem',
        letterSpacing: '-0.025em',
      },
      h3: {
        fontWeight: 600,
        fontSize: '1.25rem',
      },
      h4: {
        fontWeight: 600,
        fontSize: '1.125rem',
      },
      h5: {
        fontWeight: 600,
        fontSize: '1rem',
      },
      h6: {
        fontWeight: 600,
        fontSize: '0.875rem',
      },
      body1: {
        fontSize: '0.875rem',
        lineHeight: 1.6,
      },
      body2: {
        fontSize: '0.8125rem',
        lineHeight: 1.6,
      },
      caption: {
        fontSize: '0.75rem',
      },
    },
    spacing: SPACING_UNIT,
    shape: {
      borderRadius: borderRadius.md,
    },
    components: commonComponentOverrides(mode),
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1280,
        xl: 1920,
      },
    },
  })
}

export const lightTheme = createAppTheme('light')
export const darkTheme = createAppTheme('dark')

export const commonStyles = {
  flexCenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flexBetween: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  flexStart: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  gap: (gap: number) => ({
    display: 'flex',
    alignItems: 'center',
    gap,
  }),
  container: {
    p: { xs: 2, md: 3 },
  },
  card: {
    p: { xs: 2, md: 3 },
    borderRadius: borderRadius.lg,
    boxShadow: 1,
  },
  floatingContainer: {
    borderRadius: borderRadius.lg,
    backgroundColor: 'background.paper',
    boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.02)',
    m: { xs: 1, md: 2 },
    p: { xs: 2, md: 3 },
  },
}

export const themeColors = {
  primaryGradient,
  sidebarGradient: 'linear-gradient(180deg, #ff5a3c 0%, #e04530 100%)',
  sidebarDarkGradient: 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)',
}
