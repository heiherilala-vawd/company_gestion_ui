import { useState } from 'react'
import { Form, TextInput, ReferenceInput, SelectInput, useNotify, useGetList } from 'react-admin'
import { Card, CardContent, Box, Typography, Button, TextField } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useNavigate } from 'react-router'
import { getMiddleUrl } from '../config/dynamicResources'
import generateId from '../utili/utils'
import { operationFormStyles } from '../style/components'

export default function MaterialConsumptionActivity() {
  const notify = useNotify()
  const navigate = useNavigate()

  const [warehouseId, setWarehouseId] = useState<string | null>(null)
  const [consumptions, setConsumptions] = useState<Record<string, string>>({})
  const [reason, setReason] = useState('')
  const jobId = localStorage.getItem('currentJobId')

  const { data: stockEntries = [] } = useGetList('material_warehouse', {
    pagination: { page: 1, perPage: 100 },
    filter: warehouseId ? { warehouse_id: warehouseId } : undefined,
  })

  const handleQuantityChange = (materialWarehouseId: string, value: string) => {
    setConsumptions((prev) => ({ ...prev, [materialWarehouseId]: value }))
  }

  const today = new Date().toISOString()

  const onSubmit = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      notify("Token d'authentification manquant", { type: 'error' })
      return
    }

    const url = getMiddleUrl('material_consumption')
    let successCount = 0

    for (const entry of stockEntries) {
      const qty = parseFloat(consumptions[entry.id])
      if (!qty || qty <= 0) continue

      const payload = [
        {
          id: generateId(),
          material_id: entry.material_id || entry.material?.id,
          warehouse_id: warehouseId,
          quantity: qty,
          consumption_date: today,
          job_id: jobId,
          reason: reason || null,
        },
      ]

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
        successCount++
      } catch (error: any) {
        console.error(error)
        notify(`Erreur: ${error.message}`, { type: 'error' })
        return
      }
    }

    if (successCount > 0) {
      notify(`${successCount} consommation(s) enregistrée(s) !`, { type: 'success' })
      navigate('/')
    } else {
      notify('Aucune consommation enregistrée', { type: 'warning' })
    }
  }

  return (
    <Card sx={operationFormStyles.card}>
      <CardContent>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
          Consommer des matériaux
        </Typography>

        <Form onSubmit={onSubmit}>
          <Box sx={operationFormStyles.flexRow}>
            <ReferenceInput source="warehouse_id" reference="warehouses">
              <SelectInput
                optionText="name"
                sx={operationFormStyles.flexFull}
                onChange={(e: any) => setWarehouseId(e?.id || e?.target?.value || null)}
                data-testid="input-warehouse_id"
              />
            </ReferenceInput>
          </Box>

          {warehouseId && (
            <>
              <Typography variant="body2" sx={{ mt: 3, mb: 1, fontWeight: 500 }}>
                Matériaux disponibles
              </Typography>
              {stockEntries.length === 0 && (
                <Typography variant="body2" color="text.secondary">
                  Aucun matériau dans cet entrepôt
                </Typography>
              )}
              {stockEntries.map((entry: any) => {
                const materialName = entry.material?.name || 'Matériau inconnu'
                const availableQty = entry.quantity || 0
                return (
                  <Box
                    key={entry.id}
                    sx={{ ...operationFormStyles.flexRow, alignItems: 'center', mb: 1 }}
                  >
                    <Typography sx={{ flex: 1 }}>
                      {materialName} (dispo: {availableQty})
                    </Typography>
                    <TextField
                      type="number"
                      size="small"
                      value={consumptions[entry.id] || ''}
                      onChange={(e) => handleQuantityChange(entry.id, e.target.value)}
                      inputProps={{ min: 0, max: availableQty, style: { width: 80 } }}
                      data-testid={`input-qty-${entry.id}`}
                    />
                  </Box>
                )
              })}

              <Box sx={{ mt: 2 }}>
                <TextInput
                  source="reason"
                  label="Raison"
                  multiline
                  fullWidth
                  onChange={(e: any) => setReason(e.target.value)}
                  data-testid="input-reason"
                />
              </Box>

              <Box sx={operationFormStyles.submitBox}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  data-testid="submit-consumption"
                >
                  Consommer
                </Button>
                <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/')} sx={{ ml: 1 }}>
                  Retour
                </Button>
              </Box>
            </>
          )}
        </Form>
      </CardContent>
    </Card>
  )
}
