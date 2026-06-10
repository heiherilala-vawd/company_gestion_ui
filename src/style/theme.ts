import { createTheme, ThemeOptions, alpha } from '@mui/material/styles'
import {
  colors,
  gradients,
  borderRadius as br,
  transitions,
  spacing as spConfig,
  typography as typoConfig,
  getShadow,
  getBorder,
  getSubtleBg,
  getSubtleBgHover,
  getTextSecondary,
  getDivider,
} from './themeConfig'

const SPACING_UNIT = 8

export const spacing = {
  xs: 0.5 * SPACING_UNIT,
  sm: 1 * SPACING_UNIT,
  md: 2 * SPACING_UNIT,
  lg: 3 * SPACING_UNIT,
  xl: 4 * SPACING_UNIT,
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
  flexEnd: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
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
    boxShadow: (theme: { palette: { mode: string } }) =>
      getShadow(theme.palette.mode as 'light' | 'dark', 'card'),
    m: { xs: 1, md: 2 },
    p: { xs: 2, md: 3 },
  },
  formGrid: {
    display: 'grid',
    gap: { xs: 2, md: 3 },
  },
  formGrid2Col: {
    display: 'grid',
    gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
    gap: { xs: 2, md: 3 },
  },
  formGrid3Col: {
    display: 'grid',
    gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
    gap: { xs: 2, md: 3 },
  },
  formGrid4Col: {
    display: 'grid',
    gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr 1fr' },
    gap: { xs: 2, md: 3 },
  },
  dimensionGrid: {
    display: 'grid',
    gridTemplateColumns: { xs: '1fr 1fr', sm: 'repeat(3, 1fr)' },
    gap: { xs: 2, md: 3 },
  },
  weightGrid: {
    display: 'grid',
    gridTemplateColumns: { xs: '1fr 1fr', sm: '1fr 1fr auto' },
    gap: { xs: 2, md: 3 },
    alignItems: 'end',
  },
  navigationButtons: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    mt: { xs: 3, md: 4 },
    pt: { xs: 2, md: 3 },
    borderTop: (theme: { palette: { mode: string } }) =>
      `1px solid ${getDivider(theme.palette.mode as 'light' | 'dark')}`,
  },
  formSection: {
    mb: { xs: 3, md: 4 },
  },
  formSectionTitle: {
    fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' },
    fontWeight: 600,
    mb: { xs: 2, md: 3 },
    pb: 1.5,
    borderBottom: (theme: { palette: { mode: string } }) =>
      `1px solid ${getDivider(theme.palette.mode as 'light' | 'dark')}`,
  },
  inputWithUnit: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    '& .unit': {
      color: 'text.secondary',
      fontWeight: 500,
      fontSize: '0.875rem',
      minWidth: { xs: '24px', sm: '30px' },
      flexShrink: 0,
    },
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
  tonalOffset: 0.1,
  contrastThreshold: 3,
})

