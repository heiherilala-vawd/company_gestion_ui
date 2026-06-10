import { useState, useEffect } from 'react'
import {
  TextField,
  MenuItem,
  Box,
  FormControl,
  InputLabel,
  Select,
  Button,
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material'
import FilterListIcon from '@mui/icons-material/FilterList'
import RefreshIcon from '@mui/icons-material/Refresh'

interface Job {
  id: string
  description: string
}

interface DashboardFiltersProps {
  dateFrom: string
  dateTo: string
  onDateFromChange: (v: string) => void
  onDateToChange: (v: string) => void
  showGranularity?: boolean
  granularity?: string
  onGranularityChange?: (v: string) => void
  showJobFilter?: boolean
  jobId?: string
  onJobIdChange?: (v: string) => void
  onApply?: () => void
}

const granularities = [
  { id: 'day', name: 'J' },
  { id: 'week', name: 'S' },
  { id: 'month', name: 'M' },
  { id: 'quarter', name: 'T' },
  { id: 'year', name: 'A' },
]

export default function DashboardFilters({
  dateFrom,
  dateTo,
  onDateFromChange,
  onDateToChange,
  showGranularity,
  granularity,
  onGranularityChange,
  showJobFilter,
  jobId,
  onJobIdChange,
  onApply,
}: DashboardFiltersProps) {
  const [jobs, setJobs] = useState<Job[]>([])

  useEffect(() => {
    if (!showJobFilter) return
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem('token')
        const companyId = localStorage.getItem('currentCompanyId')
        const userId = localStorage.getItem('user_id')
        const apiUrl = import.meta.env.VITE_API_URL ?? ''
        const res = await fetch(`${apiUrl}/users/${userId}/companies/${companyId}/jobs`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        if (res.ok) {
          const data = await res.json()
          setJobs(Array.isArray(data) ? data : data.data || [])
        }
      } catch {
        /* ignore */
      }
    }
    fetchJobs()
  }, [showJobFilter])

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 1.5,
        mb: 3,
        flexWrap: 'wrap',
        alignItems: 'center',
        p: { xs: 1.5, sm: 2 },
        borderRadius: 1.5,
        border: (theme) =>
          `1px solid ${
            theme.palette.mode === 'light' ? 'rgba(99,102,241,0.12)' : 'rgba(99,102,241,0.2)'
          }`,
        bgcolor: (theme) =>
          theme.palette.mode === 'light' ? 'rgba(99,102,241,0.03)' : 'rgba(99,102,241,0.04)',
      }}
    >
      <FilterListIcon sx={{ fontSize: 18, color: 'text.secondary', mr: 0.5 }} />

      <TextField
        type="date"
        label="Du"
        value={dateFrom}
        onChange={(e) => onDateFromChange(e.target.value)}
        InputLabelProps={{ shrink: true }}
        size="small"
        sx={{ width: { xs: 140, sm: 150 } }}
      />
      <TextField
        type="date"
        label="Au"
        value={dateTo}
        onChange={(e) => onDateToChange(e.target.value)}
        InputLabelProps={{ shrink: true }}
        size="small"
        sx={{ width: { xs: 140, sm: 150 } }}
      />

      {showGranularity && onGranularityChange && (
        <ToggleButtonGroup
          value={granularity || 'month'}
          exclusive
          onChange={(_, val) => val && onGranularityChange(val)}
          size="small"
          sx={{
            '& .MuiToggleButton-root': {
              px: 1.25,
              py: 0.5,
              fontSize: '0.75rem',
              fontWeight: 600,
              border: (theme) =>
                `1px solid ${
                  theme.palette.mode === 'light' ? 'rgba(99,102,241,0.2)' : 'rgba(99,102,241,0.3)'
                }`,
              color: 'text.secondary',
              '&.Mui-selected': {
                bgcolor: 'primary.main',
                color: '#fff',
                '&:hover': { bgcolor: 'primary.dark' },
              },
            },
          }}
        >
          {granularities.map((g) => (
            <ToggleButton key={g.id} value={g.id}>
              {g.name}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      )}

      {showJobFilter && (
        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel>Chantier</InputLabel>
          <Select
            value={jobId || ''}
            label="Chantier"
            onChange={(e) => onJobIdChange?.(e.target.value)}
          >
            <MenuItem value="">Tous</MenuItem>
            {jobs.map((j) => (
              <MenuItem key={j.id} value={j.id}>
                {j.description ?? 'N/A'}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      {onApply && (
        <Button
          variant="contained"
          size="small"
          onClick={onApply}
          startIcon={<RefreshIcon />}
          sx={{ height: 36, whiteSpace: 'nowrap', ml: 'auto' }}
        >
          Actualiser
        </Button>
      )}
    </Box>
  )
}
