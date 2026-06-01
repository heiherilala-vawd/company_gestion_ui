import { useState, useEffect } from 'react'
import { TextField, MenuItem, Box, FormControl, InputLabel, Select } from '@mui/material'

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
}

const granularities = [
  { id: 'day', name: 'Jour' },
  { id: 'week', name: 'Semaine' },
  { id: 'month', name: 'Mois' },
  { id: 'quarter', name: 'Trimestre' },
  { id: 'year', name: 'Année' },
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
}: DashboardFiltersProps) {
  const [jobs, setJobs] = useState<Job[]>([])

  useEffect(() => {
    if (!showJobFilter) return
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem('token')
        const companyId = localStorage.getItem('currentCompanyId')
        const apiUrl = import.meta.env.VITE_API_URL ?? ''
        const res = await fetch(`${apiUrl}/companies/${companyId}/jobs`, {
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
    <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap', alignItems: 'center' }}>
      <TextField
        type="date"
        label="Du"
        value={dateFrom}
        onChange={(e) => onDateFromChange(e.target.value)}
        InputLabelProps={{ shrink: true }}
        size="small"
        sx={{ width: 160 }}
      />
      <TextField
        type="date"
        label="Au"
        value={dateTo}
        onChange={(e) => onDateToChange(e.target.value)}
        InputLabelProps={{ shrink: true }}
        size="small"
        sx={{ width: 160 }}
      />
      {showGranularity && (
        <TextField
          select
          label="Granularité"
          value={granularity || 'month'}
          onChange={(e) => onGranularityChange?.(e.target.value)}
          size="small"
          sx={{ width: 160 }}
        >
          {granularities.map((g) => (
            <MenuItem key={g.id} value={g.id}>
              {g.name}
            </MenuItem>
          ))}
        </TextField>
      )}
      {showJobFilter && (
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel>Chantier</InputLabel>
          <Select
            value={jobId || ''}
            label="Chantier"
            onChange={(e) => onJobIdChange?.(e.target.value)}
          >
            <MenuItem value="">Tous</MenuItem>
            {jobs.map((j) => (
              <MenuItem key={j.id} value={j.id}>
                {j.description}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </Box>
  )
}
