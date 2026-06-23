import { useState } from 'react'
import {
  useNotify,
  Form,
  ArrayInput,
  SimpleFormIterator,
  TextInput,
  NumberInput,
  ResourceContextProvider,
  required,
} from 'react-admin'
import { Card, CardContent, Typography, Button, Box, Divider } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useNavigate } from 'react-router'
import generateId from '../../../utili/utils.tsx'
import { getMiddleUrl } from '../../../config/dynamicResources.ts'
import { renderWarehouseSelect } from '../../../generic/SelectWithCreateProvider.tsx'
import { getAuthHeaders } from '../../../auth/authProvider'
import { operationFormStyles } from '../../../style/components'

const initialLine = { name: '', description: '', quantity: 1 }

export default function EquipmentCreateBulk() {
  const notify = useNotify()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const onSubmit = async (data: any) => {
    const { warehouse_id, lines } = data

    if (!warehouse_id) {
      notify('Veuillez sélectionner un entrepôt', { type: 'error' })
      return
    }

    if (!lines || lines.length === 0) {
      notify('Veuillez ajouter au moins une ligne', { type: 'error' })
      return
    }

    const items: any[] = []
    for (const line of lines) {
      if (!line.name) continue
      const qty = parseInt(line.quantity, 10) || 1
      for (let i = 0; i < qty; i++) {
        items.push({
          id: generateId(),
          name: line.name,
          description: line.description || '',
          warehouse_id,
          category: 'Général',
          purchase_date: new Date(),
          is_damaged: false,
          is_lost: false,
        })
      }
    }

    if (items.length === 0) {
      notify("Veuillez remplir au moins un nom d'équipement", { type: 'error' })
      return
    }

    setLoading(true)
    const url = getMiddleUrl('equipment')

    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders(),
        },
        body: JSON.stringify(items),
      })

      if (!response.ok) {
        const err = await response.json().catch(() => ({}))
        throw new Error(err.message || `Erreur HTTP ${response.status}`)
      }

      notify(`${items.length} équipement(s) créé(s) avec succès`, { type: 'success' })
      navigate('/equipment')
    } catch (e: unknown) {
      notify(e instanceof Error ? e.message : 'Erreur réseau', { type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <ResourceContextProvider value="equipment">
      <Card sx={operationFormStyles.card}>
        <CardContent>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
            Création en masse d'équipements
          </Typography>

          <Form
            id="equipment-bulk-create-form"
            onSubmit={onSubmit}
            defaultValues={{ warehouse_id: '', lines: [initialLine] }}
          >
            <Divider sx={operationFormStyles.divider} />

            <Box sx={{ mb: 2 }}>{renderWarehouseSelect('warehouse_id', 'Entrepôt')}</Box>

            <Divider sx={operationFormStyles.divider} />

            <Typography variant="h6" color="primary" sx={operationFormStyles.sectionHeader}>
              Équipements
            </Typography>

            <ArrayInput source="lines" label="">
              <SimpleFormIterator inline>
                <Box sx={operationFormStyles.flexRowTight}>
                  <TextInput
                    source="name"
                    label="Nom"
                    validate={[required()]}
                    sx={operationFormStyles.flexFull}
                    data-testid="input-bulk-name"
                  />
                  <TextInput
                    source="description"
                    label="Description"
                    sx={operationFormStyles.flexFull}
                    data-testid="input-bulk-description"
                  />
                  <NumberInput
                    source="quantity"
                    label="Quantité"
                    defaultValue={1}
                    min={1}
                    sx={{ ...operationFormStyles.flexFull, maxWidth: 120 }}
                    data-testid="input-bulk-quantity"
                  />
                </Box>
              </SimpleFormIterator>
            </ArrayInput>

            <Divider sx={operationFormStyles.divider} />

            <Box sx={operationFormStyles.submitBox}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
                data-testid="submit-bulk-create"
              >
                {loading ? 'Création...' : 'Créer les équipements'}
              </Button>
              <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)}>
                Retour
              </Button>
            </Box>
          </Form>
        </CardContent>
      </Card>
    </ResourceContextProvider>
  )
}
