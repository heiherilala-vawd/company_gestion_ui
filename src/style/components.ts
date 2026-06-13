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
  getTextSecondary,
  spacing,
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
      theme.palette.mode === 'light' ? alpha('#FFFFFF', 0.8) : alpha('#131C2E', 0.85),
    color: 'text.primary',
    boxShadow: (theme: Theme) => getShadow(theme.palette.mode as 'light' | 'dark', 'sm'),
    borderBottom: (theme: Theme) =>
      `1px solid ${getDivider(theme.palette.mode as 'light' | 'dark')}`,
    backdropFilter: 'blur(20px)',
    backgroundImage: 'none',
    transition: transitions.smooth,
    '& .MuiToolbar-root': {
      minHeight: { xs: 56, sm: 64 },
      px: { xs: 1.5, sm: 2.5 },
    },
  } as const,

  iconButton: {
    color: 'text.secondary',
    backgroundColor: 'transparent',
    borderRadius: br.md,
    transition: transitions.smooth,
    width: 36,
    height: 36,
    '&:hover': {
      backgroundColor: (theme: Theme) => getPrimaryBg(theme.palette.mode as 'light' | 'dark'),
    },
  } as const,

  expandedSection: {
    backgroundColor: (theme: Theme) =>
      theme.palette.mode === 'light' ? alpha('#FFFFFF', 0.9) : alpha('#131C2E', 0.9),
    backdropFilter: 'blur(20px)',
    borderBottom: (theme: Theme) =>
      `1px solid ${getDivider(theme.palette.mode as 'light' | 'dark')}`,
    px: { xs: 1.5, sm: 2.5 },
    py: 1,
    display: 'flex',
    gap: 1,
    alignItems: 'center',
  } as const,
}

