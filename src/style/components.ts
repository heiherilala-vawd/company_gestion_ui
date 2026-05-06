import { SxProps, Theme } from '@mui/material'
import { alpha } from '@mui/material/styles'
import { colors, borderRadius as br, transitions, getShadow, gradients } from './themeConfig'

export const appBarStyles = {
  selectorBox: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    backgroundColor: alpha(colors.primary.main, 0.1),
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
      theme.palette.mode === 'light'
        ? `1px solid ${colors.light.divider}`
        : `1px solid ${colors.dark.divider}`,
    backdropFilter: 'blur(12px)',
    backgroundImage: 'none',
    borderRadius: { xs: 0, md: 0 },
    transition: transitions.default,
  } as const,

  iconButton: {
    color: 'text.primary',
    backgroundColor: (theme: Theme) =>
      theme.palette.mode === 'light' ? 'rgba(255, 90, 60, 0.04)' : 'rgba(255, 90, 60, 0.08)',
    borderRadius: br.xs,
    transition: transitions.default,
    '&:hover': {
      backgroundColor: (theme: Theme) =>
        theme.palette.mode === 'light' ? 'rgba(255, 90, 60, 0.08)' : 'rgba(255, 90, 60, 0.12)',
      transform: 'translateY(-1px)',
    },
  } as const,
}

