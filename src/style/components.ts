import { SxProps, Theme } from '@mui/material'
import { alpha } from '@mui/material/styles'
import {
  borderRadius as br,
  transitions,
  getShadow,
  gradients,
  getDivider,
  getSubtleBg,
  getPrimaryBg,
  getTableHeader,
  getBorder,
} from './themeConfig'

export const appBarStyles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
  } as const,

  appBar: {
    backgroundColor: (theme: Theme) =>
      theme.palette.mode === 'light' ? alpha('#FFFFFF', 0.8) : alpha('#0F2F23', 0.85),
    color: 'text.primary',
    boxShadow: (theme: Theme) => getShadow(theme.palette.mode as 'light' | 'dark', 'sm'),
    borderBottom: (theme: Theme) =>
      `1px solid ${getDivider(theme.palette.mode as 'light' | 'dark')}`,
    backdropFilter: 'blur(16px)',
    backgroundImage: 'none',
    transition: transitions.default,
    '& .MuiToolbar-root': {
      minHeight: { xs: 56, sm: 64 },
      px: { xs: 1.5, sm: 2.5 },
    },
  } as const,

  iconButton: {
    color: 'text.secondary',
    backgroundColor: 'transparent',
    borderRadius: br.md,
    transition: transitions.default,
    width: 36,
    height: 36,
    '&:hover': {
      backgroundColor: (theme: Theme) => getPrimaryBg(theme.palette.mode as 'light' | 'dark'),
      transform: 'translateY(-1px)',
    },
  } as const,
}

export const menuStyles = {
  container: {
    height: '100%',
    backgroundColor: (theme: Theme) => (theme.palette.mode === 'light' ? '#FFFFFF' : '#0F2F23'),
    borderRight: (theme: Theme) =>
      `1px solid ${getDivider(theme.palette.mode as 'light' | 'dark')}`,
    p: 2,
    overflowY: 'auto',
    overflowX: 'hidden',
    '&::-webkit-scrollbar': {
      width: '4px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: (theme: Theme) =>
        theme.palette.mode === 'light' ? 'rgba(0,0,0,0.1)' : 'rgba(108,165,104,0.2)',
      borderRadius: '4px',
    },
  } as const,

  headerBox: {
    mb: 2.5,
    pb: 2,
    borderBottom: (theme: Theme) =>
      `1px solid ${getDivider(theme.palette.mode as 'light' | 'dark')}`,
    px: 1,
  } as const,

  appTitle: {
    fontWeight: 700,
    fontSize: '1.1rem',
    letterSpacing: '-0.02em',
    color: (theme: Theme) => (theme.palette.mode === 'light' ? '#1A2920' : '#A8D5A2'),
  } as const,

  appSubtitle: {
    color: 'text.secondary',
    fontSize: '0.7rem',
    fontWeight: 500,
    mt: 0.25,
  } as const,

  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    color: 'text.secondary',
    fontSize: '0.65rem',
    fontWeight: 600,
    letterSpacing: '0.08em',
    py: 0.6,
    px: 1.5,
    mb: 0.25,
    mt: 1.5,
    textTransform: 'uppercase' as const,
  } as const,

  sectionDot: {
    width: 6,
    height: 6,
    borderRadius: '50%',
    flexShrink: 0,
    opacity: 0.7,
  } as const,

  listItem: {
    borderRadius: br.md,
    mb: 0.15,
    px: 1.5,
    py: 0.65,
    color: 'text.secondary',
    transition: transitions.default,
    '&.Mui-selected': {
      backgroundColor: (theme: Theme) =>
        theme.palette.mode === 'light' ? alpha('#6CA568', 0.08) : alpha('#6CA568', 0.15),
      color: (theme: Theme) => (theme.palette.mode === 'light' ? '#4E8B56' : '#A8D5A2'),
      fontWeight: 600,
      '& .MuiListItemIcon-root': {
        color: (theme: Theme) => (theme.palette.mode === 'light' ? '#4E8B56' : '#A8D5A2'),
      },
      '&:hover': {
        backgroundColor: (theme: Theme) =>
          theme.palette.mode === 'light' ? alpha('#6CA568', 0.12) : alpha('#6CA568', 0.2),
      },
    },
    '&:hover': {
      backgroundColor: (theme: Theme) =>
        theme.palette.mode === 'light' ? alpha('#6CA568', 0.04) : alpha('#6CA568', 0.08),
      color: (theme: Theme) => (theme.palette.mode === 'light' ? '#4E8B56' : '#C3D6C8'),
      '& .MuiListItemIcon-root': {
        color: (theme: Theme) => (theme.palette.mode === 'light' ? '#4E8B56' : '#8BCB7B'),
      },
    },
  } as const,

  listItemIcon: {
    minWidth: 36,
    color: 'inherit',
    '& .MuiSvgIcon-root': {
      fontSize: 19,
    },
  } as const,

  listItemText: {
    fontSize: '0.825rem',
    fontWeight: 500,
  } as const,
}