export const menuStyles = {
  container: {
    height: '100%',
    backgroundColor: (theme: Theme) => (theme.palette.mode === 'light' ? '#FFFFFF' : '#131C2E'),
    borderRight: (theme: Theme) =>
      `1px solid ${getDivider(theme.palette.mode as 'light' | 'dark')}`,
    p: 2,
    pb: { xs: 9, sm: 10 },
    overflowY: 'auto',
    overflowX: 'hidden',
    '&::-webkit-scrollbar': {
      width: '4px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: (theme: Theme) =>
        theme.palette.mode === 'light' ? 'rgba(0,0,0,0.08)' : 'rgba(99,102,241,0.2)',
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
    fontSize: '1.125rem',
    letterSpacing: '-0.03em',
    background: gradients.primary,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  } as const,

  appSubtitle: {
    color: 'text.secondary',
    fontSize: '0.675rem',
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
    opacity: 0.8,
  } as const,

  listItem: {
    borderRadius: br.md,
    mb: 0.15,
    px: 1.5,
    py: 0.65,
    color: 'text.secondary',
    transition: transitions.smooth,
    '&.Mui-selected': {
      backgroundColor: (theme: Theme) =>
        theme.palette.mode === 'light' ? alpha('#6366F1', 0.08) : alpha('#6366F1', 0.15),
      color: (theme: Theme) => (theme.palette.mode === 'light' ? '#4F46E5' : '#A5B4FC'),
      fontWeight: 600,
      '& .MuiListItemIcon-root': {
        color: (theme: Theme) => (theme.palette.mode === 'light' ? '#4F46E5' : '#A5B4FC'),
      },
      '&:hover': {
        backgroundColor: (theme: Theme) =>
          theme.palette.mode === 'light' ? alpha('#6366F1', 0.12) : alpha('#6366F1', 0.2),
      },
    },
    '&:hover': {
      backgroundColor: (theme: Theme) =>
        theme.palette.mode === 'light' ? alpha('#6366F1', 0.04) : alpha('#6366F1', 0.08),
      color: (theme: Theme) => (theme.palette.mode === 'light' ? '#4F46E5' : '#E2E8F0'),
      '& .MuiListItemIcon-root': {
        color: (theme: Theme) => (theme.palette.mode === 'light' ? '#6366F1' : '#818CF8'),
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
    fontSize: '0.8125rem',
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
    transition: transitions.smooth,
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
    '&:hover': {},
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
    borderRadius: br.md,
    textTransform: 'none',
    fontWeight: 500,
  } as const,

  saveButton: {
    borderRadius: br.md,
    textTransform: 'none',
    fontWeight: 600,
    background: gradients.primary,
    '&:hover': {
      background: gradients.primary,
      filter: 'brightness(1.08)',
    },
  } as const,

  deleteButton: {
    borderRadius: br.md,
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
      letterSpacing: '0.05em',
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
    border: (theme: Theme) => `1px solid ${getBorder(theme.palette.mode as 'light' | 'dark')}`,
    '& .RaDatagrid-root': {},
    '& .RaDatagrid-header': {
      backgroundColor: (theme: Theme) => getTableHeader(theme.palette.mode as 'light' | 'dark'),
      '& .MuiTableCell-head': {
        fontWeight: 600,
        fontSize: '0.75rem',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        color: (theme: Theme) =>
          theme.palette.mode === 'light' ? 'rgba(0,0,0,0.55)' : 'rgba(255,255,255,0.55)',
      },
    },
    '& .RaDatagrid-row:hover': {
      backgroundColor: (theme: Theme) =>
        alpha('#6366F1', theme.palette.mode === 'light' ? 0.04 : 0.06),
    },
    '& .RaDatagrid-row': {
      transition: transitions.smooth,
    },
  } as const,
}

export const listFilters = [
  { source: 'description', label: 'Recherche' },
  { source: 'status', label: 'Statut' },
  { source: 'job_id', label: 'Travail' },
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
    '&:hover': {},
  } as const,

  infoCard: {
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
    border: (theme: Theme) =>
      `1px solid ${alpha('#6366F1', theme.palette.mode === 'light' ? 0.12 : 0.2)}`,
    maxWidth: 640,
    width: '100%',
    position: 'relative',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 4,
      background: gradients.primaryHorizontal,
    },
  } as const,

  title: {
    mb: 1,
    fontWeight: 700,
    fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
    letterSpacing: '-0.03em',
    background: gradients.primary,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
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
    justifyContent: 'center',
  } as const,

  illustrationCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: transitions.spring,
    width: { xs: 90, sm: 110 },
    height: { xs: 110, sm: 130 },
    '&:hover': {
      transform: 'translateY(-4px)',
    },
    '&:active': {
      transform: 'translateY(-2px)',
    },
  } as const,

  illustrationCircle: {
    width: { xs: 52, sm: 64 },
    height: { xs: 52, sm: 64 },
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    mb: 1,
    position: 'relative' as const,
    overflow: 'hidden',
    transition: transitions.smooth,
    '&::after': {
      content: '""',
      position: 'absolute',
      inset: 0,
      background:
        'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 50%, rgba(0,0,0,0.08) 100%)',
      borderRadius: '50%',
      pointerEvents: 'none',
    },
    '&:hover': {
      transform: 'scale(1.08)',
    },
  } as const,

  illustrationIcon: {
    fontSize: { xs: 20, sm: 26 },
    color: '#FFFFFF',
    position: 'relative' as const,
    zIndex: 1,
  } as const,

  illustrationDesc: {
    fontSize: { xs: '0.55rem', sm: '0.6rem' },
    color: 'text.secondary',
    textAlign: 'center',
    mt: 0.25,
    whiteSpace: 'pre-line',
  } as const,
}

export const bottomNavStyles = {
  paper: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1200,
    backgroundColor: (theme: Theme) =>
      theme.palette.mode === 'light' ? alpha('#FFFFFF', 0.88) : alpha('#131C2E', 0.88),
    backdropFilter: 'blur(20px)',
    borderTop: (theme: Theme) => `1px solid ${getDivider(theme.palette.mode as 'light' | 'dark')}`,
    backgroundImage: 'none',
    transition: transitions.smooth,
  } as const,
  nav: {
    backgroundColor: 'transparent',
    height: { xs: 60, sm: 64 },
    '& .MuiBottomNavigationAction-root': {
      minWidth: 0,
      padding: '4px 0',
    },
    '& .MuiBottomNavigationAction-label': {
      fontSize: { xs: '0.6rem', sm: '0.65rem' },
      fontWeight: 500,
    },
    '& .Mui-selected .MuiBottomNavigationAction-label': {
      fontSize: { xs: '0.6rem', sm: '0.65rem' },
      fontWeight: 700,
    },
    '& .MuiBottomNavigationAction-root.Mui-selected': {
      color: (theme: Theme) => theme.palette.primary.main,
    },
  } as const,
  action: {
    color: 'text.secondary',
    '& .MuiSvgIcon-root': {
      fontSize: { xs: 20, sm: 22 },
    },
    '&.Mui-selected .MuiSvgIcon-root': {
      color: (theme: Theme) => theme.palette.primary.main,
    },
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
    transition: transitions.smooth,
  } as const,

  content: {
    flex: 1,
    backgroundColor: 'transparent',
    transition: transitions.smooth,
  } as const,

  sidebar: {
    '& .MuiModal-root': {
      pointerEvents: 'none',
    },
  } as const,

  raLayout: {
    '& .RaLayout-content': {
      paddingBottom: { xs: '72px', sm: '76px' },
    },
  } as const,
}

