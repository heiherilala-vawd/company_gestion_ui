import { SxProps, Theme } from '@mui/material'
import { alpha } from '@mui/material/styles'

export const appBarStyles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
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
    backgroundColor: 'white',
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
    borderRadius: 2,
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

export const skeletonStyles = {
  card: {
    p: { xs: 2, md: 3 },
    borderRadius: 4,
    mb: 2,
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    gap: 2,
    mb: 2,
  },
}