export const formStyles = {
  selectorBox: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: (theme: Theme) => alpha(theme.palette.primary.main, 0.08),
    borderRadius: br.md,
    px: 1.25,
    py: 0.375,
    gap: 0.75,
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
  input: {
    fontSize: 13,
  } as const,
  label: {
    fontSize: 13,
  } as const,
  select: {
    fontSize: 13,
    height: 40,
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

  page: {
    '& .RaCreate-main, & .RaEdit-main': {
      backgroundColor: 'transparent',
      boxShadow: 'none',
    },
  } as const,

  card: {
    borderRadius: br.xxl,
    boxShadow: (theme: Theme) => getShadow(theme.palette.mode as 'light' | 'dark', 'card'),
    overflow: 'hidden',
    '&:hover': {
      boxShadow: (theme: Theme) => getShadow(theme.palette.mode as 'light' | 'dark', 'cardHover'),
      transform: 'translateY(-3px)',
    },
  } as const,

  titleBox: {
    p: { xs: 2.5, md: 3 },
    borderBottom: (theme: Theme) =>
      `1px solid ${getDivider(theme.palette.mode as 'light' | 'dark')}`,
    backgroundColor: (theme: Theme) => getSubtleBg(theme.palette.mode as 'light' | 'dark'),
  } as const,

  titleText: {
    fontWeight: 600,
    fontSize: '1.125rem',
  } as const,

  cardContent: {
    p: { xs: 2, md: 3 },
  } as const,

  simpleForm: {
    '& .RaSimpleForm-form': {
      gap: 2.5,
    },
  } as const,

  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 1.5,
    p: { xs: 2, md: 2.5 },
    borderTop: (theme: Theme) => `1px solid ${getDivider(theme.palette.mode as 'light' | 'dark')}`,
    backgroundColor: (theme: Theme) => getSubtleBg(theme.palette.mode as 'light' | 'dark'),
  } as const,

  cancelButton: {
    borderRadius: br.lg,
    textTransform: 'none',
    fontWeight: 500,
  } as const,

  saveButton: {
    borderRadius: br.lg,
    textTransform: 'none',
    fontWeight: 600,
    background: gradients.primary,
    '&:hover': {
      background: gradients.primary,
      filter: 'brightness(1.08)',
    },
  } as const,

  deleteButton: {
    borderRadius: br.lg,
    textTransform: 'none',
    fontWeight: 500,
  } as const,
}

