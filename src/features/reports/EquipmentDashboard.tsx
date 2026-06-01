import { useState, useEffect } from 'react'
import { Box, Card, CardContent, Typography, Grid, Button } from '@mui/material'
import { useNotify, Loading } from 'react-admin'
import DashboardFilters from './components/DashboardFilters'
import { PieChartCard } from './components/ChartSection'

interface Summary {
  total_equipment: number
  available_count: number
  broken_count: number
  lost_count: number
  avg_age_years: number
  total_usage_hours: number
}

interface Breakdown {
  category_distribution: { category: string; count: number }[]
  status_breakdown: { status: string; count: number }[]
  usage_by_job: { job_description: string; hours_used: number }[]
}

export default function EquipmentDashboard() {
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
        fetch(`${apiUrl}/companies/${companyId}/dashboard/equipment/summary?${params}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${apiUrl}/companies/${companyId}/dashboard/equipment/breakdown?${params}`, {
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

  if (loading) return <Loading loadingSecondary="Chargement du tableau de bord équipements..." />

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
        Tableau de bord équipements
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
                  Total
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  {summary.total_equipment}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Card>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary">
                  Disponibles
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 600, color: 'success.main' }}>
                  {summary.available_count}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Card>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary">
                  En panne
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 600, color: 'error.main' }}>
                  {summary.broken_count}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Card>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary">
                  Perdus
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 600, color: 'warning.main' }}>
                  {summary.lost_count}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Card>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary">
                  Âge moyen
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  {summary.avg_age_years?.toFixed(1)} ans
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Card>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary">
                  Heures d'utilisation
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  {summary.total_usage_hours?.toLocaleString()} h
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {breakdown && (
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {breakdown.category_distribution?.length > 0 && (
            <Grid item xs={12} md={4}>
              <PieChartCard
                title="Par catégorie"
                data={breakdown.category_distribution.map((i) => ({
                  name: i.category,
                  value: i.count,
                }))}
              />
            </Grid>
          )}
          {breakdown.status_breakdown?.length > 0 && (
            <Grid item xs={12} md={4}>
              <PieChartCard
                title="Par statut"
                data={breakdown.status_breakdown.map((i) => ({ name: i.status, value: i.count }))}
              />
            </Grid>
          )}
          {breakdown.usage_by_job?.length > 0 && (
            <Grid item xs={12} md={4}>
              <PieChartCard
                title="Utilisation par chantier"
                data={breakdown.usage_by_job.map((i) => ({
                  name: i.job_description,
                  value: i.hours_used,
                }))}
              />
            </Grid>
          )}
        </Grid>
      )}
    </Box>
  )
}