const commonComponentOverrides = (mode: 'light' | 'dark'): ThemeOptions['components'] => ({
  MuiCssBaseline: {
    styleOverrides: {
      body: {
        fontFamily: typoConfig.fontFamily,
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
        backgroundColor:
          mode === 'light' ? colors.light.background.default : colors.dark.background.default,
      },
      '*::selection': {
        backgroundColor: alpha(colors.primary.main, 0.2),
      },
      '@supports (font-variation-settings: normal)': {
        body: {
          fontFamily:
            '"Plus Jakarta Sans Variable", "Inter Variable", "Inter", -apple-system, BlinkMacSystemFont, sans-serif',
        },
      },
    },
  },

  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: br.md,
        textTransform: 'none',
        fontWeight: 600,
        transition: transitions.smooth,
        padding: { xs: '8px 18px', sm: '10px 22px' },
        fontSize: { xs: '0.8125rem', sm: '0.875rem' },
        lineHeight: 1.5,
        '&:hover': {
          transform: 'translateY(-1px)',
        },
        '&:active': {
          transform: 'translateY(0)',
        },
      },
      sizeSmall: {
        padding: '4px 12px',
        fontSize: '0.75rem',
      },
      sizeLarge: {
        padding: '12px 28px',
        fontSize: '0.9375rem',
      },
      containedPrimary: {
        background: gradients.primary,
        boxShadow: `0 4px 14px ${alpha('#6366F1', 0.3)}`,
        '&:hover': {
          background: gradients.primary,
          filter: 'brightness(1.08)',
          boxShadow: `0 8px 25px ${alpha('#6366F1', 0.4)}`,
        },
      },
      containedSecondary: {
        background: gradients.secondary,
        '&:hover': {
          filter: 'brightness(1.08)',
        },
      },
      outlined: {
        borderColor: mode === 'light' ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.15)',
        '&:hover': {
          borderColor: colors.primary.main,
          backgroundColor: alpha(colors.primary.main, 0.04),
        },
      },
      outlinedPrimary: {
        borderColor: alpha(colors.primary.main, 0.4),
        '&:hover': {
          backgroundColor: alpha(colors.primary.main, 0.06),
          borderColor: colors.primary.main,
        },
      },
      textSecondary: {
        color: getTextSecondary(mode),
        '&:hover': {
          backgroundColor: getSubtleBgHover(mode),
        },
      },
    },
  },

  MuiCard: {
    styleOverrides: {
      root: {
        transition: transitions.smooth,
        backgroundColor: mode === 'light' ? colors.light.background.paper : '#131C2E',
        border: `1px solid ${getBorder(mode)}`,
      },
    },
  },

  MuiPaper: {
    styleOverrides: {
      root: {
        transition: transitions.smooth,
        backgroundImage: 'none',
      },
      elevation0: {
        border: `1px solid ${getBorder(mode)}`,
      },
    },
  },

  MuiTextField: {
    styleOverrides: {
      root: {
        marginBottom: 0,
        width: '100%',
        '& .MuiOutlinedInput-root': {
          borderRadius: br.md,
          transition: transitions.smooth,
          backgroundColor: mode === 'light' ? 'rgba(0,0,0,0.02)' : 'rgba(255,255,255,0.02)',
          fontSize: { xs: '0.8125rem', sm: '0.875rem' },
          '&:hover': {
            backgroundColor: mode === 'light' ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.04)',
            '& fieldset': {
              borderColor: alpha(colors.primary.main, 0.4),
            },
          },
          '&.Mui-focused': {
            backgroundColor: mode === 'light' ? '#ffffff' : '#1E293B',
            boxShadow: `0 0 0 4px ${alpha('#6366F1', 0.12)}`,
            '& fieldset': {
              borderColor: '#6366F1',
              borderWidth: '1.5px',
            },
          },
          '& fieldset': {
            borderColor: mode === 'light' ? 'rgba(0,0,0,0.12)' : 'rgba(255,255,255,0.12)',
            transition: transitions.smooth,
          },
          '& input': {
            padding: { xs: '10px 14px', sm: '12px 16px' },
          },
          '& textarea': {
            padding: { xs: '10px 14px', sm: '12px 16px' },
          },
        },
        '& .MuiInputLabel-root': {
          position: 'relative',
          transform: 'none',
          marginBottom: '6px',
          fontSize: '0.8125rem',
          fontWeight: 500,
          color: getTextSecondary(mode),
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
        transition: transitions.smooth,
        minHeight: 40,
        padding: { xs: '10px 14px', sm: '12px 16px' },
      },
    },
  },

  MuiFormControl: {
    styleOverrides: {
      root: {
        marginBottom: { xs: 1.5, md: 2 },
        width: '100%',
      },
    },
  },

  MuiFormLabel: {
    styleOverrides: {
      root: {
        fontSize: '0.8125rem',
        fontWeight: 500,
        color: getTextSecondary(mode),
        marginBottom: '6px',
        '&.Mui-focused': {
          color: colors.primary.main,
        },
      },
    },
  },

  MuiTable: {
    styleOverrides: {
      root: {
        borderCollapse: 'separate',
        borderSpacing: 0,
      },
    },
  },

  MuiTableContainer: {
    styleOverrides: {
      root: {
        border: `1px solid ${getBorder(mode)}`,
        boxShadow: getShadow(mode, 'card'),
        overflow: 'auto',
      },
    },
  },

  MuiTableHead: {
    styleOverrides: {
      root: {
        backgroundColor: getSubtleBg(mode),
        '& .MuiTableCell-head': {
          fontWeight: 600,
          fontSize: { xs: '0.6875rem', sm: '0.75rem' },
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          color: getTextSecondary(mode),
          borderBottom: `1px solid ${getBorder(mode)}`,
          padding: { xs: '10px 16px', sm: '12px 18px' },
          whiteSpace: 'nowrap',
        },
      },
    },
  },

  MuiTableBody: {
    styleOverrides: {
      root: {
        '& .MuiTableCell-body': {
          borderBottom: `1px solid ${getBorder(mode)}`,
          padding: { xs: '10px 16px', sm: '12px 18px' },
          fontSize: { xs: '0.8125rem', sm: '0.875rem' },
          transition: transitions.smooth,
          color: mode === 'light' ? colors.light.text.primary : colors.dark.text.primary,
        },
        '& .MuiTableRow-root': {
          transition: transitions.smooth,
          '&:hover': {
            backgroundColor: alpha('#6366F1', mode === 'light' ? 0.03 : 0.05),
          },
          '&:last-child .MuiTableCell-body': {
            borderBottom: 'none',
          },
        },
      },
    },
  },

  MuiDataGrid: {
    styleOverrides: {
      root: {
        border: `1px solid ${getBorder(mode)}`,
        boxShadow: getShadow(mode, 'card'),
        backgroundColor: mode === 'light' ? '#ffffff' : '#131C2E',
        '& .MuiDataGrid-columnHeaders': {
          backgroundColor: getSubtleBg(mode),
          borderBottom: `1px solid ${getBorder(mode)}`,
          '& .MuiDataGrid-columnHeader': {
            padding: { xs: '10px 16px', sm: '12px 18px' },
          },
          '& .MuiDataGrid-columnHeaderTitle': {
            fontWeight: 600,
            color: getTextSecondary(mode),
            fontSize: '0.75rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          },
        },
        '& .MuiDataGrid-cell': {
          borderBottom: `1px solid ${getBorder(mode)}`,
          padding: { xs: '10px 16px', sm: '12px 18px' },
          fontSize: '0.875rem',
        },
        '& .MuiDataGrid-row': {
          transition: transitions.smooth,
          '&:hover': {
            backgroundColor: alpha('#6366F1', mode === 'light' ? 0.03 : 0.05),
          },
          '&.Mui-selected': {
            backgroundColor: alpha('#6366F1', mode === 'light' ? 0.06 : 0.08),
            '&:hover': {
              backgroundColor: alpha('#6366F1', mode === 'light' ? 0.1 : 0.12),
            },
          },
        },
        '& .MuiDataGrid-footerContainer': {
          borderTop: `1px solid ${getBorder(mode)}`,
          backgroundColor: getSubtleBg(mode),
        },
      },
    },
  },

  MuiChip: {
    styleOverrides: {
      root: {
        borderRadius: br.sm,
        fontWeight: 500,
        transition: transitions.smooth,
        height: 26,
        fontSize: '0.75rem',
      },
      colorPrimary: {
        backgroundColor: alpha(colors.primary.main, 0.12),
        color: mode === 'light' ? '#4F46E5' : '#A5B4FC',
      },
      colorSecondary: {
        backgroundColor: alpha(colors.secondary.main, 0.12),
        color: mode === 'light' ? '#D97706' : '#FDE68A',
      },
      colorSuccess: {
        backgroundColor: alpha(colors.success.main, 0.12),
        color: mode === 'light' ? '#059669' : '#6EE7B7',
      },
      colorError: {
        backgroundColor: alpha(colors.error.main, 0.12),
        color: mode === 'light' ? '#E11D48' : '#FDA4AF',
      },
    },
  },

  MuiAlert: {
    styleOverrides: {
      root: {
        borderRadius: br.md,
        border: 'none',
        fontSize: '0.875rem',
        fontWeight: 500,
      },
      standardSuccess: {
        backgroundColor: alpha(colors.success.main, 0.08),
        color: mode === 'light' ? colors.success.dark : colors.success.light,
      },
      standardError: {
        backgroundColor: alpha(colors.error.main, 0.08),
        color: mode === 'light' ? colors.error.dark : colors.error.light,
      },
      standardWarning: {
        backgroundColor: alpha(colors.warning.main, 0.08),
        color: mode === 'light' ? colors.warning.dark : colors.warning.light,
      },
      standardInfo: {
        backgroundColor: alpha(colors.info.main, 0.08),
        color: mode === 'light' ? colors.info.dark : colors.info.light,
      },
    },
  },

  MuiLinearProgress: {
    styleOverrides: {
      root: {
        borderRadius: br.pill,
        backgroundColor: mode === 'light' ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.06)',
        height: 6,
      },
      bar: {
        borderRadius: br.pill,
        background: gradients.primary,
      },
    },
  },

  MuiSkeleton: {
    styleOverrides: {
      root: {
        backgroundColor: mode === 'light' ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.04)',
        borderRadius: br.sm,
      },
    },
  },

  MuiTypography: {
    styleOverrides: {
      h1: { ...typoConfig.h1 },
      h2: { ...typoConfig.h2 },
      h3: { ...typoConfig.h3 },
      h4: { ...typoConfig.h4 },
      h5: { ...typoConfig.h5 },
      h6: { ...typoConfig.h6 },
      body1: { ...typoConfig.body1 },
      body2: { ...typoConfig.body2 },
      caption: {
        ...typoConfig.caption,
        color: getTextSecondary(mode),
      },
    },
  },

  MuiLink: {
    styleOverrides: {
      root: {
        color: colors.primary.main,
        textDecoration: 'none',
        transition: transitions.smooth,
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
        transition: transitions.smooth,
        '&.Mui-selected': {
          backgroundColor: alpha('#6366F1', mode === 'light' ? 0.08 : 0.12),
          color: mode === 'light' ? '#4F46E5' : '#A5B4FC',
          '&:hover': {
            backgroundColor: alpha('#6366F1', mode === 'light' ? 0.12 : 0.16),
          },
          '& .MuiListItemIcon-root': {
            color: mode === 'light' ? '#4F46E5' : '#A5B4FC',
          },
        },
      },
    },
  },

  MuiDialog: {
    styleOverrides: {
      paper: {
        borderRadius: br.xl,
        boxShadow: getShadow(mode, 'dialog'),
        '@media (max-width: 600px)': {
          margin: '16px',
          maxWidth: 'calc(100% - 32px)',
          maxHeight: 'calc(100% - 32px)',
        },
      },
    },
  },

  MuiTooltip: {
    styleOverrides: {
      tooltip: {
        borderRadius: br.sm,
        backgroundColor: mode === 'light' ? '#1E293B' : '#6366F1',
        color: mode === 'light' ? '#F1F5F9' : '#FFFFFF',
        fontSize: '0.75rem',
        padding: '6px 12px',
        boxShadow: getShadow(mode, 'sm'),
      },
      arrow: {
        color: mode === 'light' ? '#1E293B' : '#6366F1',
      },
    },
  },

  MuiTabs: {
    styleOverrides: {
      root: {
        borderBottom: `1px solid ${getBorder(mode)}`,
        marginBottom: { xs: 2, md: 3 },
        '& .MuiTab-root': {
          textTransform: 'none',
          fontWeight: 500,
          fontSize: '0.875rem',
          minHeight: 48,
          transition: transitions.smooth,
          '&.Mui-selected': {
            color: colors.primary.main,
            fontWeight: 600,
          },
        },
        '& .MuiTabs-indicator': {
          background: gradients.primaryHorizontal,
          height: 3,
          borderRadius: '3px 3px 0 0',
        },
      },
    },
  },

  MuiCheckbox: {
    styleOverrides: {
      root: {
        borderRadius: br.xs,
        transition: transitions.smooth,
      },
    },
  },

  MuiSwitch: {
    styleOverrides: {
      root: {
        transition: transitions.smooth,
      },
      track: {
        borderRadius: br.pill,
        backgroundColor: mode === 'light' ? 'rgba(0,0,0,0.12)' : 'rgba(255,255,255,0.12)',
      },
      thumb: {
        boxShadow: getShadow(mode, 'sm'),
      },
    },
  },

  MuiDivider: {
    styleOverrides: {
      root: {
        borderColor: getDivider(mode),
      },
    },
  },

  MuiAccordion: {
    styleOverrides: {
      root: {
        borderRadius: br.md,
        border: `1px solid ${getBorder(mode)}`,
        boxShadow: 'none',
        '&:before': {
          display: 'none',
        },
        '&.Mui-expanded': {
          margin: '0 0 8px',
        },
      },
    },
  },

  MuiAccordionSummary: {
    styleOverrides: {
      root: {
        borderRadius: br.md,
        padding: '0 16px',
        '&.Mui-expanded': {
          borderBottom: `1px solid ${getBorder(mode)}`,
        },
      },
    },
  },

  MuiAutocomplete: {
    styleOverrides: {
      paper: {
        borderRadius: br.md,
        boxShadow: getShadow(mode, 'lg'),
        marginTop: 4,
        border: `1px solid ${getBorder(mode)}`,
      },
      option: {
        fontSize: '0.875rem',
        borderRadius: br.xs,
        margin: '2px 4px',
        '&[aria-selected="true"]': {
          backgroundColor: alpha(colors.primary.main, 0.08),
        },
        '&[data-focus="true"]': {
          backgroundColor: alpha(colors.primary.main, 0.04),
        },
      },
      groupLabel: {
        fontWeight: 600,
        fontSize: '0.75rem',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        color: getTextSecondary(mode),
      },
    },
  },

  MuiMenu: {
    styleOverrides: {
      paper: {
        borderRadius: br.md,
        boxShadow: getShadow(mode, 'lg'),
        border: `1px solid ${getBorder(mode)}`,
      },
      list: {
        padding: 4,
      },
    },
  },

  MuiMenuItem: {
    styleOverrides: {
      root: {
        borderRadius: br.xs,
        fontSize: '0.875rem',
        margin: '2px 4px',
        padding: '8px 12px',
        minHeight: 0,
        '&.Mui-selected': {
          backgroundColor: alpha(colors.primary.main, 0.08),
          fontWeight: 600,
        },
      },
    },
  },

  MuiSnackbar: {
    styleOverrides: {
      root: {
        '& .MuiAlert-root': {
          boxShadow: getShadow(mode, 'lg'),
        },
      },
    },
  },

  MuiBackdrop: {
    styleOverrides: {
      root: {
        backdropFilter: 'blur(4px)',
        backgroundColor: alpha(mode === 'light' ? '#0F172A' : '#000000', 0.4),
      },
    },
  },

  MuiTab: {
    styleOverrides: {
      root: {
        textTransform: 'none',
        fontWeight: 500,
        fontSize: '0.875rem',
        minHeight: 48,
        transition: transitions.smooth,
        '&.Mui-selected': {
          color: colors.primary.main,
          fontWeight: 600,
        },
      },
    },
  },

  MuiTimeline: {
    styleOverrides: {
      root: {
        padding: 0,
      },
    },
  },

  MuiSpeedDial: {
    styleOverrides: {
      fab: {
        background: gradients.primary,
      },
    },
  },

  MuiAvatar: {
    styleOverrides: {
      root: {
        fontWeight: 600,
      },
      colorDefault: {
        backgroundColor: alpha(colors.primary.main, 0.15),
        color: colors.primary.main,
      },
    },
  },

  MuiBadge: {
    styleOverrides: {
      badge: {
        fontWeight: 600,
        fontSize: '0.625rem',
        minWidth: 18,
        height: 18,
      },
    },
  },

  MuiBreadcrumbs: {
    styleOverrides: {
      li: {
        fontSize: '0.8125rem',
      },
      separator: {
        color: getTextSecondary(mode),
      },
    },
  },

  MuiStepLabel: {
    styleOverrides: {
      label: {
        fontWeight: 500,
        fontSize: '0.875rem',
        '&.Mui-active': {
          fontWeight: 600,
          color: colors.primary.main,
        },
        '&.Mui-completed': {
          fontWeight: 600,
        },
      },
    },
  },

  MuiStepIcon: {
    styleOverrides: {
      root: {
        '&.Mui-active': {
          color: colors.primary.main,
        },
        '&.Mui-completed': {
          color: colors.success.main,
        },
      },
    },
  },

  MuiPaginationItem: {
    styleOverrides: {
      root: {
        borderRadius: br.sm,
        fontWeight: 500,
        fontSize: '0.8125rem',
        '&.Mui-selected': {
          backgroundColor: colors.primary.main,
          color: '#FFFFFF',
          '&:hover': {
            backgroundColor: colors.primary.dark,
          },
        },
      },
    },
  },

  MuiDialogTitle: {
    styleOverrides: {
      root: {
        fontSize: '1.125rem',
        fontWeight: 600,
        padding: '20px 24px 8px',
      },
    },
  },

  MuiDialogContent: {
    styleOverrides: {
      root: {
        padding: '8px 24px 20px',
      },
    },
  },

  MuiDialogActions: {
    styleOverrides: {
      root: {
        padding: '12px 24px 20px',
        gap: 8,
      },
    },
  },

  MuiTablePagination: {
    styleOverrides: {
      root: {
        fontSize: '0.8125rem',
      },
      toolbar: {
        minHeight: 52,
      },
    },
  },

  MuiToolbar: {
    styleOverrides: {
      root: {
        minHeight: 64,
        '@media (min-width: 600px)': {
          minHeight: 64,
        },
      },
    },
  },

  MuiList: {
    styleOverrides: {
      root: {
        padding: 0,
      },
    },
  },

  MuiListItemText: {
    styleOverrides: {
      primary: {
        fontSize: '0.875rem',
        fontWeight: 500,
      },
      secondary: {
        fontSize: '0.75rem',
      },
    },
  },

  MuiListItemIcon: {
    styleOverrides: {
      root: {
        minWidth: 36,
      },
    },
  },

  MuiInputBase: {
    styleOverrides: {
      input: {
        '&::placeholder': {
          color: getTextSecondary(mode),
          opacity: 0.6,
        },
      },
    },
  },

  MuiOutlinedInput: {
    styleOverrides: {
      notchedOutline: {
        borderColor: mode === 'light' ? 'rgba(0,0,0,0.12)' : 'rgba(255,255,255,0.12)',
      },
    },
  },

  RaCreate: {
    defaultProps: {
      sx: {
        backgroundColor: 'transparent',
        boxShadow: 'none',
      },
    },
    styleOverrides: {
      main: {
        backgroundColor: 'transparent',
        boxShadow: 'none',
        maxWidth: { xs: '100%', md: '900px' },
        margin: { xs: '8px', sm: '16px', md: '24px auto' },
      },
    },
  },

  RaList: {
    styleOverrides: {
      content: {
        maxWidth: '100%',
        overflow: 'auto',
      },
      main: {
        backgroundColor: 'transparent',
        boxShadow: 'none',
        '& .MuiCard-root': {
          border: 'none',
        },
      },
    },
  },

  RaEdit: {
    defaultProps: {
      sx: {
        backgroundColor: 'transparent',
        boxShadow: 'none',
      },
    },
    styleOverrides: {
      main: {
        backgroundColor: 'transparent',
        boxShadow: 'none',
        maxWidth: { xs: '100%', md: '900px' },
        margin: { xs: '8px', sm: '16px', md: '24px auto' },
      },
    },
  },

  RaShow: {
    defaultProps: {
      sx: {
        backgroundColor: 'transparent',
        boxShadow: 'none',
      },
    },
    styleOverrides: {
      main: {
        backgroundColor: 'transparent',
        boxShadow: 'none',
        maxWidth: { xs: '100%', md: '900px' },
        margin: { xs: '8px', sm: '16px', md: '24px auto' },
        mb: { xs: 10, sm: 11 },
        display: 'flex',
        flexDirection: 'column',
        '& > .RaTopToolbar-root': {
          order: -1,
          mb: { xs: 1, sm: 2 },
        },
      },
    },
  },

  RaFilterForm: {
    styleOverrides: {
      root: {
        backgroundColor: mode === 'light' ? alpha('#6366F1', 0.03) : alpha('#6366F1', 0.04),
        padding: { xs: 1.25, md: 1.5 },
        border: `1px solid ${alpha('#6366F1', mode === 'light' ? 0.12 : 0.2)}`,
        marginBottom: { xs: 1.5, md: 2 },
        display: 'flex',
        flexWrap: 'wrap',
        gap: { xs: 0.75, md: 1 },
        '& .MuiFormControl-root': {
          marginBottom: 0,
          minWidth: { xs: 140, sm: 180 },
        },
        '& .MuiInputBase-root': {
          fontSize: { xs: '0.75rem', sm: '0.8125rem' },
        },
        '& .MuiOutlinedInput-root': {
          backgroundColor: (t: { palette: { mode: string } }) =>
            t.palette.mode === 'light' ? '#ffffff' : '#1E293B',
          '&:hover': {
            '& fieldset': {
              borderColor: alpha('#6366F1', 0.4),
            },
          },
          '&.Mui-focused': {
            boxShadow: `0 0 0 3px ${alpha('#6366F1', 0.15)}`,
            '& fieldset': {
              borderColor: '#6366F1',
              borderWidth: '1.5px',
            },
          },
          '& input': {
            padding: { xs: '6px 10px', sm: '8px 12px' },
          },
        },
        '& .MuiSelect-select': {
          padding: { xs: '6px 10px', sm: '8px 12px' },
          minHeight: 0,
        },
        '& .MuiInputLabel-root': {
          fontSize: '0.75rem',
          marginBottom: '4px',
          color: (t: { palette: { mode: string } }) =>
            t.palette.mode === 'light' ? alpha('#6366F1', 0.7) : alpha('#6366F1', 0.6),
          '&.Mui-focused': {
            color: '#6366F1',
          },
        },
        '& .MuiSelect-icon': {
          color: '#6366F1',
        },
      },
    },
  },

  RaFilterFormInput: {
    styleOverrides: {
      root: {
        margin: 0,
        padding: 0,
        '& .MuiFormControl-root': {
          marginBottom: 0,
        },
        '&:first-of-type': {
          marginLeft: 0,
        },
      },
    },
  },

  RaSimpleForm: {
    styleOverrides: {
      root: {
        backgroundColor: mode === 'light' ? '#ffffff' : '#131C2E',
        padding: { xs: 2.5, sm: 3, md: 4 },
        border: `1px solid ${getBorder(mode)}`,
        '& .MuiFormControl-root': {
          marginBottom: { xs: 1.5, md: 2 },
        },
      },
    },
  },

  RaTabbedForm: {
    styleOverrides: {
      root: {
        backgroundColor: mode === 'light' ? '#ffffff' : '#131C2E',
        border: `1px solid ${getBorder(mode)}`,
      },
    },
  },

  RaToolbar: {
    styleOverrides: {
      root: {
        display: 'flex',
        justifyContent: 'flex-end',
        gap: spConfig.md,
        padding: { xs: 2, md: 2.5 },
        marginTop: { xs: 2, md: 3 },
        marginBottom: { xs: 8, sm: 9 },
        borderTop: `1px solid ${getDivider(mode)}`,
        backgroundColor: 'transparent',
        '& .MuiButton-root': {
          minWidth: { xs: '100px', sm: '120px' },
        },
      },
      mobileToolbar: {
        marginBottom: { xs: 8, sm: 9 },
      },
    },
    defaultProps: {
      sx: {
        display: 'flex',
        justifyContent: 'flex-end',
        gap: spConfig.md,
      },
    },
  },

  RaSaveButton: {
    styleOverrides: {
      root: {
        background: gradients.primary,
        borderRadius: br.md,
        textTransform: 'none',
        fontWeight: 600,
        padding: '10px 28px',
        transition: transitions.smooth,
        '&:hover': {
          background: gradients.primary,
          filter: 'brightness(1.08)',
          transform: 'translateY(-1px)',
        },
      },
    },
  },

  RaEditButton: {
    defaultProps: {
      size: 'small',
      label: '',
    },
    styleOverrides: {
      root: {
        minWidth: 0,
        width: 28,
        height: 28,
        borderRadius: '50%',
        padding: 0,
        transition: transitions.smooth,
        '& .MuiSvgIcon-root': {
          fontSize: 14,
        },
        '&:hover': {
          backgroundColor: alpha(colors.primary.main, 0.1),
        },
      },
    },
  },

  RaDeleteButton: {
    defaultProps: {
      size: 'small',
      label: '',
    },
    styleOverrides: {
      root: {
        minWidth: 0,
        width: 28,
        height: 28,
        borderRadius: '50%',
        padding: 0,
        textTransform: 'none',
        fontWeight: 500,
        transition: transitions.smooth,
        '& .MuiSvgIcon-root': {
          fontSize: 14,
        },
        '&:hover': {
          backgroundColor: alpha(colors.error.main, 0.1),
        },
      },
    },
  },

  RaLabeled: {
    styleOverrides: {
      root: {
        marginBottom: { xs: 2, md: 3 },
      },
    },
  },

  RaTextField: {
    styleOverrides: {
      root: {
        '& .MuiTypography-root:first-of-type': {
          color: getTextSecondary(mode),
          fontSize: '0.75rem',
          textTransform: 'uppercase',
          fontWeight: 600,
          letterSpacing: '0.05em',
          marginBottom: '4px',
        },
        '& .MuiTypography-root:last-child': {
          color: mode === 'light' ? colors.light.text.primary : colors.dark.text.primary,
          fontSize: '0.9375rem',
          fontWeight: 500,
        },
      },
    },
  },

  RaBreadcrumb: {
    styleOverrides: {
      root: {
        marginBottom: { xs: 1, md: 2 },
        '& .MuiTypography-root': {
          fontSize: '0.8125rem',
        },
      },
    },
  },

  RaTopToolbar: {
    styleOverrides: {
      root: {
        marginBottom: { xs: 2, md: 3 },
        display: 'flex',
        justifyContent: 'flex-end',
        gap: 1,
      },
    },
  },

  RaBulkActionsToolbar: {
    styleOverrides: {
      root: {
        backgroundColor: alpha(colors.primary.main, 0.06),
        borderRadius: br.md,
        padding: '8px 16px',
      },
    },
  },

  RaEmpty: {
    styleOverrides: {
      root: {
        padding: { xs: 4, md: 6 },
        textAlign: 'center',
        '& .MuiTypography-root': {
          color: getTextSecondary(mode),
        },
      },
    },
  },

  RaLoading: {
    styleOverrides: {
      root: {
        display: 'flex',
        justifyContent: 'center',
        padding: { xs: 4, md: 6 },
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
        color: getTextSecondary(mode),
      },
      button: typoConfig.button,
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
