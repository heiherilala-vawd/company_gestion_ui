import { useState } from 'react'
import { useNotify, useGetList } from 'react-admin'
import {
  Card,
  CardContent,
  Box,
  Typography,
  Button,
  TextField,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  FormControlLabel,
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useNavigate } from 'react-router'
import { getMiddleUrl } from '../config/dynamicResources'
import generateId from '../utili/utils'
import { operationFormStyles } from '../style/components'

export default function MaterialReturnActivity() {
  const notify = useNotify()
  const navigate = useNavigate()

  const [returnQuantities, setReturnQuantities] = useState<Record<string, string>>({})
  const [finishedIds, setFinishedIds] = useState<Record<string, boolean>>({})

  const { data: consumptions = [] } = useGetList('material_consumption', {
    pagination: { page: 1, perPage: 100 },
    filter: { consumption_status: 'IN_PROGRESS' },
  })

  const { data: materials = [] } = useGetList('materials', {
    pagination: { page: 1, perPage: 100 },
  })

  const { data: warehouses = [] } = useGetList('warehouses', {
    pagination: { page: 1, perPage: 100 },
  })

  const materialMap = Object.fromEntries((materials || []).map((m: any) => [m.id, m]))
  const warehouseMap = Object.fromEntries((warehouses || []).map((w: any) => [w.id, w]))

  const token = localStorage.getItem('token')

  const processReturn = async (consumption: any, qty: number) => {
    const url = getMiddleUrl('material_warehouse')
    const payload = [
      {
        id: generateId(),
        material_id: consumption.material_id,
        warehouse_id: consumption.warehouse_id,
        quantity: qty,
      },
    ]
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    })
    if (!response.ok) throw new Error(`Erreur retour HTTP ${response.status}`)
  }

  const processFinish = async (consumption: any) => {
    const url = getMiddleUrl('material_consumption')
    const payload = [
      {
        id: consumption.id,
        consumption_status: 'COMPLETED',
      },
    ]
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    })
    if (!response.ok) throw new Error(`Erreur fin HTTP ${response.status}`)
  }

  const hasActions = consumptions.some(
    (c: any) => finishedIds[c.id] || parseFloat(returnQuantities[c.id] || '0') > 0,
  )

  const onSubmit = async () => {
    if (!token) {
      notify("Token d'authentification manquant", { type: 'error' })
      return
    }
    if (!hasActions) {
      notify('Aucune action sélectionnée', { type: 'warning' })
      return
    }

    for (const consumption of consumptions) {
      const qty = parseFloat(returnQuantities[consumption.id] || '0')
      const isFinished = finishedIds[consumption.id]

      if (qty > 0) {
        try {
          await processReturn(consumption, qty)
        } catch (error: any) {
          notify(`Erreur retour: ${error.message}`, { type: 'error' })
          return
        }
      }
      if (isFinished) {
        try {
          await processFinish(consumption)
        } catch (error: any) {
          notify(`Erreur fin: ${error.message}`, { type: 'error' })
          return
        }
      }
    }

    notify('Actions effectuées avec succès !', { type: 'success' })
    navigate('/')
  }

  return (
    <Card sx={operationFormStyles.card}>
      <CardContent>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
          Retour de matériaux
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Consommations en cours — retournez les surplus ou marquez comme terminé
        </Typography>

        {consumptions.length === 0 ? (
          <Typography variant="body1" color="text.secondary" sx={{ py: 4, textAlign: 'center' }}>
            Aucune consommation en cours
          </Typography>
        ) : (
          <>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Matériau</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Entrepôt</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Qté consommée</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Qté à retourner</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Terminer</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {consumptions.map((consumption: any) => {
                    const matName =
                      materialMap[consumption.material_id]?.name ||
                      consumption.material?.name ||
                      consumption.material_id
                    const whName =
                      warehouseMap[consumption.warehouse_id]?.name ||
                      consumption.warehouse?.name ||
                      consumption.warehouse_id
                    return (
                      <TableRow key={consumption.id}>
                        <TableCell>{matName}</TableCell>
                        <TableCell>{whName}</TableCell>
                        <TableCell>{consumption.quantity}</TableCell>
                        <TableCell>
                          <TextField
                            type="number"
                            size="small"
                            value={returnQuantities[consumption.id] || ''}
                            onChange={(e) =>
                              setReturnQuantities((prev) => ({
                                ...prev,
                                [consumption.id]: e.target.value,
                              }))
                            }
                            inputProps={{ min: 0, style: { width: 80 } }}
                            data-testid={`input-return-qty-${consumption.id}`}
                          />
                        </TableCell>
                        <TableCell>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={!!finishedIds[consumption.id]}
                                onChange={() =>
                                  setFinishedIds((prev) => ({
                                    ...prev,
                                    [consumption.id]: !prev[consumption.id],
                                  }))
                                }
                                data-testid={`checkbox-finish-${consumption.id}`}
                              />
                            }
                            label=""
                          />
                        </TableCell>
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
                disabled={!hasActions}
                onClick={onSubmit}
                data-testid="submit-return"
              >
                Valider les retours
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
