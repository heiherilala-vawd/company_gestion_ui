import { useState } from 'react'
import { useNotify, useGetList } from 'react-admin'
import {
  Card,
  CardContent,
  Box,
  Typography,
  Button,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useNavigate } from 'react-router'
import { getMiddleUrl } from '../config/dynamicResources'
import { operationFormStyles } from '../style/components'

export default function EquipmentReturnActivity() {
  const notify = useNotify()
  const navigate = useNavigate()

  const [selectedIds, setSelectedIds] = useState<Record<string, boolean>>({})

  const { data: usages = [] } = useGetList('equipment_usage', {
    pagination: { page: 1, perPage: 100 },
    filter: { usage_status: 'IN_USE' },
  })

  const { data: equipment = [] } = useGetList('equipment', {
    pagination: { page: 1, perPage: 100 },
  })

  const equipmentMap = Object.fromEntries((equipment || []).map((e: any) => [e.id, e]))

  const inProgressUsages = (usages || []).filter(
    (u: any) => u.usage_status === 'IN_USE' && !u.end_time,
  )

  const token = localStorage.getItem('token')

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const onSubmit = async () => {
    if (!token) {
      notify("Token d'authentification manquant", { type: 'error' })
      return
    }

    const selected = inProgressUsages.filter((u: any) => selectedIds[u.id])
    if (selected.length === 0) {
      notify('Sélectionnez au moins un équipement', { type: 'warning' })
      return
    }

    const now = new Date().toISOString()
    const url = getMiddleUrl('equipment_usage')
    const payload = selected.map((usage: any) => ({
      id: usage.id,
      equipment_id: usage.equipment_id,
      job_id: usage.job_id,
      start_time: usage.start_time,
      end_time: now,
      usage_status: 'RETURNED',
      used_by: usage.used_by,
    }))

    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `Erreur HTTP ${response.status}`)
      }

      notify(`${selected.length} équipement(s) retourné(s) avec succès !`, { type: 'success' })
      navigate('/')
    } catch (error: any) {
      console.error(error)
      notify(`Erreur : ${error.message}`, { type: 'error' })
    }
  }

  const selectedCount = inProgressUsages.filter((u: any) => selectedIds[u.id]).length

  return (
    <Card sx={operationFormStyles.card}>
      <CardContent>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
          Retour d'équipement
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Équipements actuellement en utilisation — sélectionnez ceux à retourner
        </Typography>

        {inProgressUsages.length === 0 ? (
          <Typography variant="body1" color="text.secondary" sx={{ py: 4, textAlign: 'center' }}>
            Aucun équipement en cours d'utilisation
          </Typography>
        ) : (
          <>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox" sx={{ fontWeight: 600 }}>
                      Retourner
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Équipement</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Début</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {inProgressUsages.map((usage: any) => {
                    const equipName = equipmentMap[usage.equipment_id]?.name || usage.equipment_id
                    const startStr = usage.start_time
                      ? new Date(usage.start_time).toLocaleDateString('fr-FR')
                      : '-'
                    return (
                      <TableRow key={usage.id} hover>
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={!!selectedIds[usage.id]}
                            onChange={() => toggleSelect(usage.id)}
                            data-testid={`checkbox-return-${usage.id}`}
                          />
                        </TableCell>
                        <TableCell>{equipName}</TableCell>
                        <TableCell>{startStr}</TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </TableContainer>

            <Box sx={operationFormStyles.submitBox}>
              <Button
                variant="contained"
                color="primary"
                disabled={selectedCount === 0}
                onClick={onSubmit}
                data-testid="submit-return-equipment"
              >
                Retourner ({selectedCount})
              </Button>
              <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/')} sx={{ ml: 1 }}>
                Retour
              </Button>
            </Box>
          </>
        )}
      </CardContent>
    </Card>
  )
}
