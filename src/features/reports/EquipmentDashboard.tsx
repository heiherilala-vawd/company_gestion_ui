import { useState, useEffect } from 'react'
import {
  Box,
  Card,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material'
import { useNotify, Loading } from 'react-admin'
import DashboardFilters from './components/DashboardFilters'
import { PieChartCard } from './components/ChartSection'
import { dashboardStyles } from '../../style/components'

interface Summary {
  total_equipment: number
  under_maintenance: number
  total_rental_cost: number
  total_repair_cost: number
}

interface Breakdown {
  equipment_by_type: { type: string; count: number }[]
  equipment_by_warehouse: { warehouse: string; count: number }[]
  equipment_due_maintenance: {
    equipment_name: string
    next_maintenance_date: string
    warehouse: string
  }[]
}

const metrics = [
  {
    key: 'total_equipment',
    label: 'Total équipements',
    color: 'primary.main',
    fmt: (v: number) => `${v ?? 0}`,
  },
  {
    key: 'under_maintenance',
    label: 'En maintenance',
    color: 'error.main',
    fmt: (v: number) => `${v ?? 0}`,
  },
  {
    key: 'total_rental_cost',
    label: 'Coût location',
    color: 'warning.main',
    fmt: (v: number) => `${(v ?? 0)?.toLocaleString()} Ar`,
  },
  {
    key: 'total_repair_cost',
    label: 'Coût réparation',
    color: 'info.main',
    fmt: (v: number) => `${(v ?? 0)?.toLocaleString()} Ar`,
  },
] as const

export default function EquipmentDashboard() {
  const [summary, setSummary] = useState<Summary | null>(null)
  const [breakdown, setBreakdown] = useState<Breakdown | null>(null)
  const [loading, setLoading] = useState(true)
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const notify = useNotify()

  const fetchData = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      const companyId = localStorage.getItem('currentCompanyId')
      const userId = localStorage.getItem('user_id')
      const apiUrl = import.meta.env.VITE_API_URL ?? ''
      const params = new URLSearchParams()
      if (dateFrom) params.set('date_from', dateFrom)
      if (dateTo) params.set('date_to', dateTo)

      const baseUrl = `${apiUrl}/users/${userId}/companies/${companyId}/dashboard/equipments`
      const [summaryRes, breakdownRes] = await Promise.all([
        fetch(`${baseUrl}/summary?${params}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${baseUrl}/breakdown?${params}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ])
      if (!summaryRes.ok && !breakdownRes.ok) throw new Error('Erreur API')
      if (summaryRes.ok) setSummary(await summaryRes.json())
      if (breakdownRes.ok) setBreakdown(await breakdownRes.json())
    } catch (err) {
      notify(`Erreur: ${err instanceof Error ? err.message : 'Erreur inconnue'}`, { type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loading) return <Loading loadingSecondary="Chargement du tableau de bord équipements..." />

  return (
    <Box sx={dashboardStyles.container}>
      <Box sx={dashboardStyles.header}>
        <Typography sx={dashboardStyles.title}>
          <Box component="span" sx={dashboardStyles.titleAccent}>
            Équipements
          </Box>
        </Typography>
        <Typography sx={dashboardStyles.subtitle}>
          Tableau de bord — Vue d&apos;ensemble du parc
        </Typography>
      </Box>

      <DashboardFilters
        dateFrom={dateFrom}
        dateTo={dateTo}
        onDateFromChange={setDateFrom}
        onDateToChange={setDateTo}
        onApply={fetchData}
      />

      {summary && (
        <Card sx={{ ...dashboardStyles.metricsCard, mb: 4 }}>
          <Box sx={dashboardStyles.metricsGrid}>
            {metrics.map((m) => (
              <Box key={m.key}>
                <Typography sx={dashboardStyles.metricsLabel}>{m.label}</Typography>
                <Typography sx={{ ...dashboardStyles.metricsValue, color: m.color }}>
                  {m.fmt(summary[m.key as keyof Summary] as number)}
                </Typography>
              </Box>
            ))}
          </Box>
        </Card>
      )}

      {breakdown && (
        <Grid container spacing={2.5} sx={dashboardStyles.chartGrid}>
          {breakdown.equipment_by_type?.length > 0 && (
            <Grid item xs={12} md={4}>
              <PieChartCard
                title="Équipements par type"
                data={breakdown.equipment_by_type.map((i) => ({
                  name: i.type ?? 'N/A',
                  value: i.count ?? 0,
                }))}
              />
            </Grid>
          )}
          {breakdown.equipment_by_warehouse?.length > 0 && (
            <Grid item xs={12} md={4}>
              <PieChartCard
                title="Équipements par entrepôt"
                data={breakdown.equipment_by_warehouse.map((i) => ({
                  name: i.warehouse ?? 'N/A',
                  value: i.count ?? 0,
                }))}
              />
            </Grid>
          )}
          {breakdown.equipment_due_maintenance?.length > 0 && (
            <Grid item xs={12} md={4}>
              <Card sx={dashboardStyles.chartCard}>
                <Box
                  sx={{ p: { xs: 2, sm: 3 }, flex: 1, display: 'flex', flexDirection: 'column' }}
                >
                  <Typography
                    sx={{
                      color: 'text.secondary',
                      fontWeight: 600,
                      fontSize: '0.75rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      mb: 1.5,
                    }}
                  >
                    Maintenance à prévoir
                  </Typography>
                  <TableContainer
                    component={Paper}
                    sx={{
                      borderRadius: 1.5,
                      border: (theme) => `1px solid ${theme.palette.divider}`,
                      boxShadow: 'none',
                      flex: 1,
                    }}
                  >
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell
                            sx={{
                              fontWeight: 600,
                              fontSize: '0.7rem',
                              textTransform: 'uppercase',
                              letterSpacing: '0.05em',
                              color: 'text.secondary',
                            }}
                          >
                            Équipement
                          </TableCell>
                          <TableCell
                            sx={{
                              fontWeight: 600,
                              fontSize: '0.7rem',
                              textTransform: 'uppercase',
                              letterSpacing: '0.05em',
                              color: 'text.secondary',
                            }}
                          >
                            Entrepôt
                          </TableCell>
                          <TableCell
                            sx={{
                              fontWeight: 600,
                              fontSize: '0.7rem',
                              textTransform: 'uppercase',
                              letterSpacing: '0.05em',
                              color: 'text.secondary',
                            }}
                            align="right"
                          >
                            Prochaine maintenance
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {breakdown.equipment_due_maintenance.map((m, i) => (
                          <TableRow key={i}>
                            <TableCell sx={{ fontSize: '0.8125rem' }}>
                              {m.equipment_name ?? 'N/A'}
                            </TableCell>
                            <TableCell sx={{ fontSize: '0.8125rem' }}>
                              {m.warehouse ?? 'N/A'}
                            </TableCell>
                            <TableCell sx={{ fontSize: '0.8125rem' }} align="right">
                              {m.next_maintenance_date ?? 'N/A'}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              </Card>
            </Grid>
          )}
        </Grid>
      )}
    </Box>
  )
}
