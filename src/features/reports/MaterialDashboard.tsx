import { useState, useEffect } from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@mui/material'
import { useNotify, Loading } from 'react-admin'
import DashboardFilters from './components/DashboardFilters'
import { PieChartCard } from './components/ChartSection'

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
      const apiUrl = import.meta.env.VITE_API_URL ?? ''
      const params = new URLSearchParams()
      if (dateFrom) params.set('date_from', dateFrom)
      if (dateTo) params.set('date_to', dateTo)

      const [summaryRes, breakdownRes] = await Promise.all([
        fetch(`${apiUrl}/companies/${companyId}/dashboard/materials/summary?${params}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${apiUrl}/companies/${companyId}/dashboard/materials/breakdown?${params}`, {
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
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
        Tableau de bord matériaux
      </Typography>
      <DashboardFilters
        dateFrom={dateFrom}
        dateTo={dateTo}
        onDateFromChange={setDateFrom}
        onDateToChange={setDateTo}
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
                  Valeur stock
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 600, color: 'primary.main' }}>
                  {summary.stock_value_total?.toLocaleString()} €
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Card>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary">
                  Coût consommation
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 600, color: 'error.main' }}>
                  {summary.consumption_cost_total?.toLocaleString()} €
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Card>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary">
                  Total matériaux
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  {summary.total_materials_count}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Card>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary">
                  Expiration proche
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 600, color: 'warning.main' }}>
                  {summary.expiring_count}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {breakdown && (
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {breakdown.top5_stock_value?.length > 0 && (
            <Grid item xs={12} md={6}>
              <PieChartCard
                title="Top 5 valeur de stock"
                data={breakdown.top5_stock_value.map((i) => ({
                  name: i.material_name,
                  value: i.value,
                }))}
              />
            </Grid>
          )}
          {breakdown.top5_consumption_cost?.length > 0 && (
            <Grid item xs={12} md={6}>
              <PieChartCard
                title="Top 5 coût consommation"
                data={breakdown.top5_consumption_cost.map((i) => ({
                  name: i.material_name,
                  value: i.cost,
                }))}
              />
            </Grid>
          )}
          {breakdown.stock_value_by_warehouse?.length > 0 && (
            <Grid item xs={12} md={6}>
              <PieChartCard
                title="Valeur stock par entrepôt"
                data={breakdown.stock_value_by_warehouse.map((i) => ({
                  name: i.warehouse,
                  value: i.total_value,
                }))}
              />
            </Grid>
          )}
          {breakdown.expiring_materials?.length > 0 && (
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                    Matériaux proches d'expiration
                  </Typography>
                  <TableContainer component={Paper}>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Matériau</TableCell>
                          <TableCell>Entrepôt</TableCell>
                          <TableCell>Quantité</TableCell>
                          <TableCell>Expire le</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {breakdown.expiring_materials.map((m, i) => (
                          <TableRow key={i}>
                            <TableCell>{m.material_name}</TableCell>
                            <TableCell>{m.warehouse}</TableCell>
                            <TableCell>{m.stock_quantity}</TableCell>
                            <TableCell>{m.expiry_date}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            </Grid>
          )}
        </Grid>
      )}
    </Box>
  )
}
