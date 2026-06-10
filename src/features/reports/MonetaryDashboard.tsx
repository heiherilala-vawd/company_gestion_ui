import { useState, useEffect } from 'react'
import { Box, Card, Typography, Grid } from '@mui/material'
import { useNotify, Loading } from 'react-admin'
import DashboardFilters from './components/DashboardFilters'
import { PieChartCard, BarChartCard } from './components/ChartSection'
import { dashboardStyles } from '../../style/components'

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

const cleanIntervals = (ts: TimeSeriesData | null) =>
  ts
    ? {
        ...ts,
        intervals: ts.intervals.map((iv) => ({ label: iv.label ?? 'N/A', value: iv.value ?? 0 })),
      }
    : null

const fmtCurrency = (v: number) => `${(v ?? 0)?.toLocaleString()} Ar`

const metrics = [
  {
    key: 'total_revenue',
    label: 'Revenus',
    color: 'success.main',
    fmt: fmtCurrency,
  },
  {
    key: 'total_expenses',
    label: 'Dépenses',
    color: 'error.main',
    fmt: fmtCurrency,
  },
  {
    key: 'gross_margin',
    label: 'Marge brute',
    getColor: (v: number) => (v >= 0 ? 'success.main' : 'error.main'),
    fmt: (v: number, s: MonetarySummary) =>
      `${(v ?? 0)?.toLocaleString()} Ar${s.total_revenue ? ` (${((v / s.total_revenue) * 100).toFixed(1)}%)` : ''}`,
  },
  {
    key: 'expected_revenue',
    label: 'Revenus attendus',
    color: 'info.main',
    fmt: fmtCurrency,
  },
  {
    key: 'receivables',
    label: 'Créances',
    color: 'warning.main',
    fmt: fmtCurrency,
  },
  {
    key: 'fixed_costs_total',
    label: 'Charges fixes',
    color: 'text.secondary',
    fmt: fmtCurrency,
  },
] as const

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
      const userId = localStorage.getItem('user_id')
      const apiUrl = import.meta.env.VITE_API_URL ?? ''
      const baseParams = new URLSearchParams()
      if (dateFrom) baseParams.set('date_from', dateFrom)
      if (dateTo) baseParams.set('date_to', dateTo)
      if (granularity) baseParams.set('granularity', granularity)
      if (jobId) baseParams.set('job_id', jobId)

      const qs = baseParams.toString()
      const baseUrl = `${apiUrl}/users/${userId}/companies/${companyId}/dashboard/monetary`

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

  if (loading)
    return <Loading loadingSecondary="Chargement du tableau de bord base de déplacement..." />

  return (
    <Box sx={dashboardStyles.container}>
      <Box sx={dashboardStyles.header}>
        <Typography sx={dashboardStyles.title}>
          <Box component="span" sx={dashboardStyles.titleAccent}>
            Base de déplacement
          </Box>
        </Typography>
        <Typography sx={dashboardStyles.subtitle}>
          Tableau de bord — Vue d&apos;ensemble financière
        </Typography>
      </Box>

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
        onApply={fetchData}
      />

      {summary && (
        <Card sx={{ ...dashboardStyles.metricsCard, mb: 4 }}>
          <Box sx={dashboardStyles.metricsGrid}>
            {metrics.map((m) => {
              const val = summary[m.key as keyof MonetarySummary] as number
              const color = 'getColor' in m ? m.getColor(val) : m.color
              return (
                <Box key={m.key}>
                  <Typography sx={dashboardStyles.metricsLabel}>{m.label}</Typography>
                  <Typography sx={{ ...dashboardStyles.metricsValue, color }}>
                    {m.fmt(val, summary)}
                  </Typography>
                </Box>
              )
            })}
          </Box>
        </Card>
      )}

      {breakdown && (
        <Grid container spacing={2.5} sx={dashboardStyles.chartGrid}>
          {breakdown.expenses_by_type?.length > 0 && (
            <Grid item xs={12} md={4}>
              <PieChartCard
                title="Dépenses par type"
                data={breakdown.expenses_by_type.map((i) => ({
                  name: i.type ?? 'N/A',
                  value: i.total ?? 0,
                }))}
              />
            </Grid>
          )}
          {breakdown.revenue_by_job?.length > 0 && (
            <Grid item xs={12} md={4}>
              <PieChartCard
                title="Revenus par chantier"
                data={breakdown.revenue_by_job.map((i) => ({
                  name: i.job_description ?? 'N/A',
                  value: i.total ?? 0,
                }))}
              />
            </Grid>
          )}
          {breakdown.profitability_by_job?.length > 0 && (
            <Grid item xs={12} md={4}>
              <PieChartCard
                title="Profit par chantier"
                data={breakdown.profitability_by_job.map((i) => ({
                  name: i.job_description ?? 'N/A',
                  value: i.profit ?? 0,
                }))}
              />
            </Grid>
          )}
        </Grid>
      )}

      <Typography sx={{ ...dashboardStyles.sectionTitle, mt: 2 }}>Évolution temporelle</Typography>
      <Grid container spacing={2.5}>
        {revenue && (
          <Grid item xs={12} md={6}>
            <BarChartCard
              title="Revenus"
              data={cleanIntervals(revenue)!.intervals}
              total={cleanIntervals(revenue)!.total}
              unit="Ar"
            />
          </Grid>
        )}
        {expenses && (
          <Grid item xs={12} md={6}>
            <BarChartCard
              title="Dépenses"
              data={cleanIntervals(expenses)!.intervals}
              total={cleanIntervals(expenses)!.total}
              unit="Ar"
            />
          </Grid>
        )}
        {cashflow && (
          <Grid item xs={12} md={6}>
            <BarChartCard
              title="Flux de trésorerie"
              data={cleanIntervals(cashflow)!.intervals}
              total={cleanIntervals(cashflow)!.total}
              unit="Ar"
            />
          </Grid>
        )}
        {profit && (
          <Grid item xs={12} md={6}>
            <BarChartCard
              title="Profit"
              data={cleanIntervals(profit)!.intervals}
              total={cleanIntervals(profit)!.total}
              unit="Ar"
            />
          </Grid>
        )}
      </Grid>
    </Box>
  )
}