export const dashboardStyles = {
  container: {
    p: { xs: 2, sm: 3, md: 4 },
    width: '100%',
  } as const,

  header: {
    mb: 4,
  } as const,

  title: {
    fontWeight: 700,
    fontSize: { xs: '1.25rem', sm: '1.5rem' },
    letterSpacing: '-0.02em',
    mb: 0.5,
  } as const,

  titleAccent: {
    background: gradients.primary,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  } as const,

  subtitle: {
    color: 'text.secondary',
    fontSize: '0.875rem',
  } as const,

  filtersRow: {
    display: 'flex',
    gap: 2,
    mb: 3,
    flexWrap: 'wrap',
    alignItems: 'center',
  } as const,

  sectionTitle: {
    fontWeight: 600,
    fontSize: '1.125rem',
    mb: 2,
    mt: 1,
  } as const,

  chartGrid: {
    mb: 4,
  } as const,

  chartCard: {
    height: '100%',
    border: (theme: Theme) => `1px solid ${getBorder(theme.palette.mode as 'light' | 'dark')}`,
    transition: transitions.smooth,
    display: 'flex',
    flexDirection: 'column',
  } as const,

  metricsCard: {
    border: (theme: Theme) => `1px solid ${getBorder(theme.palette.mode as 'light' | 'dark')}`,
    transition: transitions.smooth,
    overflow: 'hidden',
  } as const,

  metricsGrid: {
    display: 'grid',
    gridTemplateColumns: { xs: '1fr 1fr', sm: 'repeat(4, 1fr)' },
    gap: 0,
    '& > *': {
      p: { xs: 2, sm: 2.5 },
      borderRight: (theme: Theme) =>
        `1px solid ${getDivider(theme.palette.mode as 'light' | 'dark')}`,
      borderBottom: (theme: Theme) =>
        `1px solid ${getDivider(theme.palette.mode as 'light' | 'dark')}`,
      '&:nth-of-type(even)': {
        borderRight: { xs: 'none', sm: undefined },
      },
      '&:nth-of-type(n+3)': {
        borderBottom: { xs: 'none', sm: undefined },
      },
      '&:nth-last-child(-n+4)': {
        borderBottom: 'none',
      },
      '&:nth-child(4n)': {
        borderRight: 'none',
      },
    },
  } as const,

  metricsLabel: {
    color: 'text.secondary',
    fontWeight: 500,
    fontSize: '0.65rem',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em',
    mb: 0.5,
  } as const,

  metricsValue: {
    fontWeight: 700,
    fontSize: { xs: '1rem', sm: '1.25rem' },
    letterSpacing: '-0.02em',
    lineHeight: 1.2,
  } as const,
}

