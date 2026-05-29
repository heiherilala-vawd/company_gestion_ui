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
  TextField,
  Button,
} from '@mui/material'
import { useNotify, Loading } from 'react-admin'

interface JobFinancials {
  job: { id: string; description: string }
  total_income: number
  total_expense: number
  net_profit: number
}

interface YearlyReportData {
  year: number
  jobs_with_financials: JobFinancials[]
  summary: {
    total_income: number
    total_expense: number
    net_profit: number
  }
}

export default function YearlyReport() {
  const [year, setYear] = useState<number>(new Date().getFullYear())
  const [data, setData] = useState<YearlyReportData | null>(null)
  const [loading, setLoading] = useState(false)
  const notify = useNotify()

  const fetchReport = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      const companyId = localStorage.getItem('currentCompanyId')
      const apiUrl = import.meta.env.VITE_API_URL ?? ''
      const url = `${apiUrl}/companies/${companyId}/yearly_report?year=${year}`

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`)

      const result: YearlyReportData = await response.json()
      setData(result)
    } catch (err) {
      notify(`Erreur: ${err instanceof Error ? err.message : 'Erreur inconnue'}`, { type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchReport()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
        Rapport annuel
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, mb: 3, alignItems: 'center' }}>
        <TextField
          type="number"
          label="Année"
          value={year}
          onChange={(e) => setYear(parseInt(e.target.value) || new Date().getFullYear())}
          sx={{ width: 150 }}
        />
        <Button variant="contained" onClick={fetchReport} disabled={loading}>
          Rechercher
        </Button>
      </Box>

      {loading && <Loading loadingSecondary="Chargement du rapport..." />}

      {data && (
        <>
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={4}>
              <Card>
                <CardContent>
                  <Typography variant="subtitle2" color="text.secondary">
                    Revenus totaux
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 600, color: 'success.main' }}>
                    {data.summary.total_income.toLocaleString()} €
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card>
                <CardContent>
                  <Typography variant="subtitle2" color="text.secondary">
                    Dépenses totales
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 600, color: 'error.main' }}>
                    {data.summary.total_expense.toLocaleString()} €
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card>
                <CardContent>
                  <Typography variant="subtitle2" color="text.secondary">
                    Bénéfice net
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 600,
                      color: data.summary.net_profit >= 0 ? 'success.main' : 'error.main',
                    }}
                  >
                    {data.summary.net_profit.toLocaleString()} €
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Travail</TableCell>
                  <TableCell align="right">Revenus</TableCell>
                  <TableCell align="right">Dépenses</TableCell>
                  <TableCell align="right">Bénéfice net</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.jobs_with_financials.map((item) => (
                  <TableRow key={item.job.id}>
                    <TableCell>{item.job.description}</TableCell>
                    <TableCell align="right">{item.total_income.toLocaleString()} €</TableCell>
                    <TableCell align="right">{item.total_expense.toLocaleString()} €</TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        color: item.net_profit >= 0 ? 'success.main' : 'error.main',
                        fontWeight: 600,
                      }}
                    >
                      {item.net_profit.toLocaleString()} €
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </Box>
  )
}
