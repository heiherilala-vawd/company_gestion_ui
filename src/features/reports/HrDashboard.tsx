import { useState, useEffect } from 'react'
import { Box, Card, Typography, Grid } from '@mui/material'
import { useNotify, Loading } from 'react-admin'
import DashboardFilters from './components/DashboardFilters'
import { PieChartCard, BarChartCard } from './components/ChartSection'
import { dashboardStyles } from '../../style/components'

interface Summary {
  total_employees: number
  active_employees: number
  pending_leaves: number
  total_leaves_taken: number
}

interface Breakdown {
  employees_by_department: { department_name: string; count: number }[]
  leaves_by_type: { leave_type: string; count: number }[]
  leaves_by_month: { month: string; count: number }[]
}

const fmtCount = (v: number) => `${v ?? 0}`

const metrics = [
  { key: 'total_employees', label: 'Total employés', color: 'primary.main', fmt: fmtCount },
  { key: 'active_employees', label: 'Actifs', color: 'success.main', fmt: fmtCount },
  { key: 'pending_leaves', label: 'Congés en attente', color: 'warning.main', fmt: fmtCount },
  { key: 'total_leaves_taken', label: 'Congés pris', color: 'info.main', fmt: fmtCount },
] as const

export default function HrDashboard() {
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

      const baseUrl = `${apiUrl}/users/${userId}/companies/${companyId}/dashboard/hr`
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

  if (loading) return <Loading loadingSecondary="Chargement du tableau de bord RH..." />

  return (
    <Box sx={dashboardStyles.container}>
      <Box sx={dashboardStyles.header}>
        <Typography sx={dashboardStyles.title}>
          <Box component="span" sx={dashboardStyles.titleAccent}>
            Ressources Humaines
          </Box>
        </Typography>
        <Typography sx={dashboardStyles.subtitle}>
          Tableau de bord — Vue d&apos;ensemble des employés et congés
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
          {breakdown.employees_by_department?.length > 0 && (
            <Grid item xs={12} md={4}>
              <BarChartCard
                title="Employés par département"
                data={breakdown.employees_by_department.map((i) => ({
                  label: i.department_name ?? 'N/A',
                  value: i.count ?? 0,
                }))}
              />
            </Grid>
          )}
          {breakdown.leaves_by_type?.length > 0 && (
            <Grid item xs={12} md={4}>
              <PieChartCard
                title="Congés par type"
                data={breakdown.leaves_by_type.map((i) => ({
                  name: i.leave_type ?? 'N/A',
                  value: i.count ?? 0,
                }))}
              />
            </Grid>
          )}
          {breakdown.leaves_by_month?.length > 0 && (
            <Grid item xs={12} md={4}>
              <BarChartCard
                title="Congés par mois"
                data={breakdown.leaves_by_month.map((i) => ({
                  label: i.month ?? 'N/A',
                  value: i.count ?? 0,
                }))}
              />
            </Grid>
          )}
        </Grid>
      )}
    </Box>
  )
}