export const sectionHubStyles = {
  container: {
    p: { xs: 2.5, sm: 4 },
    width: '100%',
    maxWidth: 600,
    mx: 'auto',
  } as const,

  title: {
    fontWeight: 700,
    fontSize: { xs: '1.1rem', sm: '1.25rem' },
    mb: 3,
    textAlign: 'center',
    color: 'text.primary',
    letterSpacing: '-0.02em',
  } as const,

  grid: {
    justifyContent: 'center',
  } as const,

  gridItem: {
    display: 'flex',
    justifyContent: 'center',
  } as const,

  actionBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: transitions.spring,
    width: { xs: 90, sm: 110 },
    height: { xs: 110, sm: 130 },
    '&:hover': { transform: 'translateY(-4px)' },
    '&:active': { transform: 'translateY(-2px)' },
  } as const,

  linkBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    cursor: 'pointer',
    width: { xs: 88, sm: 100 },
    py: 1.5,
    borderRadius: br.md,
    transition: transitions.smooth,
    '&:hover': {
      bgcolor: 'action.hover',
      transform: 'translateY(-2px)',
    },
  } as const,

  circle: {
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    transition: transitions.smooth,
    '&::after': {
      content: '""',
      position: 'absolute',
      inset: 0,
      background:
        'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 50%, rgba(0,0,0,0.08) 100%)',
      borderRadius: '50%',
      pointerEvents: 'none',
    },
  } as const,

  circleIcon: {
    color: '#FFFFFF',
    position: 'relative',
    zIndex: 1,
  } as const,

  label: {
    fontWeight: 600,
    fontSize: { xs: '0.65rem', sm: '0.7rem' },
    textAlign: 'center',
    color: 'text.primary',
    lineHeight: 1.3,
  } as const,

  desc: {
    fontSize: { xs: '0.5rem', sm: '0.55rem' },
    color: 'text.secondary',
    textAlign: 'center',
    mt: 0.15,
    whiteSpace: 'pre-line',
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
    transition: transitions.smooth,
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

export const pausedFeature = {
  opacity: 0.45,
  pointerEvents: 'none',
  userSelect: 'none',
  filter: 'grayscale(0.6)',
} as const

export const pausedBadge: SxProps<Theme> = {
  fontSize: '0.6rem',
  fontWeight: 600,
  px: 0.6,
  py: 0.15,
  borderRadius: 0.8,
  backgroundColor: (theme: Theme) =>
    theme.palette.mode === 'light' ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)',
  color: 'text.disabled',
  letterSpacing: '0.04em',
  textTransform: 'uppercase',
  lineHeight: 1.3,
  whiteSpace: 'nowrap',
} as const

export const profileStyles = {
  page: {
    display: 'flex',
    justifyContent: 'center',
    p: { xs: 2, sm: 4 },
    minHeight: '100%',
  } as const,

  card: {
    width: '100%',
    maxWidth: 560,
    borderRadius: br.xl,
    boxShadow: (theme: Theme) => getShadow(theme.palette.mode as 'light' | 'dark', 'card'),
    border: (theme: Theme) => `1px solid ${getBorder(theme.palette.mode as 'light' | 'dark')}`,
    overflow: 'visible',
  } as const,

  header: {
    p: { xs: 3, sm: 4 },
    pb: { xs: 2, sm: 3 },
    textAlign: 'center',
    borderBottom: (theme: Theme) =>
      `1px solid ${getDivider(theme.palette.mode as 'light' | 'dark')}`,
  } as const,

  avatar: {
    width: { xs: 72, sm: 88 },
    height: { xs: 72, sm: 88 },
    borderRadius: '50%',
    background: gradients.primary,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    mx: 'auto',
    mb: 2,
    boxShadow: (theme: Theme) => getShadow(theme.palette.mode as 'light' | 'dark', 'primary'),
  } as const,

  avatarText: {
    color: '#fff',
    fontSize: { xs: '1.5rem', sm: '2rem' },
    fontWeight: 700,
    lineHeight: 1,
  } as const,

  name: {
    fontWeight: 700,
    fontSize: { xs: '1.25rem', sm: '1.5rem' },
    letterSpacing: '-0.02em',
    mb: 0.5,
  } as const,

  roleBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    px: 1.5,
    py: 0.4,
    borderRadius: br.pill,
    background: (theme: Theme) => getPrimaryBg(theme.palette.mode as 'light' | 'dark'),
    color: 'primary.main',
    fontSize: '0.75rem',
    fontWeight: 600,
    letterSpacing: '0.02em',
  } as const,

  body: {
    p: { xs: 2.5, sm: 4 },
  } as const,

  fieldRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    py: 1.75,
    borderBottom: (theme: Theme) =>
      `1px solid ${getDivider(theme.palette.mode as 'light' | 'dark')}`,
    '&:last-child': {
      borderBottom: 'none',
    },
  } as const,

  fieldLabel: {
    color: (theme: Theme) => getTextSecondary(theme.palette.mode as 'light' | 'dark'),
    fontWeight: 500,
    fontSize: '0.8125rem',
  } as const,

  fieldValue: {
    fontWeight: 500,
    fontSize: '0.9375rem',
    textAlign: 'right' as const,
  } as const,

  actions: {
    display: 'flex',
    gap: spacing.sm,
    mt: 3,
    justifyContent: 'center',
    flexWrap: 'wrap' as const,
  } as const,

  editFields: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 2.5,
  } as const,

  editActions: {
    display: 'flex',
    gap: spacing.sm,
    mt: 1,
  } as const,
}
