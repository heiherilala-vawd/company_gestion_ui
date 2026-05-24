import { useState, useEffect } from 'react'
import {
  Box,
  Typography,
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

interface LeaveBalance {
  id: string
  user: { id: string; first_name: string; last_name: string }
  total_days: number
  used_days: number
  remaining_days: number
}

export default function LeaveBalanceList() {
  const [year, setYear] = useState<number>(new Date().getFullYear())
  const [data, setData] = useState<LeaveBalance[]>([])
  const [loading, setLoading] = useState(true)
  const notify = useNotify()

  const fetchBalances = async (selectedYear: number) => {
    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      const companyId = localStorage.getItem('currentCompanyId')
      const apiUrl = import.meta.env.VITE_API_URL ?? ''
      const url = `${apiUrl}/companies/${companyId}/leave_balances?year=${selectedYear}`

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`)

      const result: LeaveBalance[] = await response.json()
      setData(result)
    } catch (err) {
      notify(`Erreur: ${err instanceof Error ? err.message : 'Erreur inconnue'}`, {
        type: 'error',
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBalances(year)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loading) return <Loading loadingSecondary="Chargement des soldes de congés..." />

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
        Soldes de congés
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, mb: 3, alignItems: 'center' }}>
        <TextField
          type="number"
          label="Année"
          value={year}
          onChange={(e) => setYear(parseInt(e.target.value) || new Date().getFullYear())}
          sx={{ width: 150 }}
        />
        <Button variant="contained" onClick={() => fetchBalances(year)} disabled={loading}>
          Rechercher
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Employé</TableCell>
              <TableCell align="right">Jours totaux</TableCell>
              <TableCell align="right">Jours pris</TableCell>
              <TableCell align="right">Jours restants</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  {item.user?.first_name} {item.user?.last_name}
                </TableCell>
                <TableCell align="right">{item.total_days}</TableCell>
                <TableCell align="right">{item.used_days}</TableCell>
                <TableCell align="right" sx={{ fontWeight: 600 }}>
                  {item.remaining_days}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}
