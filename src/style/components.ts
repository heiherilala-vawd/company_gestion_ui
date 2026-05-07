import { SxProps, Theme } from '@mui/material'
import { alpha } from '@mui/material/styles'
import {
  colors,
  borderRadius as br,
  transitions,
  getShadow,
  gradients,
  getDivider,
  getSubtleBg,
  getSubtleBgHover,
  getPrimaryBg,
  getPrimaryBgHover,
  getTableHeader,
  getBorder,
} from './themeConfig'

export const appBarStyles = {
  selectorBox: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    backgroundColor: (theme: Theme) => alpha(theme.palette.primary.main, 0.1),
    borderRadius: br.xs,
    px: 1,
    py: 0.5,
  } as const,

  selectorLabel: {
    color: 'primary.main',
    fontWeight: 600,
    fontSize: 11,
    whiteSpace: 'nowrap',
    display: { xs: 'none', sm: 'block' },
  } as const,

  selectorInput: {
    color: 'primary.main',
    fontSize: 12,
  } as const,

  container: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
  } as const,

  appBar: {
    backgroundColor: 'background.paper',
    color: 'text.primary',
    boxShadow: (theme: Theme) => getShadow(theme.palette.mode as 'light' | 'dark', 'sm'),
    borderBottom: (theme: Theme) =>
      `1px solid ${getDivider(theme.palette.mode as 'light' | 'dark')}`,
    backdropFilter: 'blur(12px)',
    backgroundImage: 'none',
    borderRadius: { xs: 0, md: 0 },
    transition: transitions.default,
  } as const,

  iconButton: {
    color: 'text.primary',
    backgroundColor: (theme: Theme) => getPrimaryBg(theme.palette.mode as 'light' | 'dark'),
    borderRadius: br.xs,
    transition: transitions.default,
    '&:hover': {
      backgroundColor: (theme: Theme) => getPrimaryBgHover(theme.palette.mode as 'light' | 'dark'),
      transform: 'translateY(-1px)',
    },
  } as const,
}

