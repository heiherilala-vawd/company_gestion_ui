// theme.ts - Version améliorée avec surcharges React Admin complètes

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
      getShadow(theme.palette.mode as 'light' | 'dark', 'sm'),
    m: { xs: 1, md: 2 },
    p: { xs: 2, md: 3 },
  },
  // Grilles responsives pour formulaires
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
  // Grille avec unités intégrées
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
  // Navigation entre étapes
  navigationButtons: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    mt: { xs: 3, md: 4 },
    pt: { xs: 2, md: 3 },
    borderTop: (theme: { palette: { mode: string } }) =>
      `1px solid ${getDivider(theme.palette.mode as 'light' | 'dark')}`,
  },
  // Section de formulaire
  formSection: {
    mb: { xs: 3, md: 4 },
  },
  formSectionTitle: {
    fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' },
    fontWeight: 600,
    mb: { xs: 2, md: 3 },
    pb: 1,
    borderBottom: (theme: { palette: { mode: string } }) =>
      `1px solid ${getDivider(theme.palette.mode as 'light' | 'dark')}`,
  },
  // Input avec unité
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
      },
    },
  },

  // ==================== BOUTONS ====================
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: br.md,
        textTransform: 'none',
        fontWeight: 500,
        transition: transitions.default,
        padding: { xs: '8px 16px', sm: '8px 20px' },
        fontSize: { xs: '0.8125rem', sm: '0.875rem' },
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
      // Bouton "Back" secondaire
      textSecondary: {
        color: getTextSecondary(mode),
        '&:hover': {
          backgroundColor: getSubtleBgHover(mode),
        },
      },
    },
  },

  // ==================== CARTES ====================
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: br.lg,
        boxShadow: getShadow(mode, 'sm'),
        transition: transitions.default,
        backgroundColor:
          mode === 'light' ? colors.light.background.paper : colors.dark.background.paper,
        border: `1px solid ${getBorder(mode)}`,
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

  // ==================== CHAMPS DE FORMULAIRE ====================
  MuiTextField: {
    styleOverrides: {
      root: {
        marginBottom: 0,
        width: '100%',
        '& .MuiOutlinedInput-root': {
          borderRadius: br.md,
          transition: transitions.default,
          backgroundColor: getSubtleBg(mode),
          fontSize: { xs: '0.875rem', sm: '0.9375rem' },
          '&:hover': {
            backgroundColor: getSubtleBgHover(mode),
            '& fieldset': {
              borderColor: alpha(colors.primary.main, 0.5),
            },
          },
          '&.Mui-focused': {
            backgroundColor: mode === 'light' ? '#ffffff' : colors.dark.background.paper,
            boxShadow: `0 0 0 3px ${alpha(colors.primary.main, 0.12)}`,
            '& fieldset': {
              borderColor: colors.primary.main,
            },
          },
          '& fieldset': {
            borderColor: mode === 'light' ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)',
            transition: transitions.default,
          },
          '& input': {
            padding: { xs: '10px 14px', sm: '12px 16px' },
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
        borderRadius: br.md,
        backgroundColor: getSubtleBg(mode),
        transition: transitions.default,
        minHeight: 36,
        padding: { xs: '10px 14px', sm: '12px 16px' },
      },
    },
  },

  MuiFormControl: {
    styleOverrides: {
      root: {
        marginBottom: { xs: 2, md: 3 },
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

  // ==================== TABLEAUX / DATAGRID ====================
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
        border: `1px solid ${getBorder(mode)}`,
        boxShadow: getShadow(mode, 'sm'),
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
          letterSpacing: '0.5px',
          color: getTextSecondary(mode),
          borderBottom: `2px solid ${getBorder(mode)}`,
          padding: { xs: '8px 12px', sm: '12px 16px' },
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
          padding: { xs: '8px 12px', sm: '12px 16px' },
          fontSize: { xs: '0.8125rem', sm: '0.875rem' },
          transition: transitions.default,
          color: mode === 'light' ? colors.light.text.primary : colors.dark.text.primary,
        },
        '& .MuiTableRow-root': {
          transition: transitions.default,
          '&:hover': {
            backgroundColor: alpha(colors.primary.main, mode === 'light' ? 0.04 : 0.08),
          },
          '&:last-child .MuiTableCell-body': {
            borderBottom: 'none',
          },
        },
      },
    },
  },

  // ==================== DATAGRID (React Admin) ====================
  MuiDataGrid: {
    styleOverrides: {
      root: {
        borderRadius: br.lg,
        border: `1px solid ${getBorder(mode)}`,
        boxShadow: getShadow(mode, 'sm'),
        backgroundColor: mode === 'light' ? '#ffffff' : colors.dark.background.paper,
        '& .MuiDataGrid-columnHeaders': {
          backgroundColor: getSubtleBg(mode),
          borderRadius: `${br.lg}px ${br.lg}px 0 0`,
          borderBottom: `2px solid ${getBorder(mode)}`,
          '& .MuiDataGrid-columnHeader': {
            padding: { xs: '8px 12px', sm: '12px 16px' },
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
          padding: { xs: '8px 12px', sm: '12px 16px' },
          fontSize: '0.875rem',
        },
        '& .MuiDataGrid-row': {
          transition: transitions.default,
          '&:hover': {
            backgroundColor: alpha(colors.primary.main, mode === 'light' ? 0.04 : 0.08),
          },
          '&.Mui-selected': {
            backgroundColor: alpha(colors.primary.main, mode === 'light' ? 0.08 : 0.12),
            '&:hover': {
              backgroundColor: alpha(colors.primary.main, mode === 'light' ? 0.12 : 0.16),
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

  // ==================== CHIPS & ALERTES ====================
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

  // ==================== PROGRESS & SKELETON ====================
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

  MuiSkeleton: {
    styleOverrides: {
      root: {
        backgroundColor: mode === 'light' ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.06)',
        borderRadius: br.sm,
      },
    },
  },

  // ==================== TYPOGRAPHIE ====================
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

  // ==================== SIDEBAR & NAVIGATION ====================
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

  // ==================== DIALOG ====================
  MuiDialog: {
    styleOverrides: {
      paper: {
        borderRadius: br.xl,
        boxShadow:
          mode === 'light' ? '0 20px 60px rgba(0,0,0,0.15)' : '0 20px 60px rgba(0,0,0,0.5)',
        '@media (max-width: 600px)': {
          margin: '16px',
          maxWidth: 'calc(100% - 32px)',
          maxHeight: 'calc(100% - 32px)',
        },
      },
    },
  },

  // ==================== TOOLTIP ====================
  MuiTooltip: {
    styleOverrides: {
      tooltip: {
        borderRadius: br.sm,
        backgroundColor: mode === 'light' ? colors.light.text.primary : colors.dark.text.primary,
        color: mode === 'light' ? '#ffffff' : colors.light.text.primary,
        fontSize: '0.75rem',
        padding: '6px 12px',
        boxShadow: getShadow(mode, 'sm'),
      },
      arrow: {
        color: mode === 'light' ? colors.light.text.primary : colors.dark.text.primary,
      },
    },
  },

  // ==================== TABS (pour TabbedForm) ====================
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

  // ==================== STEPPER (pour formulaire en étapes) ====================
  MuiStepper: {
    styleOverrides: {
      root: {
        padding: { xs: 2, md: 3 },
        marginBottom: { xs: 2, md: 3 },
      },
    },
  },

  MuiStepLabel: {
    styleOverrides: {
      label: {
        fontSize: '0.875rem',
        fontWeight: 500,
        '&.Mui-active': {
          fontWeight: 600,
          color: colors.primary.main,
        },
        '&.Mui-completed': {
          color: colors.success.main,
        },
      },
    },
  },

  // ==================== REACT ADMIN - SURCHARGES SPÉCIFIQUES ====================

  // Container principal des pages Create/Edit/Show
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

  // SimpleForm / TabbedForm
  RaSimpleForm: {
    styleOverrides: {
      root: {
        backgroundColor: mode === 'light' ? '#ffffff' : colors.dark.background.paper,
        borderRadius: br.lg,
        padding: { xs: 2, sm: 3, md: 4 },
        boxShadow: getShadow(mode, 'sm'),
        border: `1px solid ${getBorder(mode)}`,
        '& .MuiFormControl-root': {
          marginBottom: { xs: 2, md: 3 },
        },
      },
    },
  },

  RaTabbedForm: {
    styleOverrides: {
      root: {
        backgroundColor: mode === 'light' ? '#ffffff' : colors.dark.background.paper,
        borderRadius: br.lg,
        boxShadow: getShadow(mode, 'sm'),
        border: `1px solid ${getBorder(mode)}`,
        overflow: 'hidden',
      },
    },
  },

  // Toolbar (boutons Save/Delete en bas du formulaire)
  RaToolbar: {
    styleOverrides: {
      root: {
        display: 'flex',
        justifyContent: 'flex-end',
        gap: spConfig.md,
        padding: { xs: 2, md: 3 },
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

  // SaveButton
  RaSaveButton: {
    styleOverrides: {
      root: {
        background: gradients.primary,
        borderRadius: br.md,
        textTransform: 'none',
        fontWeight: 500,
        padding: '10px 24px',
        boxShadow: getShadow(mode, 'primary'),
        transition: transitions.default,
        '&:hover': {
          background: gradients.primary,
          filter: 'brightness(1.1)',
          boxShadow: getShadow(mode, 'primaryHover'),
        },
      },
    },
  },

  // DeleteButton
  RaDeleteButton: {
    styleOverrides: {
      root: {
        borderRadius: br.md,
        textTransform: 'none',
        fontWeight: 500,
        transition: transitions.default,
        '&:hover': {
          backgroundColor: alpha(colors.error.main, 0.1),
        },
      },
    },
  },

  // List / Datagrid container
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

  // Filter form dans la liste
  RaFilterForm: {
    styleOverrides: {
      root: {
        backgroundColor: mode === 'light' ? '#ffffff' : colors.dark.background.paper,
        borderRadius: br.lg,
        padding: { xs: 2, md: 3 },
        boxShadow: getShadow(mode, 'sm'),
        border: `1px solid ${getBorder(mode)}`,
        marginBottom: { xs: 2, md: 3 },
      },
    },
  },

  // Show component - champs
  RaLabeled: {
    styleOverrides: {
      root: {
        marginBottom: { xs: 2, md: 3 },
      },
    },
  },

  // Surcharge pour les champs en mode Show
  RaTextField: {
    styleOverrides: {
      root: {
        '& .MuiTypography-root:first-of-type': {
          color: getTextSecondary(mode),
          fontSize: '0.75rem',
          textTransform: 'uppercase',
          fontWeight: 500,
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

  // Breadcrumb
  RaBreadcrumb: {
    styleOverrides: {
      root: {
        marginBottom: { xs: 1, md: 2 },
        '& .MuiTypography-root': {
          fontSize: '0.875rem',
        },
      },
    },
  },

  // TopToolbar (bouton Create en haut de la liste)
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

  // BulkActionsBar
  RaBulkActionsToolbar: {
    styleOverrides: {
      root: {
        backgroundColor: alpha(colors.primary.main, 0.08),
        borderRadius: br.md,
        padding: '8px 16px',
      },
    },
  },

  // Empty state
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

  // Loading indicator
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
