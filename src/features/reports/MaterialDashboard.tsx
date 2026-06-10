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
import { PieChartCard, BarChartCard } from './components/ChartSection'
import { dashboardStyles } from '../../style/components'

interface Summary {
  stock_value_total: number
  consumption_cost_total: number
  total_materials_count: number
  expiring_count: number
}

interface Breakdown {
  top5_stock_value: { material_name: string; value: number }[]
  top5_consumption_cost: { material_name: string; cost: number }[]
  stock_value_by_warehouse: { warehouse: string; total_value: number }[]
  expiring_materials: {
    material_name: string
    expiry_date: string
    stock_quantity: number
    warehouse: string
  }[]
}

const metrics = [
  {
    key: 'stock_value_total',
    label: 'Valeur stock',
    color: 'primary.main',
    fmt: (v: number) => `${(v ?? 0)?.toLocaleString()} Ar`,
  },
  {
    key: 'consumption_cost_total',
    label: 'Coût consommation',
    color: 'error.main',
    fmt: (v: number) => `${(v ?? 0)?.toLocaleString()} Ar`,
  },
  {
    key: 'total_materials_count',
    label: 'Total matériaux',
    color: 'info.main',
    fmt: (v: number) => `${v ?? 0}`,
  },
  {
    key: 'expiring_count',
    label: 'Expiration proche',
    color: 'warning.main',
    fmt: (v: number) => `${v ?? 0}`,
  },
] as const

export default function MaterialDashboard() {
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

      const baseUrl = `${apiUrl}/users/${userId}/companies/${companyId}/dashboard/materials`
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

  if (loading) return <Loading loadingSecondary="Chargement du tableau de bord matériaux..." />

  return (
    <Box sx={dashboardStyles.container}>
      <Box sx={dashboardStyles.header}>
        <Typography sx={dashboardStyles.title}>
          <Box component="span" sx={dashboardStyles.titleAccent}>
            Matériaux
          </Box>
        </Typography>
        <Typography sx={dashboardStyles.subtitle}>
          Tableau de bord — Vue d&apos;ensemble des stocks et consommations
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
          {breakdown.top5_stock_value?.length > 0 && (
            <Grid item xs={12} md={6}>
              <BarChartCard
                title="Top 5 valeur de stock"
                data={breakdown.top5_stock_value.map((i) => ({
                  label: i.material_name ?? 'N/A',
                  value: i.value ?? 0,
                }))}
                unit="Ar"
              />
            </Grid>
          )}
          {breakdown.top5_consumption_cost?.length > 0 && (
            <Grid item xs={12} md={6}>
              <BarChartCard
                title="Top 5 coût consommation"
                data={breakdown.top5_consumption_cost.map((i) => ({
                  label: i.material_name ?? 'N/A',
                  value: i.cost ?? 0,
                }))}
                unit="Ar"
              />
            </Grid>
          )}
          {breakdown.stock_value_by_warehouse?.length > 0 && (
            <Grid item xs={12} md={6}>
              <PieChartCard
                title="Valeur stock par entrepôt"
                data={breakdown.stock_value_by_warehouse.map((i) => ({
                  name: i.warehouse ?? 'N/A',
                  value: i.total_value ?? 0,
                }))}
              />
            </Grid>
          )}
          {breakdown.expiring_materials?.length > 0 && (
            <Grid item xs={12} md={6}>
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
                    Matériaux proches d'expiration
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
                            Matériau
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
                            Qté
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
                            Expire le
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {breakdown.expiring_materials.map((m, i) => (
                          <TableRow key={i}>
                            <TableCell sx={{ fontSize: '0.8125rem' }}>
                              {m.material_name ?? 'N/A'}
                            </TableCell>
                            <TableCell sx={{ fontSize: '0.8125rem' }}>
                              {m.warehouse ?? 'N/A'}
                            </TableCell>
                            <TableCell sx={{ fontSize: '0.8125rem' }} align="right">
                              {m.stock_quantity ?? 0}
                            </TableCell>
                            <TableCell sx={{ fontSize: '0.8125rem' }} align="right">
                              {m.expiry_date ?? 'N/A'}
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
