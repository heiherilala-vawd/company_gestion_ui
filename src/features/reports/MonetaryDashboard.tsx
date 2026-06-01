import { useState, useEffect } from 'react'
import { Box, Card, CardContent, Typography, Grid, Button } from '@mui/material'
import { useNotify, Loading } from 'react-admin'
import DashboardFilters from './components/DashboardFilters'
import { PieChartCard, LineChartCard } from './components/ChartSection'

interface MonetarySummary {
  total_revenue: number
  total_expenses: number
  gross_margin: number
  expected_revenue: number
  receivables: number
  fixed_costs_total: number
}

interface MonetaryBreakdown {
  expenses_by_type: { type: string; total: number }[]
  revenue_by_job: { job_description: string; total: number }[]
  profitability_by_job: { job_description: string; profit: number }[]
}

interface TimeSeriesData {
  intervals: { label: string; value: number }[]
  cumulative: number[]
  total: number
}

export default function MonetaryDashboard() {
  const [summary, setSummary] = useState<MonetarySummary | null>(null)
  const [breakdown, setBreakdown] = useState<MonetaryBreakdown | null>(null)
  const [loading, setLoading] = useState(true)
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [granularity, setGranularity] = useState('month')
  const [jobId, setJobId] = useState('')
  const [revenue, setRevenue] = useState<TimeSeriesData | null>(null)
  const [expenses, setExpenses] = useState<TimeSeriesData | null>(null)
  const [cashflow, setCashflow] = useState<TimeSeriesData | null>(null)
  const [profit, setProfit] = useState<TimeSeriesData | null>(null)
  const notify = useNotify()

  const fetchData = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      const companyId = localStorage.getItem('currentCompanyId')
      const apiUrl = import.meta.env.VITE_API_URL ?? ''
      const baseParams = new URLSearchParams()
      if (dateFrom) baseParams.set('date_from', dateFrom)
      if (dateTo) baseParams.set('date_to', dateTo)
      if (granularity) baseParams.set('granularity', granularity)
      if (jobId) baseParams.set('job_id', jobId)

      const qs = baseParams.toString()
      const baseUrl = `${apiUrl}/companies/${companyId}/dashboard/monetary`

      const [summaryRes, breakdownRes, revenueRes, expensesRes, cashflowRes, profitRes] =
        await Promise.all([
          fetch(`${baseUrl}/summary?${qs}`, { headers: { Authorization: `Bearer ${token}` } }),
          fetch(`${baseUrl}/breakdown?${qs}`, { headers: { Authorization: `Bearer ${token}` } }),
          fetch(`${baseUrl}/revenue?${qs}`, { headers: { Authorization: `Bearer ${token}` } }),
          fetch(`${baseUrl}/expenses?${qs}`, { headers: { Authorization: `Bearer ${token}` } }),
          fetch(`${baseUrl}/cashflow?${qs}`, { headers: { Authorization: `Bearer ${token}` } }),
          fetch(`${baseUrl}/profit?${qs}`, { headers: { Authorization: `Bearer ${token}` } }),
        ])

      if (summaryRes.ok) setSummary(await summaryRes.json())
      if (breakdownRes.ok) setBreakdown(await breakdownRes.json())
      if (revenueRes.ok) setRevenue(await revenueRes.json())
      if (expensesRes.ok) setExpenses(await expensesRes.json())
      if (cashflowRes.ok) setCashflow(await cashflowRes.json())
      if (profitRes.ok) setProfit(await profitRes.json())
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

  const toChartData = (ts: TimeSeriesData | null) =>
    ts?.intervals?.map((i, idx) => ({
      label: i.label,
      value: i.value,
      cumulative: ts.cumulative?.[idx],
    })) || []

  if (loading) return <Loading loadingSecondary="Chargement du tableau de bord monétaire..." />

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
        Tableau de bord monétaire
      </Typography>
      <DashboardFilters
        dateFrom={dateFrom}
        dateTo={dateTo}
        onDateFromChange={setDateFrom}
        onDateToChange={setDateTo}
        showGranularity
        granularity={granularity}
        onGranularityChange={setGranularity}
        showJobFilter
        jobId={jobId}
        onJobIdChange={setJobId}
      />
      <Button variant="contained" onClick={fetchData} sx={{ mb: 3 }} size="small">
        Appliquer les filtres
      </Button>

      {summary && (
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={6} sm={4}>
            <Card>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary">
                  Revenus totaux
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 600, color: 'success.main' }}>
                  {summary.total_revenue?.toLocaleString()} €
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} sm={4}>
            <Card>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary">
                  Dépenses totales
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 600, color: 'error.main' }}>
                  {summary.total_expenses?.toLocaleString()} €
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} sm={4}>
            <Card>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary">
                  Marge brute
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 600,
                    color: (summary.gross_margin ?? 0) >= 0 ? 'success.main' : 'error.main',
                  }}
                >
                  {summary.gross_margin?.toLocaleString()} €
                  {summary.total_revenue
                    ? ` (${((summary.gross_margin / summary.total_revenue) * 100).toFixed(1)}%)`
                    : ''}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} sm={4}>
            <Card>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary">
                  Revenus attendus
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 600, color: 'info.main' }}>
                  {summary.expected_revenue?.toLocaleString()} €
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} sm={4}>
            <Card>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary">
                  Créances
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 600, color: 'warning.main' }}>
                  {summary.receivables?.toLocaleString()} €
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} sm={4}>
            <Card>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary">
                  Charges fixes
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  {summary.fixed_costs_total?.toLocaleString()} €
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {breakdown && (
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {breakdown.expenses_by_type?.length > 0 && (
            <Grid item xs={12} md={4}>
              <PieChartCard
                title="Dépenses par type"
                data={breakdown.expenses_by_type.map((i) => ({ name: i.type, value: i.total }))}
              />
            </Grid>
          )}
          {breakdown.revenue_by_job?.length > 0 && (
            <Grid item xs={12} md={4}>
              <PieChartCard
                title="Revenus par chantier"
                data={breakdown.revenue_by_job.map((i) => ({
                  name: i.job_description,
                  value: i.total,
                }))}
              />
            </Grid>
          )}
          {breakdown.profitability_by_job?.length > 0 && (
            <Grid item xs={12} md={4}>
              <PieChartCard
                title="Profit par chantier"
                data={breakdown.profitability_by_job.map((i) => ({
                  name: i.job_description,
                  value: i.profit,
                }))}
              />
            </Grid>
          )}
        </Grid>
      )}

      <Typography variant="h5" sx={{ mb: 2, fontWeight: 600, mt: 2 }}>
        Évolution temporelle
      </Typography>
      <Grid container spacing={3}>
        {revenue && (
          <Grid item xs={12} md={6}>
            <LineChartCard title="Revenus" data={toChartData(revenue)} total={revenue.total} />
          </Grid>
        )}
        {expenses && (
          <Grid item xs={12} md={6}>
            <LineChartCard title="Dépenses" data={toChartData(expenses)} total={expenses.total} />
          </Grid>
        )}
        {cashflow && (
          <Grid item xs={12} md={6}>
            <LineChartCard
              title="Flux de trésorerie"
              data={toChartData(cashflow)}
              total={cashflow.total}
            />
          </Grid>
        )}
        {profit && (
          <Grid item xs={12} md={6}>
            <LineChartCard title="Profit" data={toChartData(profit)} total={profit.total} />
          </Grid>
        )}
      </Grid>
    </Box>
  )
}