export const menuStyles = {
  divider: {
    my: 1,
    mx: 2,
    borderBottom: '1px solid',
    borderColor: 'divider',
  },
  item: {
    py: 0.5,
  },
  nested: {
    pl: 4,
    py: 0.5,
  },

  container: {
    height: '100%',
    background: (theme: Theme) =>
      theme.palette.mode === 'light' ? '#f8fafc' : gradients.sidebarDark,
    borderRadius: { xs: 0, md: '0 16px 16px 0' },
    borderRight: (theme: Theme) =>
      theme.palette.mode === 'light' ? '1px solid rgba(0,0,0,0.06)' : 'none',
    p: 2,
    overflowY: 'auto',
    overflowX: 'hidden',
    '&::-webkit-scrollbar': {
      width: '4px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: (theme: Theme) =>
        theme.palette.mode === 'light' ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.2)',
      borderRadius: '4px',
    },
  } as const,

  headerBox: {
    mb: 3,
    pb: 2,
    borderBottom: (theme: Theme) =>
      `1px solid ${theme.palette.mode === 'light' ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.15)'}`,
  } as const,

  appTitle: {
    color: (theme: Theme) => (theme.palette.mode === 'light' ? '#1a1a2e' : '#fff'),
    fontWeight: 700,
    fontSize: '1.25rem',
    letterSpacing: '-0.025em',
  } as const,

  appSubtitle: {
    color: (theme: Theme) =>
      theme.palette.mode === 'light' ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.7)',
    fontSize: '0.75rem',
  } as const,

  sectionHeaderBlue: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    color: (theme: Theme) => (theme.palette.mode === 'light' ? '#1a1a2e' : '#fff'),
    fontSize: '0.75rem',
    fontWeight: 700,
    letterSpacing: '1.5px',
    py: 0.75,
    px: 2,
    mb: 0.75,
    mx: 1,
    mt: 1.5,
    borderLeft: '3px solid #4285F4',
    backgroundColor: (theme: Theme) =>
      theme.palette.mode === 'light' ? 'rgba(66, 133, 244, 0.08)' : 'rgba(66, 133, 244, 0.15)',
    borderRadius: `0 ${br.xs}px ${br.xs}px 0`,
  } as const,

  sectionHeaderGreen: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    color: (theme: Theme) => (theme.palette.mode === 'light' ? '#1a1a2e' : '#fff'),
    fontSize: '0.75rem',
    fontWeight: 700,
    letterSpacing: '1.5px',
    py: 0.75,
    px: 2,
    mb: 0.75,
    mx: 1,
    mt: 1.5,
    borderLeft: '3px solid #34A853',
    backgroundColor: (theme: Theme) =>
      theme.palette.mode === 'light' ? 'rgba(52, 168, 83, 0.08)' : 'rgba(52, 168, 83, 0.15)',
    borderRadius: `0 ${br.xs}px ${br.xs}px 0`,
  } as const,

  sectionHeaderRed: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    color: (theme: Theme) => (theme.palette.mode === 'light' ? '#1a1a2e' : '#fff'),
    fontSize: '0.75rem',
    fontWeight: 700,
    letterSpacing: '1.5px',
    py: 0.75,
    px: 2,
    mb: 0.75,
    mx: 1,
    mt: 1.5,
    borderLeft: '3px solid #EA4335',
    backgroundColor: (theme: Theme) =>
      theme.palette.mode === 'light' ? 'rgba(234, 67, 53, 0.08)' : 'rgba(234, 67, 53, 0.15)',
    borderRadius: `0 ${br.xs}px ${br.xs}px 0`,
  } as const,

  listItem: {
    borderRadius: br.sm,
    mx: 1,
    mb: 0.5,
    color: (theme: Theme) => (theme.palette.mode === 'light' ? '#374151' : '#fff'),
    transition: transitions.default,
    '&.Mui-selected': {
      backgroundColor: (theme: Theme) =>
        theme.palette.mode === 'light' ? 'rgba(66, 133, 244, 0.1)' : 'rgba(66, 133, 244, 0.2)',
      color: (theme: Theme) => (theme.palette.mode === 'light' ? '#4285F4' : '#fff'),
      '& .MuiListItemIcon-root': {
        color: (theme: Theme) => (theme.palette.mode === 'light' ? '#4285F4' : '#fff'),
      },
      '&:hover': {
        backgroundColor: (theme: Theme) =>
          theme.palette.mode === 'light' ? 'rgba(66, 133, 244, 0.15)' : 'rgba(66, 133, 244, 0.25)',
      },
    },
    '&:hover': {
      backgroundColor: (theme: Theme) =>
        theme.palette.mode === 'light' ? 'rgba(0,0,0,0.04)' : 'rgba(66, 133, 244, 0.1)',
      transform: 'translateX(4px)',
    },
  } as const,

  collapsibleButton: {
    borderRadius: br.sm,
    mx: 1,
    mb: 0.5,
    color: (theme: Theme) => (theme.palette.mode === 'light' ? '#374151' : '#fff'),
    transition: transitions.default,
    '&:hover': {
      backgroundColor: (theme: Theme) =>
        theme.palette.mode === 'light' ? 'rgba(0,0,0,0.04)' : 'rgba(66, 133, 244, 0.1)',
    },
  } as const,

  listItemIcon: {
    minWidth: 40,
    color: 'inherit',
  } as const,

  listItemText: {
    fontSize: '0.875rem',
    fontWeight: 500,
  } as const,
}