export const menuStyles = {
  section: {
    display: 'block',
    padding: '8px 16px',
    fontWeight: 600,
    fontSize: '0.6875rem',
    textTransform: 'uppercase' as const,
    letterSpacing: 1,
  },
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

  // Menu container
  container: {
    height: '100%',
    background: (theme: Theme) =>
      theme.palette.mode === 'light'
        ? 'linear-gradient(180deg, #ff5a3c 0%, #e04530 100%)'
        : 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)',
    borderRadius: { xs: 0, md: '0 16px 16px 0' },
    p: 2,
    overflowY: 'auto',
    overflowX: 'hidden',
    '&::-webkit-scrollbar': {
      width: '4px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(255,255,255,0.2)',
      borderRadius: '4px',
    },
  } as const,

  // Header box
  headerBox: {
    mb: 3,
    pb: 2,
    borderBottom: '1px solid rgba(255,255,255,0.15)',
  } as const,

  // App title
  appTitle: {
    color: '#fff',
    fontWeight: 700,
    fontSize: '1.25rem',
    letterSpacing: '-0.025em',
  } as const,

  // App subtitle
  appSubtitle: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: '0.75rem',
  } as const,

  // Section header
  sectionHeader: {
    color: '#fff',
    fontSize: '0.8125rem',
    fontWeight: 700,
    letterSpacing: '1.5px',
    py: 1,
    px: 2,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 1,
    mx: 1,
    mb: 1,
  } as const,

  // List item button (main items)
  listItem: {
    borderRadius: 2,
    mx: 1,
    mb: 0.5,
    color: '#fff',
    transition: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)',
    '&.Mui-selected': {
      backgroundColor: (theme: Theme) =>
        theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 90, 60, 0.15)',
      color: '#fff',
      backdropFilter: 'blur(4px)',
      '& .MuiListItemIcon-root': {
        color: '#fff',
      },
    },
    '&:hover': {
      backgroundColor: (theme: Theme) =>
        theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 90, 60, 0.1)',
      transform: 'translateX(4px)',
    },
  } as const,

  // Collapsible section button
  collapsibleButton: {
    borderRadius: 2,
    mx: 1,
    mb: 0.5,
    color: '#fff',
    transition: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
      backgroundColor: (theme: Theme) =>
        theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 90, 60, 0.1)',
    },
  } as const,

  // List item icon
  listItemIcon: {
    minWidth: 40,
    color: 'inherit',
  } as const,

  // List item text
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
    backgroundColor: (theme: Theme) => alpha(theme.palette.primary.main, 0.1),
    borderRadius: br.xs,
    px: 1,
    py: 0.5,
    gap: 1,
  } as const,
  selectorLabel: {
    color: 'primary.main',
    fontWeight: 600,
    fontSize: 11,
    whiteSpace: 'nowrap',
    display: { xs: 'none', sm: 'block' },
  } as const,
  selectorWrapper: {
    minWidth: 100,
    maxWidth: 160,
    flexGrow: 1,
  } as const,
  selectorInput: {
    fontSize: 12,
  } as const,

  // Create/Edit page styles
  page: {
    '& .RaCreate-main, & .RaEdit-main': {
      backgroundColor: 'transparent',
      boxShadow: 'none',
    },
  } as const,

  card: {
    borderRadius: br.lg,
    boxShadow: (theme: Theme) => getShadow(theme.palette.mode as 'light' | 'dark', 'sm'),
    border: (theme: Theme) =>
      theme.palette.mode === 'light'
        ? `1px solid ${colors.light.divider}`
        : `1px solid ${colors.dark.divider}`,
    overflow: 'hidden',
  } as const,

  titleBox: {
    p: 3,
    borderBottom: (theme: Theme) =>
      theme.palette.mode === 'light'
        ? `1px solid ${colors.light.divider}`
        : `1px solid ${colors.dark.divider}`,
    backgroundColor: (theme: Theme) =>
      theme.palette.mode === 'light' ? 'rgba(0,0,0,0.02)' : 'rgba(255,255,255,0.02)',
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
      backgroundColor: (theme: Theme) =>
        theme.palette.mode === 'light' ? 'rgba(0,0,0,0.02)' : 'rgba(255,255,255,0.02)',
      borderRadius: br.sm,
      transition: transitions.default,
      '&:hover': {
        backgroundColor: (theme: Theme) =>
          theme.palette.mode === 'light' ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.04)',
      },
    },
  } as const,

  inputRoot: {
    '& .MuiFormControl-root': {
      borderRadius: 2,
    },
  } as const,

  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 2,
    p: 2,
    borderTop: (theme: Theme) =>
      theme.palette.mode === 'light'
        ? `1px solid ${colors.light.divider}`
        : `1px solid ${colors.dark.divider}`,
    backgroundColor: (theme: Theme) =>
      theme.palette.mode === 'light' ? 'rgba(0,0,0,0.02)' : 'rgba(255,255,255,0.02)',
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
      backgroundColor: (theme: Theme) => (theme.palette.mode === 'light' ? '#f8fafc' : '#273548'),
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
    backgroundColor: (theme: Theme) => (theme.palette.mode === 'light' ? '#f8fafc' : '#273548'),
  } as const,

  // Responsive datagrid styles
  responsive: {
    borderRadius: 3,
    overflow: 'hidden',
    '& .RaDatagrid-root': {
      borderRadius: 3,
    },
    '& .RaDatagrid-header': {
      backgroundColor: (theme: Theme) => (theme.palette.mode === 'light' ? '#f8fafc' : '#273548'),
    },
    '& .RaDatagrid-row:hover': {
      backgroundColor: (theme: Theme) =>
        theme.palette.mode === 'light' ? 'rgba(255, 90, 60, 0.04)' : 'rgba(255, 90, 60, 0.08)',
    },
    '& .RaDatagrid-row': {
      transition: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)',
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
    border: (theme: Theme) =>
      theme.palette.mode === 'light'
        ? `1px solid ${colors.light.divider}`
        : `1px solid ${colors.dark.divider}`,
    overflow: 'hidden',
  } as const,

  titleBox: {
    p: 3,
    borderBottom: (theme: Theme) =>
      theme.palette.mode === 'light'
        ? `1px solid ${colors.light.divider}`
        : `1px solid ${colors.dark.divider}`,
    backgroundColor: (theme: Theme) =>
      theme.palette.mode === 'light' ? 'rgba(0,0,0,0.02)' : 'rgba(255,255,255,0.02)',
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
      backgroundColor: (theme: Theme) =>
        theme.palette.mode === 'light' ? 'rgba(0,0,0,0.02)' : 'rgba(255,255,255,0.02)',
      borderBottom: (theme: Theme) =>
        theme.palette.mode === 'light'
          ? `1px solid ${colors.light.divider}`
          : `1px solid ${colors.dark.divider}`,
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
    border: (theme: Theme) =>
      theme.palette.mode === 'light'
        ? `1px solid ${colors.light.divider}`
        : `1px solid ${colors.dark.divider}`,
  } as const,

  infoCardTitleBox: {
    p: 2,
    borderBottom: (theme: Theme) =>
      theme.palette.mode === 'light'
        ? `1px solid ${colors.light.divider}`
        : `1px solid ${colors.dark.divider}`,
    backgroundColor: (theme: Theme) =>
      theme.palette.mode === 'light' ? 'rgba(0,0,0,0.02)' : 'rgba(255,255,255,0.02)',
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
      theme.palette.mode === 'light'
        ? `1px solid ${colors.light.divider}`
        : `1px solid ${colors.dark.divider}`,
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
    borderRadius: 4,
    backgroundColor: (theme: Theme) =>
      theme.palette.mode === 'light' ? 'rgba(255, 90, 60, 0.02)' : 'rgba(255, 90, 60, 0.04)',
    border: (theme: Theme) =>
      `1px solid ${theme.palette.mode === 'light' ? 'rgba(255, 90, 60, 0.1)' : 'rgba(255, 90, 60, 0.15)'}`,
    maxWidth: 600,
    width: '100%',
  } as const,

  title: {
    mb: 1,
    fontWeight: 700,
    background: 'linear-gradient(135deg, #ff5a3c 0%, #ff7a5c 100%)',
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
    background: 'linear-gradient(135deg, #ff5a3c 0%, #ff7a5c 100%)',
    borderRadius: 3,
    textTransform: 'none',
    boxShadow: (theme: Theme) =>
      theme.palette.mode === 'dark'
        ? '0 4px 12px rgba(255, 90, 60, 0.3)'
        : '0 4px 12px rgba(255, 90, 60, 0.25)',
    transition: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
      background: 'linear-gradient(135deg, #ff5a3c 0%, #ff7a5c 100%)',
      transform: 'translateY(-4px)',
      boxShadow: (theme: Theme) =>
        theme.palette.mode === 'dark'
          ? '0 8px 24px rgba(255, 90, 60, 0.4)'
          : '0 8px 24px rgba(255, 90, 60, 0.35)',
      filter: 'brightness(1.1)',
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
    transition: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)',
  } as const,

  content: {
    flex: 1,
    backgroundColor: 'background.paper',
    borderRadius: { xs: 2, md: 4 },
    boxShadow: (theme: Theme) =>
      theme.palette.mode === 'light'
        ? '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.02)'
        : '0 1px 3px rgba(0,0,0,0.2), 0 4px 12px rgba(0,0,0,0.1)',
    border: (theme: Theme) =>
      theme.palette.mode === 'light'
        ? '1px solid rgba(0,0,0,0.04)'
        : '1px solid rgba(255,255,255,0.04)',
    overflow: 'hidden',
    transition: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)',
  } as const,

  sidebar: {
    '& .MuiModal-root': {
      pointerEvents: 'none',
    },
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
    borderRadius: 2,
    bgcolor: (theme: Theme) =>
      theme.palette.mode === 'light' ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.06)',
  } as const,

  row: {
    display: 'flex',
    alignItems: 'center',
    gap: 2,
    py: 2,
    borderBottom: (theme: Theme) =>
      `1px solid ${theme.palette.mode === 'light' ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.04)'}`,
  } as const,

  contentBox: {
    flex: 1,
  } as const,
}
