import {
  Form,
  TextInput,
  NumberInput,
  DateTimeInput,
  ReferenceInput,
  SelectInput,
  useNotify,
} from 'react-admin'
import { Card, CardContent, Box, Typography, Button } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useNavigate } from 'react-router'
import { getMiddleUrl } from '../config/dynamicResources'
import generateId from '../utili/utils'
import { operationFormStyles } from '../style/components'

export default function ScheduledMaintenanceActivity() {
  const notify = useNotify()
  const navigate = useNavigate()

  const today = new Date().toISOString().split('T')[0]

  const onSubmit = async (data: any) => {
    const token = localStorage.getItem('token')
    if (!token) {
      notify("Token d'authentification manquant", { type: 'error' })
      return
    }

    const id = generateId()
    const expenseId = generateId()
    const url = getMiddleUrl('maintenances')
    const payload = [
      {
        id,
        equipment_id: data.equipment_id,
        description: data.description || '',
        expense: {
          id: expenseId,
          amount: parseFloat(data.amount) || 0,
          comment: data.comment || '',
        },
        interval_days: parseInt(data.interval_days) || 0,
        next_maintenance_date: data.next_maintenance_date || null,
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

      notify('Maintenance programmée avec succès !', { type: 'success' })
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
          Planifier une maintenance
        </Typography>

        <Form onSubmit={onSubmit}>
          <Box sx={operationFormStyles.flexRow}>
            <ReferenceInput
              source="equipment_id"
              reference="equipment"
              label="Équipement"
              sx={operationFormStyles.flexFull}
            >
              <SelectInput
                optionText="name"
                sx={operationFormStyles.flexFull}
                data-testid="input-equipment_id"
              />
            </ReferenceInput>
          </Box>

          <Box sx={operationFormStyles.flexRow}>
            <TextInput
              source="description"
              label="Description"
              multiline
              fullWidth
              sx={operationFormStyles.flexFull}
              data-testid="input-description"
            />
          </Box>

          <Box sx={operationFormStyles.collapseRow}>
            <NumberInput
              source="amount"
              label="Montant"
              sx={operationFormStyles.flexFull}
              data-testid="input-amount"
            />
            <NumberInput
              source="interval_days"
              label="Intervalle (jours)"
              sx={operationFormStyles.flexFull}
              data-testid="input-interval_days"
            />
          </Box>

          <Box sx={operationFormStyles.collapseRow}>
            <DateTimeInput
              source="next_maintenance_date"
              label="Prochaine maintenance"
              defaultValue={today}
              sx={operationFormStyles.flexFull}
              data-testid="input-next_maintenance_date"
            />
            <TextInput
              source="comment"
              label="Commentaire"
              sx={operationFormStyles.flexFull}
              data-testid="input-comment"
            />
          </Box>

          <Box sx={operationFormStyles.submitBox}>
            <Button type="submit" variant="contained" color="primary" data-testid="submit-schedule">
              Programmer
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