export const formStyles = {
  input: {
    fontSize: 12,
  } as const,
  label: {
    fontSize: 12,
  } as const,
  select: {
    fontSize: 12,
    height: 36,
  } as const,
  container: {
    minWidth: 150,
    maxWidth: 200,
    backgroundColor: 'background.paper',
  } as const,
  wrapper: {
    minWidth: 120,
    maxWidth: 160,
    flexGrow: 1,
  } as const,
  selectorBox: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: (theme: Theme) => alpha(theme.palette.primary.main, 0.08),
    borderRadius: br.sm,
    px: 1,
    py: 0.25,
    gap: 0.5,
    transition: transitions.default,
    '&:hover': {
      backgroundColor: (theme: Theme) => alpha(theme.palette.primary.main, 0.12),
    },
  } as const,
  selectorIcon: {
    display: 'flex',
    alignItems: 'center',
    color: 'primary.main',
    fontSize: 18,
  } as const,
  selectorLabel: {
    color: 'primary.main',
    fontWeight: 600,
    fontSize: 11,
    whiteSpace: 'nowrap',
    display: { xs: 'none', sm: 'block' },
  } as const,
  selectorWrapper: {
    minWidth: { xs: 40, sm: 100 },
    maxWidth: { xs: 80, sm: 160 },
    flexGrow: 1,
    '& .MuiSelect-select': {
      py: { xs: 0.5, sm: 0.5 },
      fontSize: { xs: 11, sm: 12 },
    },
  } as const,
  selectorInput: {
    fontSize: 12,
  } as const,

  page: {
    '& .RaCreate-main, & .RaEdit-main': {
      backgroundColor: 'transparent',
      boxShadow: 'none',
    },
  } as const,

  card: {
    borderRadius: br.lg,
    boxShadow: (theme: Theme) => getShadow(theme.palette.mode as 'light' | 'dark', 'sm'),
    border: (theme: Theme) => `1px solid ${getDivider(theme.palette.mode as 'light' | 'dark')}`,
    overflow: 'hidden',
  } as const,

  titleBox: {
    p: 3,
    borderBottom: (theme: Theme) =>
      `1px solid ${getDivider(theme.palette.mode as 'light' | 'dark')}`,
    backgroundColor: (theme: Theme) => getSubtleBg(theme.palette.mode as 'light' | 'dark'),
  } as const,

  titleText: {
    fontWeight: 600,
  } as const,

  cardContent: {
    p: { xs: 2, md: 3 },
  } as const,

  simpleForm: {
    '& .RaSimpleForm-form': {
      gap: 2,
    },
  } as const,

  textInputRoot: {
    '& .MuiFormControl-root': {
      backgroundColor: (theme: Theme) => getSubtleBg(theme.palette.mode as 'light' | 'dark'),
      borderRadius: br.sm,
      transition: transitions.default,
      '&:hover': {
        backgroundColor: (theme: Theme) => getSubtleBgHover(theme.palette.mode as 'light' | 'dark'),
      },
    },
  } as const,

  inputRoot: {
    '& .MuiFormControl-root': {
      borderRadius: br.sm,
    },
  } as const,

  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 2,
    p: 2,
    borderTop: (theme: Theme) => `1px solid ${getDivider(theme.palette.mode as 'light' | 'dark')}`,
    backgroundColor: (theme: Theme) => getSubtleBg(theme.palette.mode as 'light' | 'dark'),
  } as const,

  cancelButton: {
    borderRadius: br.sm,
    textTransform: 'none',
    fontWeight: 500,
  } as const,

  saveButton: {
    borderRadius: br.sm,
    textTransform: 'none',
    fontWeight: 500,
    background: gradients.primary,
    '&:hover': {
      background: gradients.primary,
      filter: 'brightness(1.1)',
    },
  } as const,

  deleteButton: {
    borderRadius: br.sm,
    textTransform: 'none',
    fontWeight: 500,
  } as const,
}

