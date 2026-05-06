import { createTheme, ThemeOptions, alpha } from '@mui/material/styles'
import {
  colors,
  gradients,
  borderRadius as br,
  transitions,
  spacing as spConfig,
  typography as typoConfig,
  getShadow,
} from './themeConfig'

const SPACING_UNIT = 8

export const spacing = {
  xs: 0.5 * SPACING_UNIT, // 4px
  sm: 1 * SPACING_UNIT, // 8px
  md: 2 * SPACING_UNIT, // 16px
  lg: 3 * SPACING_UNIT, // 24px
  xl: 4 * SPACING_UNIT, // 32px
}

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
    borderRadius: br.lg,
    boxShadow: 1,
  },
  floatingContainer: {
    borderRadius: br.lg,
    backgroundColor: 'background.paper',
    boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.02)',
    m: { xs: 1, md: 2 },
    p: { xs: 2, md: 3 },
  },
}

const createPalette = (mode: 'light' | 'dark') => ({
  mode,
  ...(mode === 'light' ? colors.light : colors.dark),
  primary: colors.primary,
  secondary: colors.secondary,
  success: colors.success,
  warning: colors.warning,
  error: colors.error,
  info: colors.info,
})

const commonComponentOverrides = (mode: 'light' | 'dark'): ThemeOptions['components'] => ({
  MuiCssBaseline: {
    styleOverrides: {
      body: {
        fontFamily: typoConfig.fontFamily,
      },
    },
  },
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: br.md,
        textTransform: 'none',
        fontWeight: 500,
        transition: transitions.default,
        padding: '8px 20px',
        '&:hover': {
          transform: 'translateY(-1px)',
          boxShadow: getShadow(mode, 'primary'),
        },
      },
      containedPrimary: {
        background: gradients.primary,
        boxShadow: getShadow(mode, 'primary'),
        '&:hover': {
          background: gradients.primary,
          filter: 'brightness(1.1)',
        },
      },
      containedSecondary: {
        background: gradients.secondary,
      },
      outlined: {
        borderColor: mode === 'light' ? 'rgba(0,0,0,0.12)' : 'rgba(255,255,255,0.12)',
        '&:hover': {
          borderColor: colors.primary.main,
          backgroundColor: alpha(colors.primary.main, 0.04),
        },
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: br.lg,
        boxShadow: getShadow(mode, 'sm'),
        transition: transitions.default,
        backgroundColor:
          mode === 'light' ? colors.light.background.paper : colors.dark.background.paper,
        border:
          mode === 'light' ? '1px solid rgba(0,0,0,0.04)' : '1px solid rgba(255,255,255,0.04)',
        '&:hover': {
          boxShadow: getShadow(mode, 'md'),
        },
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        borderRadius: br.md,
        transition: transitions.default,
        backgroundImage: 'none',
      },
      elevation1: {
        boxShadow: getShadow(mode, 'sm'),
      },
      elevation2: {
        boxShadow: getShadow(mode, 'md'),
      },
    },
  },
  MuiTextField: {
    styleOverrides: {
      root: {
        marginBottom: spConfig.md,
        '& .MuiOutlinedInput-root': {
          borderRadius: br.md,
          transition: transitions.default,
          backgroundColor: mode === 'light' ? 'rgba(0,0,0,0.02)' : 'rgba(255,255,255,0.02)',
          '&:hover': {
            backgroundColor: mode === 'light' ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.04)',
          },
          '&.Mui-focused': {
            backgroundColor: mode === 'light' ? '#ffffff' : colors.dark.background.paper,
            boxShadow: `0 0 0 3px ${alpha(colors.primary.main, 0.12)}`,
          },
          '& fieldset': {
            borderColor: mode === 'light' ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)',
            transition: transitions.default,
          },
          '&:hover fieldset': {
            borderColor: alpha(colors.primary.main, 0.5),
          },
          '&.Mui-focused fieldset': {
            borderColor: colors.primary.main,
          },
        },
        '& .MuiInputLabel-root': {
          fontWeight: 500,
          color: mode === 'light' ? colors.light.text.secondary : colors.dark.text.secondary,
          '&.Mui-focused': {
            color: colors.primary.main,
          },
        },
      },
    },
  },
  MuiSelect: {
    styleOverrides: {
      select: {
        borderRadius: br.md,
        backgroundColor: mode === 'light' ? 'rgba(0,0,0,0.02)' : 'rgba(255,255,255,0.02)',
        transition: transitions.default,
        minHeight: 36,
      },
    },
  },
  MuiTable: {
    styleOverrides: {
      root: {
        borderRadius: br.lg,
        overflow: 'hidden',
      },
    },
  },
  MuiTableContainer: {
    styleOverrides: {
      root: {
        borderRadius: br.lg,
        border:
          mode === 'light' ? '1px solid rgba(0,0,0,0.04)' : '1px solid rgba(255,255,255,0.04)',
        boxShadow: getShadow(mode, 'sm'),
      },
    },
  },
  MuiTableHead: {
    styleOverrides: {
      root: {
        backgroundColor: mode === 'light' ? 'rgba(0,0,0,0.02)' : 'rgba(255,255,255,0.02)',
        '& .MuiTableCell-head': {
          fontWeight: 600,
          fontSize: '0.75rem',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          color: mode === 'light' ? colors.light.text.secondary : colors.dark.text.secondary,
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
          color: mode === 'light' ? colors.light.text.primary : colors.dark.text.primary,
        },
        '& .MuiTableRow-root': {
          transition: transitions.default,
          '&:hover': {
            backgroundColor: alpha(colors.primary.main, mode === 'light' ? 0.04 : 0.08),
          },
        },
      },
    },
  },
  MuiChip: {
    styleOverrides: {
      root: {
        borderRadius: br.sm,
        fontWeight: 500,
        transition: transitions.default,
      },
      colorPrimary: {
        backgroundColor: alpha(colors.primary.main, 0.1),
        color: colors.primary.main,
      },
    },
  },
  MuiAlert: {
    styleOverrides: {
      root: {
        borderRadius: br.md,
        border: 'none',
      },
      standardSuccess: {
        backgroundColor: alpha(colors.success.main, 0.1),
        color: mode === 'light' ? colors.success.dark : colors.success.light,
      },
      standardError: {
        backgroundColor: alpha(colors.error.main, 0.1),
        color: mode === 'light' ? colors.error.dark : colors.error.light,
      },
      standardWarning: {
        backgroundColor: alpha(colors.warning.main, 0.1),
        color: mode === 'light' ? colors.warning.dark : colors.warning.light,
      },
      standardInfo: {
        backgroundColor: alpha(colors.info.main, 0.1),
        color: mode === 'light' ? colors.info.dark : colors.info.light,
      },
    },
  },
  MuiLinearProgress: {
    styleOverrides: {
      root: {
        borderRadius: br.xl,
        backgroundColor: mode === 'light' ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.06)',
        height: 6,
      },
      bar: {
        borderRadius: br.xl,
        background: gradients.primary,
      },
    },
  },
  MuiTypography: {
    styleOverrides: {
      h1: typoConfig.h1,
      h2: typoConfig.h2,
      h3: typoConfig.h3,
      h4: typoConfig.h4,
      h5: typoConfig.h5,
      h6: typoConfig.h6,
      body1: typoConfig.body1,
      body2: typoConfig.body2,
      caption: {
        ...typoConfig.caption,
        color: mode === 'light' ? colors.light.text.secondary : colors.dark.text.secondary,
      },
    },
  },
  MuiLink: {
    styleOverrides: {
      root: {
        color: colors.primary.main,
        textDecoration: 'none',
        transition: transitions.default,
        '&:hover': {
          color: colors.primary.dark,
          textDecoration: 'underline',
        },
      },
    },
  },
  MuiListItemButton: {
    styleOverrides: {
      root: {
        borderRadius: br.md,
        margin: '2px 8px',
        transition: transitions.default,
        '&.Mui-selected': {
          backgroundColor: alpha(colors.primary.main, 0.1),
          color: colors.primary.main,
          '&:hover': {
            backgroundColor: alpha(colors.primary.main, 0.15),
          },
          '& .MuiListItemIcon-root': {
            color: colors.primary.main,
          },
        },
      },
    },
  },
  MuiDialog: {
    styleOverrides: {
      paper: {
        borderRadius: br.xl,
        boxShadow:
          mode === 'light' ? '0 20px 60px rgba(0,0,0,0.15)' : '0 20px 60px rgba(0,0,0,0.5)',
      },
    },
  },
  MuiTooltip: {
    styleOverrides: {
      tooltip: {
        borderRadius: br.sm,
        backgroundColor: mode === 'light' ? colors.light.text.primary : colors.dark.text.primary,
        color: mode === 'light' ? '#ffffff' : colors.light.text.primary,
        fontSize: '0.75rem',
        padding: '6px 12px',
        boxShadow: mode === 'light' ? '0 4px 12px rgba(0,0,0,0.1)' : '0 4px 12px rgba(0,0,0,0.3)',
      },
      arrow: {
        color: mode === 'light' ? colors.light.text.primary : colors.dark.text.primary,
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
  const palette = createPalette(mode)

  return createTheme({
    palette,
    typography: {
      fontFamily: typoConfig.fontFamily,
      h1: typoConfig.h1,
      h2: typoConfig.h2,
      h3: typoConfig.h3,
      h4: typoConfig.h4,
      h5: typoConfig.h5,
      h6: typoConfig.h6,
      body1: typoConfig.body1,
      body2: typoConfig.body2,
      caption: {
        ...typoConfig.caption,
        color: mode === 'light' ? colors.light.text.secondary : colors.dark.text.secondary,
      },
    },
    spacing: SPACING_UNIT,
    shape: {
      borderRadius: br.md,
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

export const themeColors = {
  primaryGradient: gradients.primary,
  sidebarGradient: gradients.sidebar,
  sidebarDarkGradient: gradients.sidebarDark,
}

export { br, transitions, typoConfig }
