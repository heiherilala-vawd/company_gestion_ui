import { useState } from 'react'
import { Form, ReferenceInput, SelectInput, DateTimeInput, useNotify } from 'react-admin'
import { Card, CardContent, Box, Typography, Button } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useNavigate } from 'react-router'
import { getMiddleUrl } from '../config/dynamicResources'
import generateId from '../utili/utils'
import { operationFormStyles } from '../style/components'

export default function EquipmentUsageActivity() {
  const notify = useNotify()
  const navigate = useNavigate()

  const [warehouseId, setWarehouseId] = useState<string | null>(null)
  const jobId = localStorage.getItem('currentJobId')

  const today = new Date().toISOString().split('T')[0]

  const onSubmit = async (data: any) => {
    const token = localStorage.getItem('token')
    if (!token) {
      notify("Token d'authentification manquant", { type: 'error' })
      return
    }

    const url = getMiddleUrl('equipment_usage')
    const payload = [
      {
        id: generateId(),
        equipment_id: data.equipment_id,
        job_id: jobId,
        start_time: data.start_time || today,
        end_time: data.end_time || null,
        used_by: data.used_by || null,
        usage_status: data.end_time ? 'COMPLETED' : 'IN_USE',
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

      notify('Utilisation enregistrée avec succès !', { type: 'success' })
      navigate('/')
    } catch (error: any) {
      console.error(error)
      notify(`Erreur : ${error.message}`, { type: 'error' })
    }
  }

  return (
    <Card sx={operationFormStyles.card}>
      <CardContent>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
          Utiliser un équipement
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

          <Box sx={{ ...operationFormStyles.flexRow, mt: 2 }}>
            <ReferenceInput
              source="equipment_id"
              reference="equipment"
              filter={warehouseId ? { warehouse_id: warehouseId } : undefined}
            >
              <SelectInput
                optionText="name"
                sx={operationFormStyles.flexFull}
                data-testid="input-equipment_id"
              />
            </ReferenceInput>
          </Box>

          <Box sx={{ ...operationFormStyles.flexRow, mt: 2 }}>
            <ReferenceInput source="used_by" reference="users">
              <SelectInput
                optionText={(record: any) => `${record.first_name} ${record.last_name}`}
                sx={operationFormStyles.flexFull}
                data-testid="input-used_by"
              />
            </ReferenceInput>
          </Box>

          <Box sx={operationFormStyles.collapseRow}>
            <DateTimeInput
              source="start_time"
              label="Date début"
              defaultValue={new Date().toISOString()}
              sx={operationFormStyles.flexFull}
              data-testid="input-start_time"
            />
            <DateTimeInput
              source="end_time"
              label="Date fin"
              sx={operationFormStyles.flexFull}
              data-testid="input-end_time"
            />
          </Box>

          <Box sx={operationFormStyles.submitBox}>
            <Button type="submit" variant="contained" color="primary" data-testid="submit-usage">
              Enregistrer l'utilisation
            </Button>
            <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/')} sx={{ ml: 1 }}>
              Retour
            </Button>
          </Box>
        </Form>
      </CardContent>
    </Card>
  )
}