export const datagridStyles = {
  container: {
    '& .MuiDataGrid-root': {
      border: 'none',
    },
    '& .MuiDataGrid-cell': {
      fontSize: '0.875rem',
    },
    '& .MuiDataGrid-columnHeaders': {
      backgroundColor: (theme: Theme) => getTableHeader(theme.palette.mode as 'light' | 'dark'),
    },
    '& .MuiDataGrid-columnHeaderTitle': {
      fontWeight: 600,
      fontSize: '0.75rem',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
    },
  } as const,
  cell: {
    fontSize: '0.875rem',
  } as const,
  header: {
    fontWeight: 600,
    backgroundColor: (theme: Theme) => getTableHeader(theme.palette.mode as 'light' | 'dark'),
  } as const,

  responsive: {
    borderRadius: br.md,
    overflow: 'hidden',
    '& .RaDatagrid-root': {
      borderRadius: br.md,
    },
    '& .RaDatagrid-header': {
      backgroundColor: (theme: Theme) => getTableHeader(theme.palette.mode as 'light' | 'dark'),
    },
    '& .RaDatagrid-row:hover': {
      backgroundColor: (theme: Theme) => getPrimaryBg(theme.palette.mode as 'light' | 'dark'),
    },
    '& .RaDatagrid-row': {
      transition: transitions.default,
    },
  } as const,
}

export const listFilters = [
  { source: 'description', label: 'Recherche', alwaysOn: true },
  { source: 'status', label: 'Statut' },
  { source: 'job_id', label: 'Chantier' },
  { source: 'name', label: 'Nom' },
]

export const buttonSizes = {
  small: {
    py: 0.5,
    fontSize: '0.75rem',
  },
  medium: {
    py: 1,
    fontSize: '0.875rem',
  },
  large: {
    py: 1.5,
    fontSize: '1rem',
  },
}

export const cardSizes = {
  small: { p: 1 },
  medium: { p: 2 },
  large: { p: 3 },
}

export const showStyles = {
  page: {
    '& .RaShow-main': {
      backgroundColor: 'transparent',
      boxShadow: 'none',
    },
  } as const,

  card: {
    borderRadius: br.lg,
    boxShadow: (theme: Theme) => getShadow(theme.palette.mode as 'light' | 'dark', 'sm'),
    border: (theme: Theme) => `1px solid ${getDivider(theme.palette.mode as 'light' | 'dark')}`,
    overflow: 'hidden',
  } as const,

  titleBox: {
    p: 3,
    borderBottom: (theme: Theme) =>
      `1px solid ${getDivider(theme.palette.mode as 'light' | 'dark')}`,
    backgroundColor: (theme: Theme) => getSubtleBg(theme.palette.mode as 'light' | 'dark'),
  } as const,

  titleText: {
    fontWeight: 600,
  } as const,

  cardContent: {
    p: { xs: 2, md: 3 },
  } as const,

  tabbedLayout: {
    '& .RaTabbedShowLayout-root': {
      borderRadius: br.lg,
      overflow: 'hidden',
    },
    '& .RaTabbedShowLayout-tabs': {
      backgroundColor: (theme: Theme) => getSubtleBg(theme.palette.mode as 'light' | 'dark'),
      borderBottom: (theme: Theme) =>
        `1px solid ${getDivider(theme.palette.mode as 'light' | 'dark')}`,
    },
  } as const,

  tab: {
    fontWeight: 500,
    textTransform: 'none' as const,
    fontSize: '0.875rem',
  } as const,

  referenceManyField: {
    '& .RaReferenceManyField-root': {
      borderRadius: br.md,
      overflow: 'hidden',
    },
  } as const,

  datagrid: {
    borderRadius: br.md,
    '& .RaDatagrid-row:hover': {
      backgroundColor: (theme: Theme) =>
        alpha(colors.primary.main, theme.palette.mode === 'light' ? 0.04 : 0.08),
    },
  } as const,

  infoCard: {
    borderRadius: br.md,
    mb: 2,
    boxShadow: 'none',
    border: (theme: Theme) => `1px solid ${getDivider(theme.palette.mode as 'light' | 'dark')}`,
  } as const,

  infoCardTitleBox: {
    p: 2,
    borderBottom: (theme: Theme) =>
      `1px solid ${getDivider(theme.palette.mode as 'light' | 'dark')}`,
    backgroundColor: (theme: Theme) => getSubtleBg(theme.palette.mode as 'light' | 'dark'),
  } as const,

  infoCardTitle: {
    fontWeight: 600,
    fontSize: '0.875rem',
  } as const,

  infoCardContent: {
    p: 2,
  } as const,

  fieldRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    py: 1.5,
    borderBottom: (theme: Theme) =>
      `1px solid ${getDivider(theme.palette.mode as 'light' | 'dark')}`,
    '&:last-child': {
      borderBottom: 'none',
    },
  } as const,

  fieldLabel: {
    color: 'text.secondary',
    fontWeight: 500,
  } as const,

  fieldValue: {
    fontWeight: 500,
  } as const,
}

