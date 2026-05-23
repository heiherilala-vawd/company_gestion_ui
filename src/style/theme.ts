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
    borderRadius: br.xxl,
    boxShadow: 1,
  },
  floatingContainer: {
    borderRadius: br.xxl,
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
})

const commonComponentOverrides = (mode: 'light' | 'dark'): ThemeOptions['components'] => ({
  MuiCssBaseline: {
    styleOverrides: {
      body: {
        fontFamily: typoConfig.fontFamily,
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
      },
    },
  },

  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: br.lg,
        textTransform: 'none',
        fontWeight: 600,
        transition: transitions.default,
        padding: { xs: '10px 20px', sm: '12px 24px' },
        fontSize: { xs: '0.8125rem', sm: '0.875rem' },
        lineHeight: 1.4,
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: getShadow(mode, 'md'),
        },
        '&:active': {
          transform: 'translateY(0)',
        },
      },
      containedPrimary: {
        background: gradients.primary,
        boxShadow: `0 4px 14px ${alpha('#6CA568', 0.3)}`,
        '&:hover': {
          background: gradients.primary,
          filter: 'brightness(1.08)',
          boxShadow: `0 8px 25px ${alpha('#6CA568', 0.4)}`,
        },
      },
      containedSecondary: {
        background: gradients.secondary,
        '&:hover': {
          filter: 'brightness(1.08)',
        },
      },
      outlined: {
        borderColor: mode === 'light' ? 'rgba(0,0,0,0.12)' : 'rgba(255,255,255,0.12)',
        '&:hover': {
          borderColor: colors.primary.main,
          backgroundColor: alpha(colors.primary.main, 0.04),
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
        borderRadius: br.xxl,
        boxShadow: getShadow(mode, 'card'),
        transition: transitions.default,
        backgroundColor: mode === 'light' ? colors.light.background.paper : '#1E4038',
        border: `1px solid ${getBorder(mode)}`,
        '&:hover': {
          boxShadow: getShadow(mode, 'cardHover'),
          transform: 'translateY(-3px)',
        },
      },
    },
  },

  MuiPaper: {
    styleOverrides: {
      root: {
        borderRadius: br.lg,
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
        marginBottom: 0,
        width: '100%',
        '& .MuiOutlinedInput-root': {
          borderRadius: br.lg,
          transition: transitions.default,
          backgroundColor: getSubtleBg(mode),
          fontSize: { xs: '0.875rem', sm: '0.9375rem' },
          '&:hover': {
            backgroundColor: getSubtleBgHover(mode),
            '& fieldset': {
              borderColor: alpha(colors.primary.main, 0.4),
            },
          },
          '&.Mui-focused': {
            backgroundColor: mode === 'light' ? '#ffffff' : '#1E4038',
            boxShadow: `0 0 0 4px ${alpha('#6CA568', 0.15)}`,
            '& fieldset': {
              borderColor: '#6CA568',
              borderWidth: '1.5px',
            },
          },
          '& fieldset': {
            borderColor: mode === 'light' ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)',
            transition: transitions.default,
          },
          '& input': {
            padding: { xs: '12px 16px', sm: '14px 18px' },
          },
          '& textarea': {
            padding: { xs: '12px 16px', sm: '14px 18px' },
          },
        },
        '& .MuiInputLabel-root': {
          position: 'relative',
          transform: 'none',
          marginBottom: '8px',
          fontSize: '0.875rem',
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
        borderRadius: br.lg,
        backgroundColor: getSubtleBg(mode),
        transition: transitions.default,
        minHeight: 44,
        padding: { xs: '12px 16px', sm: '14px 18px' },
      },
    },
  },

  MuiFormControl: {
    styleOverrides: {
      root: {
        marginBottom: { xs: 2, md: 2.5 },
        width: '100%',
      },
    },
  },

  MuiFormLabel: {
    styleOverrides: {
      root: {
        fontSize: '0.875rem',
        fontWeight: 500,
        color: getTextSecondary(mode),
        marginBottom: '8px',
        '&.Mui-focused': {
          color: colors.primary.main,
        },
      },
    },
  },

  MuiTable: {
    styleOverrides: {
      root: {
        borderRadius: br.xxl,
        overflow: 'hidden',
      },
    },
  },

  MuiTableContainer: {
    styleOverrides: {
      root: {
        borderRadius: br.xxl,
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
          letterSpacing: '0.04em',
          color: getTextSecondary(mode),
          borderBottom: `2px solid ${getBorder(mode)}`,
          padding: { xs: '10px 16px', sm: '14px 20px' },
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
          padding: { xs: '10px 16px', sm: '14px 20px' },
          fontSize: { xs: '0.8125rem', sm: '0.875rem' },
          transition: transitions.default,
          color: mode === 'light' ? colors.light.text.primary : colors.dark.text.primary,
        },
        '& .MuiTableRow-root': {
          transition: transitions.default,
          '&:hover': {
            backgroundColor: alpha('#6CA568', mode === 'light' ? 0.03 : 0.05),
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
        borderRadius: br.xxl,
        border: `1px solid ${getBorder(mode)}`,
        boxShadow: getShadow(mode, 'card'),
        backgroundColor: mode === 'light' ? '#ffffff' : '#1E4038',
        '& .MuiDataGrid-columnHeaders': {
          backgroundColor: getSubtleBg(mode),
          borderRadius: `${br.xxl}px ${br.xxl}px 0 0`,
          borderBottom: `2px solid ${getBorder(mode)}`,
          '& .MuiDataGrid-columnHeader': {
            padding: { xs: '10px 16px', sm: '14px 20px' },
          },
          '& .MuiDataGrid-columnHeaderTitle': {
            fontWeight: 600,
            color: getTextSecondary(mode),
            fontSize: '0.75rem',
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
          },
        },
        '& .MuiDataGrid-cell': {
          borderBottom: `1px solid ${getBorder(mode)}`,
          padding: { xs: '10px 16px', sm: '14px 20px' },
          fontSize: '0.875rem',
        },
        '& .MuiDataGrid-row': {
          transition: transitions.default,
          '&:hover': {
            backgroundColor: alpha('#6CA568', mode === 'light' ? 0.03 : 0.05),
          },
          '&.Mui-selected': {
            backgroundColor: alpha('#6CA568', mode === 'light' ? 0.06 : 0.08),
            '&:hover': {
              backgroundColor: alpha('#6CA568', mode === 'light' ? 0.1 : 0.12),
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
        transition: transitions.default,
        height: 28,
        fontSize: '0.8125rem',
      },
      colorPrimary: {
        backgroundColor: alpha(colors.primary.main, 0.12),
        color: mode === 'light' ? '#4E8B56' : '#A8D5A2',
      },
    },
  },

  MuiAlert: {
    styleOverrides: {
      root: {
        borderRadius: br.lg,
        border: 'none',
        fontSize: '0.875rem',
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
        backgroundColor: mode === 'light' ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.05)',
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
        backgroundColor: mode === 'light' ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.04)',
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
          backgroundColor: alpha('#6CA568', 0.08),
          color: mode === 'light' ? '#4E8B56' : '#A8D5A2',
          '&:hover': {
            backgroundColor: alpha('#6CA568', 0.12),
          },
          '& .MuiListItemIcon-root': {
            color: mode === 'light' ? '#4E8B56' : '#A8D5A2',
          },
        },
      },
    },
  },

  MuiDialog: {
    styleOverrides: {
      paper: {
        borderRadius: br.xxl,
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
        backgroundColor: mode === 'light' ? '#1A2920' : '#6CA568',
        color: mode === 'light' ? '#F3F6ED' : '#071F16',
        fontSize: '0.75rem',
        padding: '6px 12px',
        boxShadow: getShadow(mode, 'sm'),
      },
      arrow: {
        color: mode === 'light' ? '#1A2920' : '#6CA568',
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
          transition: transitions.default,
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
        borderRadius: br.sm,
        transition: transitions.default,
      },
    },
  },

  MuiSwitch: {
    styleOverrides: {
      root: {
        transition: transitions.default,
      },
      track: {
        borderRadius: br.pill,
        backgroundColor: mode === 'light' ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.15)',
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
        borderRadius: br.lg,
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
        borderRadius: br.lg,
        padding: '0 16px',
        '&.Mui-expanded': {
          borderBottom: `1px solid ${getBorder(mode)}`,
        },
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
      },
    },
  },

  RaSimpleForm: {
    styleOverrides: {
      root: {
        backgroundColor: mode === 'light' ? '#ffffff' : '#1E4038',
        borderRadius: br.xxl,
        padding: { xs: 2.5, sm: 3, md: 4 },
        boxShadow: getShadow(mode, 'card'),
        border: `1px solid ${getBorder(mode)}`,
        '& .MuiFormControl-root': {
          marginBottom: { xs: 2, md: 2.5 },
        },
      },
    },
  },

  RaTabbedForm: {
    styleOverrides: {
      root: {
        backgroundColor: mode === 'light' ? '#ffffff' : '#1E4038',
        borderRadius: br.xxl,
        boxShadow: getShadow(mode, 'card'),
        border: `1px solid ${getBorder(mode)}`,
        overflow: 'hidden',
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
        borderTop: `1px solid ${getDivider(mode)}`,
        backgroundColor: 'transparent',
        '& .MuiButton-root': {
          minWidth: { xs: '100px', sm: '120px' },
        },
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
        borderRadius: br.lg,
        textTransform: 'none',
        fontWeight: 600,
        padding: '10px 28px',
        boxShadow: `0 4px 14px ${alpha('#6CA568', 0.3)}`,
        transition: transitions.default,
        '&:hover': {
          background: gradients.primary,
          filter: 'brightness(1.08)',
          boxShadow: `0 8px 25px ${alpha('#6CA568', 0.4)}`,
          transform: 'translateY(-2px)',
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
        transition: transitions.default,
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
        transition: transitions.default,
        '& .MuiSvgIcon-root': {
          fontSize: 14,
        },
        '&:hover': {
          backgroundColor: alpha(colors.error.main, 0.1),
        },
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
      },
    },
  },

  RaFilterForm: {
    styleOverrides: {
      root: {
        backgroundColor: mode === 'light' ? '#ffffff' : '#1E4038',
        borderRadius: br.xxl,
        padding: { xs: 2, md: 3 },
        boxShadow: getShadow(mode, 'card'),
        border: `1px solid ${getBorder(mode)}`,
        marginBottom: { xs: 2, md: 3 },
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
          fontWeight: 500,
          letterSpacing: '0.04em',
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
