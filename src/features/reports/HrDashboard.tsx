import { useState, useEffect } from 'react'
import { Box, Card, CardContent, Typography, Grid, Button } from '@mui/material'
import { useNotify, Loading } from 'react-admin'
import DashboardFilters from './components/DashboardFilters'
import { PieChartCard } from './components/ChartSection'

interface Summary {
  total_employees: number
  new_hires: number
  payroll_total: number
  tasks_completed: number
  leave_days_approved: number
  absence_rate: number
}

interface Breakdown {
  employees_by_department: { department: string; count: number }[]
  leave_days_by_type: { leave_type: string; days: number }[]
  payroll_by_type: { payment_type: string; total_amount: number }[]
  employees_by_job: { job_description: string; count: number }[]
}

export default function HrDashboard() {
  const [summary, setSummary] = useState<Summary | null>(null)
  const [breakdown, setBreakdown] = useState<Breakdown | null>(null)
  const [loading, setLoading] = useState(true)
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [jobId, setJobId] = useState('')
  const notify = useNotify()

  const fetchData = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      const companyId = localStorage.getItem('currentCompanyId')
      const apiUrl = import.meta.env.VITE_API_URL ?? ''
      const params = new URLSearchParams()
      if (dateFrom) params.set('date_from', dateFrom)
      if (dateTo) params.set('date_to', dateTo)
      if (jobId) params.set('job_id', jobId)

      const [summaryRes, breakdownRes] = await Promise.all([
        fetch(`${apiUrl}/companies/${companyId}/dashboard/hr/summary?${params}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${apiUrl}/companies/${companyId}/dashboard/hr/breakdown?${params}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ])
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
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
        Tableau de bord RH
      </Typography>
      <DashboardFilters
        dateFrom={dateFrom}
        dateTo={dateTo}
        onDateFromChange={setDateFrom}
        onDateToChange={setDateTo}
        showJobFilter
        jobId={jobId}
        onJobIdChange={setJobId}
      />
      <Button variant="contained" onClick={fetchData} sx={{ mb: 3 }} size="small">
        Appliquer les filtres
      </Button>

      {summary && (
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={6} sm={3}>
            <Card>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary">
                  Effectif
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  {summary.total_employees}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Card>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary">
                  Nouvelles embauches
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 600, color: 'success.main' }}>
                  {summary.new_hires}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Card>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary">
                  Masse salariale
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 600, color: 'primary.main' }}>
                  {summary.payroll_total?.toLocaleString()} €
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Card>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary">
                  Tâches complétées
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  {summary.tasks_completed}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Card>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary">
                  Jours congés approuvés
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  {summary.leave_days_approved}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Card>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary">
                  Taux d'absence
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 600, color: 'warning.main' }}>
                  {(summary.absence_rate * 100).toFixed(1)}%
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {breakdown && (
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {breakdown.employees_by_department?.length > 0 && (
            <Grid item xs={12} md={4}>
              <PieChartCard
                title="Effectif par département"
                data={breakdown.employees_by_department.map((i) => ({
                  name: i.department,
                  value: i.count,
                }))}
              />
            </Grid>
          )}
          {breakdown.leave_days_by_type?.length > 0 && (
            <Grid item xs={12} md={4}>
              <PieChartCard
                title="Congés par type"
                data={breakdown.leave_days_by_type.map((i) => ({
                  name: i.leave_type,
                  value: i.days,
                }))}
              />
            </Grid>
          )}
          {breakdown.payroll_by_type?.length > 0 && (
            <Grid item xs={12} md={4}>
              <PieChartCard
                title="Paie par type"
                data={breakdown.payroll_by_type.map((i) => ({
                  name: i.payment_type,
                  value: i.total_amount,
                }))}
              />
            </Grid>
          )}
          {breakdown.employees_by_job?.length > 0 && (
            <Grid item xs={12} md={4}>
              <PieChartCard
                title="Effectif par chantier"
                data={breakdown.employees_by_job.map((i) => ({
                  name: i.job_description,
                  value: i.count,
                }))}
              />
            </Grid>
          )}
        </Grid>
      )}
    </Box>
  )
}