export const homePageStyles = {
  container: {
    p: { xs: 2, sm: 4 },
    width: '100%',
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  } as const,

  welcomeBox: {
    textAlign: 'center',
    mb: 6,
    p: { xs: 3, sm: 4 },
    borderRadius: br.lg,
    backgroundColor: (theme: Theme) =>
      `rgba(255, 90, 60, ${theme.palette.mode === 'light' ? '0.02' : '0.04'})`,
    border: (theme: Theme) =>
      `1px solid rgba(255, 90, 60, ${theme.palette.mode === 'light' ? '0.1' : '0.15'})`,
    maxWidth: 600,
    width: '100%',
  } as const,

  title: {
    mb: 1,
    fontWeight: 700,
    background: gradients.primary,
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    letterSpacing: '-0.025em',
  } as const,

  subtitle: {
    color: 'text.secondary',
    fontWeight: 400,
  } as const,

  sectionContainer: {
    width: '100%',
    maxWidth: 900,
  } as const,

  sectionHeader: {
    mb: 3,
    textAlign: 'center',
    color: 'text.secondary',
    fontWeight: 600,
    fontSize: '0.875rem',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
  } as const,

  gridContainer: {
    mb: 4,
    justifyContent: 'center',
  } as const,

  gridItem: {
    display: 'flex',
  } as const,

  actionButton: {
    height: { xs: 120, sm: 140 },
    minWidth: 140,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 1,
    py: 2,
    fontSize: { xs: '0.8rem', sm: '0.9rem' },
    fontWeight: 600,
    background: gradients.primary,
    borderRadius: br.md,
    textTransform: 'none',
    boxShadow: (theme: Theme) => getShadow(theme.palette.mode as 'light' | 'dark', 'primary'),
    transition: transitions.default,
    '&:hover': {
      background: gradients.primary,
      transform: 'translateY(-4px)',
      boxShadow: (theme: Theme) =>
        getShadow(theme.palette.mode as 'light' | 'dark', 'primaryHover'),
      filter: 'brightness(1.1)',
    },
  } as const,

  actionButtonRed: {
    height: { xs: 120, sm: 140 },
    minWidth: 140,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 1,
    py: 2,
    fontSize: { xs: '0.8rem', sm: '0.9rem' },
    fontWeight: 600,
    background: gradients.secondary,
    borderRadius: br.md,
    textTransform: 'none',
    boxShadow: (theme: Theme) =>
      theme.palette.mode === 'light'
        ? '0 4px 12px rgba(234, 67, 53, 0.25)'
        : '0 4px 12px rgba(234, 67, 53, 0.2)',
    transition: transitions.default,
    '&:hover': {
      background: gradients.secondary,
      transform: 'translateY(-4px)',
      filter: 'brightness(1.1)',
    },
  } as const,

  actionButtonSuccess: {
    height: { xs: 120, sm: 140 },
    minWidth: 140,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 1,
    py: 2,
    fontSize: { xs: '0.8rem', sm: '0.9rem' },
    fontWeight: 600,
    background: gradients.success,
    borderRadius: br.md,
    textTransform: 'none',
    boxShadow: (theme: Theme) =>
      theme.palette.mode === 'light'
        ? '0 4px 12px rgba(52, 168, 83, 0.25)'
        : '0 4px 12px rgba(52, 168, 83, 0.2)',
    transition: transitions.default,
    '&:hover': {
      background: gradients.success,
      transform: 'translateY(-4px)',
      filter: 'brightness(1.1)',
    },
  } as const,

  actionButtonWarning: {
    height: { xs: 120, sm: 140 },
    minWidth: 140,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 1,
    py: 2,
    fontSize: { xs: '0.8rem', sm: '0.9rem' },
    fontWeight: 600,
    background: gradients.warning,
    borderRadius: br.md,
    textTransform: 'none',
    color: '#1a1a2e',
    boxShadow: (theme: Theme) =>
      theme.palette.mode === 'light'
        ? '0 4px 12px rgba(251, 188, 5, 0.3)'
        : '0 4px 12px rgba(251, 188, 5, 0.25)',
    transition: transitions.default,
    '&:hover': {
      background: gradients.warning,
      transform: 'translateY(-4px)',
      filter: 'brightness(1.05)',
    },
  } as const,

  buttonLabel: {
    fontWeight: 600,
  } as const,

  buttonDesc: {
    fontSize: { xs: '0.65rem', sm: '0.7rem' },
    opacity: 0.9,
  } as const,

  icon: {
    fontSize: { xs: 32, sm: 36 },
  } as const,
}

