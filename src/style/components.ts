import { SxProps, Theme } from '@mui/material'

export const appBarStyles = {
  selectorBox: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 1,
    px: 1,
    py: 0.5,
  } as const,

  selectorLabel: {
    color: 'white',
    fontWeight: 600,
    fontSize: 11,
    whiteSpace: 'nowrap',
    display: { xs: 'none', sm: 'block' },
  } as const,

  selectorInput: {
    color: 'white',
    fontSize: 12,
  } as const,

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
    fontSize: '0.75rem',
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
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 1,
    px: 1,
    py: 0.5,
    gap: 1,
  } as const,

  selectorLabel: {
    color: 'white',
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
    color: 'white',
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
      backgroundColor: '#f5f5f5',
    },
    '& .MuiDataGrid-columnHeaderTitle': {
      fontWeight: 600,
    },
  } as const,

  cell: {
    fontSize: '0.875rem',
  } as const,

  header: {
    fontWeight: 600,
    backgroundColor: '#f5f5f5',
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