export const datagridStyles = {
  container: {
    '& .MuiDataGrid-root': {
      border: 'none',
      borderRadius: br.xxl,
    },
    '& .MuiDataGrid-cell': {
      fontSize: '0.875rem',
      borderBottom: (theme: Theme) =>
        `1px solid ${getBorder(theme.palette.mode as 'light' | 'dark')}`,
    },
    '& .MuiDataGrid-columnHeaders': {
      backgroundColor: (theme: Theme) => getTableHeader(theme.palette.mode as 'light' | 'dark'),
      borderBottom: 'none',
    },
    '& .MuiDataGrid-columnHeaderTitle': {
      fontWeight: 600,
      fontSize: '0.75rem',
      textTransform: 'uppercase',
      letterSpacing: '0.04em',
      color: (theme: Theme) =>
        theme.palette.mode === 'light' ? 'rgba(0,0,0,0.55)' : 'rgba(255,255,255,0.55)',
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
    borderRadius: br.xxl,
    overflow: 'hidden',
    border: (theme: Theme) => `1px solid ${getBorder(theme.palette.mode as 'light' | 'dark')}`,
    '& .RaDatagrid-root': {
      borderRadius: br.xxl,
    },
    '& .RaDatagrid-header': {
      backgroundColor: (theme: Theme) => getTableHeader(theme.palette.mode as 'light' | 'dark'),
      '& .MuiTableCell-head': {
        fontWeight: 600,
        fontSize: '0.75rem',
        textTransform: 'uppercase',
        letterSpacing: '0.04em',
        color: (theme: Theme) =>
          theme.palette.mode === 'light' ? 'rgba(0,0,0,0.55)' : 'rgba(255,255,255,0.55)',
      },
    },
    '& .RaDatagrid-row:hover': {
      backgroundColor: (theme: Theme) =>
        alpha('#6CA568', theme.palette.mode === 'light' ? 0.04 : 0.06),
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

export const showStyles = {
  page: {
    '& .RaShow-main': {
      backgroundColor: 'transparent',
      boxShadow: 'none',
    },
  } as const,

  card: {
    borderRadius: br.xxl,
    boxShadow: (theme: Theme) => getShadow(theme.palette.mode as 'light' | 'dark', 'card'),
    overflow: 'hidden',
    '&:hover': {
      boxShadow: (theme: Theme) => getShadow(theme.palette.mode as 'light' | 'dark', 'cardHover'),
    },
  } as const,

  titleBox: {
    p: { xs: 2.5, md: 3 },
    borderBottom: (theme: Theme) =>
      `1px solid ${getDivider(theme.palette.mode as 'light' | 'dark')}`,
    backgroundColor: (theme: Theme) => getSubtleBg(theme.palette.mode as 'light' | 'dark'),
  } as const,

  titleText: {
    fontWeight: 600,
    fontSize: '1.125rem',
  } as const,

  cardContent: {
    p: { xs: 2, md: 3 },
  } as const,

  tabbedLayout: {
    '& .RaTabbedShowLayout-root': {
      borderRadius: br.xxl,
      overflow: 'hidden',
    },
    '& .RaTabbedShowLayout-tabs': {
      backgroundColor: (theme: Theme) => getSubtleBg(theme.palette.mode as 'light' | 'dark'),
      borderBottom: (theme: Theme) =>
        `1px solid ${getDivider(theme.palette.mode as 'light' | 'dark')}`,
    },
    '& .RaTabbedShowLayout-content': {
      p: { xs: 2, md: 3 },
    },
  } as const,

  tab: {
    fontWeight: 500,
    textTransform: 'none' as const,
    fontSize: '0.875rem',
    minHeight: 48,
  } as const,

  infoCard: {
    borderRadius: br.xl,
    mb: 2,
    boxShadow: 'none',
    border: (theme: Theme) => `1px solid ${getDivider(theme.palette.mode as 'light' | 'dark')}`,
    '&:hover': {
      boxShadow: (theme: Theme) => getShadow(theme.palette.mode as 'light' | 'dark', 'sm'),
    },
  } as const,

  infoCardTitleBox: {
    p: 2,
    borderBottom: (theme: Theme) =>
      `1px solid ${getDivider(theme.palette.mode as 'light' | 'dark')}`,
    backgroundColor: (theme: Theme) => getSubtleBg(theme.palette.mode as 'light' | 'dark'),
  } as const,

  infoCardTitle: {
    fontWeight: 600,
    fontSize: '0.9375rem',
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
    fontSize: '0.8125rem',
  } as const,

  fieldValue: {
    fontWeight: 500,
    fontSize: '0.9375rem',
  } as const,
}

export const homePageStyles = {
  container: {
    p: { xs: 2, sm: 4, md: 6 },
    width: '100%',
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  } as const,

  welcomeBox: {
    textAlign: 'center',
    mb: 5,
    p: { xs: 3, sm: 5 },
    borderRadius: br.xxl,
    background: (theme: Theme) =>
      theme.palette.mode === 'light' ? gradients.card : gradients.dashboard,
    border: (theme: Theme) =>
      `1px solid ${alpha('#6CA568', theme.palette.mode === 'light' ? 0.12 : 0.2)}`,
    maxWidth: 640,
    width: '100%',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: (theme: Theme) => getShadow(theme.palette.mode as 'light' | 'dark', 'card'),
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 3,
      background: gradients.primaryHorizontal,
    },
  } as const,

  title: {
    mb: 1,
    fontWeight: 600,
    fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' },
    color: (theme: Theme) => (theme.palette.mode === 'light' ? '#4E8B56' : '#A8D5A2'),
    letterSpacing: '-0.02em',
  } as const,

  subtitle: {
    color: 'text.secondary',
    fontWeight: 400,
    fontSize: { xs: '0.875rem', sm: '1rem' },
  } as const,

  sectionContainer: {
    width: '100%',
    maxWidth: 960,
  } as const,

  sectionHeader: {
    mb: 2,
    textAlign: 'center',
    color: 'text.secondary',
    fontWeight: 600,
    fontSize: '0.75rem',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.08em',
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
    borderRadius: br.xl,
    textTransform: 'none',
    color: '#fff',
    transition: transitions.spring,
    '&:hover': {
      transform: 'translateY(-4px) scale(1.02)',
      filter: 'brightness(1.08)',
    },
  } as const,

  buttonLabel: {
    fontWeight: 600,
  } as const,

  buttonDesc: {
    fontSize: { xs: '0.65rem', sm: '0.7rem' },
    opacity: 0.8,
    color: 'inherit',
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
    p: { xs: 1, sm: 2, md: 2.5 },
    backgroundColor: 'background.default',
    minHeight: '100vh',
    transition: transitions.default,
  } as const,

  content: {
    flex: 1,
    backgroundColor: 'background.paper',
    borderRadius: br.xxl,
    boxShadow: (theme: Theme) => getShadow(theme.palette.mode as 'light' | 'dark', 'card'),
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
    mt: 2.5,
    mb: 1.5,
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
    gap: 1.5,
  } as const,

  toggleBox: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    p: 1,
    borderRadius: br.md,
    transition: transitions.default,
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
      theme.palette.mode === 'light' ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.04)',
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