export const emptyStateStyles: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  py: 8,
  px: 2,
  textAlign: 'center',
  '& .MuiSvgIcon-root': {
    fontSize: '4rem',
    color: 'text.disabled',
    mb: 2,
  },
}

export const layoutStyles = {
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    p: { xs: 1, sm: 2, md: 3 },
    backgroundColor: 'background.default',
    minHeight: '100vh',
    transition: transitions.default,
  } as const,

  content: {
    flex: 1,
    backgroundColor: 'background.paper',
    borderRadius: br.sm,
    boxShadow: (theme: Theme) => getShadow(theme.palette.mode as 'light' | 'dark', 'sm'),
    border: (theme: Theme) => `1px solid ${getBorder(theme.palette.mode as 'light' | 'dark')}`,
    overflow: 'hidden',
    transition: transitions.default,
  } as const,

  sidebar: {
    '& .MuiModal-root': {
      pointerEvents: 'none',
    },
  } as const,
}

export const operationFormStyles = {
  card: {
    maxWidth: 'xl',
    mx: 'auto',
    my: 2,
  } as const,

  sectionHeader: {
    mt: 2,
    mb: 1,
  } as const,

  flexRow: {
    display: 'flex',
    gap: 2,
    flexWrap: 'wrap',
  } as const,

  flexRowTight: {
    display: 'flex',
    gap: 1,
    flexWrap: 'wrap',
    width: '100%',
  } as const,

  flexRowAlign: {
    display: 'flex',
    gap: 1,
    flexWrap: 'wrap',
    width: '100%',
    alignItems: 'center',
  } as const,

  flexFull: {
    flex: 1,
  } as const,

  flexDouble: {
    flex: 2,
  } as const,

  divider: {
    my: 3,
  } as const,

  submitBox: {
    mt: 3,
    display: 'flex',
    justifyContent: 'flex-end',
  } as const,

  toggleBox: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    p: 1,
    borderRadius: br.xs,
    '&:hover': {
      bgcolor: 'action.hover',
    },
  } as const,

  collapseContent: {
    pt: 2,
  } as const,

  collapseRow: {
    display: 'flex',
    gap: 2,
    flexWrap: 'wrap',
    mt: 2,
  } as const,
}

export const skeletonStyles = {
  container: {
    p: { xs: 2, md: 3 },
  } as const,

  headerBox: {
    display: 'flex',
    justifyContent: 'space-between',
    mb: 3,
  } as const,

  filterBox: {
    display: 'flex',
    gap: 2,
    mb: 3,
  } as const,

  skeletonItem: {
    borderRadius: br.sm,
    bgcolor: (theme: Theme) =>
      theme.palette.mode === 'light' ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.06)',
  } as const,

  row: {
    display: 'flex',
    alignItems: 'center',
    gap: 2,
    py: 2,
    borderBottom: (theme: Theme) =>
      `1px solid ${getBorder(theme.palette.mode as 'light' | 'dark')}`,
  } as const,

  contentBox: {
    flex: 1,
  } as const,
}
