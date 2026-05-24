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
  Chip,
} from '@mui/material'
import { useNotify, Loading } from 'react-admin'

interface HistoryEntry {
  id: string
  entity_type: string
  entity_id: string
  action: string
  timestamp: string
  user: { id: string; first_name: string; last_name: string }
  changes: string
}

const actionColors: Record<string, string> = {
  CREATE: '#4CAF50',
  UPDATE: '#FF9800',
  DELETE: '#F44336',
}

export default function HistoryPage() {
  const [data, setData] = useState<HistoryEntry[]>([])
  const [loading, setLoading] = useState(true)
  const notify = useNotify()

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem('token')
        const apiUrl = import.meta.env.VITE_API_URL ?? ''
        const url = `${apiUrl}/histories`

        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })

        if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`)

        const result: HistoryEntry[] = await response.json()
        setData(result)
      } catch (err) {
        notify(`Erreur: ${err instanceof Error ? err.message : 'Erreur inconnue'}`, {
          type: 'error',
        })
      } finally {
        setLoading(false)
      }
    }

    fetchHistory()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loading) return <Loading loadingSecondary="Chargement de l'historique..." />

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
        Historique
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Entité</TableCell>
              <TableCell>ID Entité</TableCell>
              <TableCell>Action</TableCell>
              <TableCell>Utilisateur</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((entry) => (
              <TableRow key={entry.id}>
                <TableCell>{new Date(entry.timestamp).toLocaleString()}</TableCell>
                <TableCell>{entry.entity_type}</TableCell>
                <TableCell>{entry.entity_id}</TableCell>
                <TableCell>
                  <Chip
                    label={entry.action}
                    size="small"
                    sx={{
                      backgroundColor: actionColors[entry.action] || '#9E9E9E',
                      color: '#fff',
                      fontWeight: 600,
                    }}
                  />
                </TableCell>
                <TableCell>
                  {entry.user?.first_name} {entry.user?.last_name}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}
