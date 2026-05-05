// pages/PurchaseActivityForm.tsx
import React, { useState } from 'react'
import {
  Title,
  Form,
  TextInput,
  NumberInput,
  DateTimeInput,
  ArrayInput,
  SimpleFormIterator,
  useNotify,
  ResourceContextProvider,
  useGetIdentity,
  required,
} from 'react-admin'
import {
  Card,
  CardContent,
  Box,
  Typography,
  Divider,
  Button,
  IconButton,
  Collapse,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useForm, FormProvider } from 'react-hook-form'
import generateId from '../../../utili/utils.tsx'
import ReferenceSelectWithCreate from '../../../generic/ReferenceSelectWithCreate.tsx'
import { getMiddleUrl } from '../../../config/dynamicResources.ts'
import MaterialForm from '../../storage/materials/MaterialForm.tsx'
import WarehouseForm from '../../storage/warehouses/WarehouseForm.tsx'
import { redirect, useNavigate } from 'react-router'

// Valeurs initiales
const initialEquipmentLine = {
  equipment_id: generateId(),
  equipment_name: '',
  expense_id: generateId(),
  purchase_id: generateId(),
  travel_equipment_id: generateId(),
  unit_price: '',
}

const initialMaterialLine = {
  material: null,
  expense_id: generateId(),
  purchase_id: generateId(),
  travel_material_id: generateId(),
  quantity: '',
  unit_price: '',
}

const PurchaseActivityForm = () => {
  const notify = useNotify()

  // Récupération du token authentication (à adapter selon votre authProvider)
  const { isLoading: identityLoading } = useGetIdentity()

  // Initialisation de react-hook-form
  const methods = useForm({
    defaultValues: {
      supplier_id: '',
      comment: '',
      equipment_lines: [initialEquipmentLine],
      material_lines: [initialMaterialLine],
      departure_warehouse: null,
      arrival_warehouse: null,
      departure_date: new Date().toISOString().slice(0, 16),
      arrival_date: new Date().toISOString().slice(0, 16),
      travel_fee: '',
    },
  })

  const toInstant = (date: string) => {
    if (!date) return null
    return new Date(date).toISOString()
  }

  const add_autogenaration_id = (source: string) => {
    return (
      <TextInput source={source} readOnly defaultValue={generateId()} sx={{ display: 'none' }} />
    )
  }

  const [showTransport, setShowTransport] = useState(false)
  const [isTravelOpen, setIsTravelOpen] = useState(false)
  const navigate = useNavigate()

  const onSubmit = async (data: any) => {
    const payload = {
      id: data.id,
      supplier_id: data.departure_warehouse,
      equipment_lines: (data.equipment_lines || []).map((line: any) => ({
        equipment: {
          id: line.equipment_id,
          name: line.equipment_name || null,
          description: line.description || null,
        },
        expense_id: line.expense_id,
        purchase_id: line.purchase_id,
        travel_equipment_id: line.travel_equipment_id,
        unit_price: parseFloat(line.unit_price) || 0,
      })),

      material_lines: (data.material_lines || []).map((line: any) => ({
        material: {
          id: line.material,
        },
        expense_id: line.expense_id,
        purchase_id: line.purchase_id,
        travel_material_id: line.travel_material_id,
        quantity: parseFloat(line.quantity) || 0,
        unit_price: parseFloat(line.unit_price) || 0,
      })),

      travel: isTravelOpen
        ? {
            id: data.travel_id,
            expense_id: data.travel_expense_id,
            departure_location: data.departure_warehouse
              ? {
                  id: data.departure_warehouse,
                }
              : null,
            arrival_location: data.arrival_warehouse
              ? {
                  id: data.arrival_warehouse,
                }
              : null,
            departure_date: toInstant(data.departure_date),
            arrival_date: toInstant(data.arrival_date),
            fee: parseFloat(data.travel_fee) || 0,
          }
        : null,

      comment: data.comment || null,
    }

    // Construction de l'URL dynamique
    const url = getMiddleUrl('purchase_operations')
    const token = localStorage.getItem('token')
    if (!token) {
      throw new Error('No token')
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error(`Erreur HTTP ${response.status}`)
      }

      const result = await response.json()
      notify('Opération d’achat créée avec succès !', { type: 'success' })
      navigate('/')
    } catch (error) {
      console.error(error)
      notify(`Erreur : ${error.message}`, { type: 'error' })
    }
  }

  if (identityLoading) return <div>Chargement de l’authentification...</div>

  return (
    <ResourceContextProvider value="purchases_activity">
      <Card sx={{ maxWidth: 'xl', mx: 'auto', my: 2 }}>
        <CardContent>
          <Title title="Nouvelle Opération d’Achat" />
          <FormProvider {...methods}>
            <Form onSubmit={onSubmit}>
              {/* ---------- Informations générales ---------- */}
              <Typography variant="h6" color="primary" sx={{ mt: 2, mb: 1 }}>
                📋 Informations Générales
              </Typography>
              {add_autogenaration_id('id')}
              {add_autogenaration_id('travel_expense_id')}
              {add_autogenaration_id('travel_id')}
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <TextInput
                  source="comment"
                  label="Commentaire"
                  multiline
                  fullWidth
                  sx={{ flex: 2 }}
                />
              </Box>
              <Divider sx={{ my: 3 }} />

              {/* ---------- Équipements ---------- */}
              <Typography variant="h6" color="primary" sx={{ mb: 1 }}>
                🔧 Équipements
              </Typography>
              <ArrayInput source="equipment_lines" label="">
                <SimpleFormIterator inline>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', width: '100%' }}>
                    <TextInput
                      source="equipment_id"
                      label="ID Équipement"
                      readOnly
                      defaultValue={generateId()}
                      sx={{ display: 'none' }}
                    />
                    <TextInput source="equipment_name" label="Nom" sx={{ flex: 1 }} />
                    <TextInput source="description" label="Description" sx={{ flex: 1 }} />
                    <NumberInput source="unit_price" label="Prix" sx={{ flex: 1 }} />
                    {add_autogenaration_id('expense_id')}
                    {add_autogenaration_id('purchase_id')}
                    {add_autogenaration_id('travel_equipment_id')}
                  </Box>
                </SimpleFormIterator>
              </ArrayInput>
              <Divider sx={{ my: 3 }} />

              {/* ---------- Matériaux ---------- */}
              <Typography variant="h6" color="primary" sx={{ mb: 1 }}>
                📦 Matériaux
              </Typography>
              <ArrayInput source="material_lines" label="">
                <SimpleFormIterator inline>
                  <Box
                    sx={{
                      display: 'flex',
                      gap: 1,
                      flexWrap: 'wrap',
                      width: '100%',
                      alignItems: 'center',
                    }}
                  >
                    <ReferenceSelectWithCreate
                      source="material"
                      reference="materials"
                      label="Matériau"
                      optionText={(record) => `${record.name} / ${record.unit}`}
                      createUrlEnd={getMiddleUrl('materials')}
                      createForm={<MaterialForm isCreateForm />}
                      sx={{ flex: 1 }}
                      extractionPath={'material_lines'}
                    />
                    <NumberInput source="quantity" label="Quantité" sx={{ flex: 1 }} />
                    <NumberInput source="unit_price" label="Prix Unitaire" sx={{ flex: 1 }} />
                    {add_autogenaration_id('expense_id')}
                    {add_autogenaration_id('purchase_id')}
                    {add_autogenaration_id('travel_material_id')}
                  </Box>
                </SimpleFormIterator>
              </ArrayInput>
              <Divider sx={{ my: 3 }} />

              {/* ---------- Transport avec Toggle ---------- */}
              <Box sx={{ mb: 2 }}>
                <Box
                  onClick={() => setShowTransport(!showTransport)}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                    p: 1,
                    borderRadius: 1,
                    '&:hover': {
                      bgcolor: 'action.hover',
                    },
                  }}
                >
                  <Typography variant="h6" color="primary" sx={{ flex: 1 }}>
                    🚚 Transport
                  </Typography>
                  <Button onClick={() => setIsTravelOpen((prev) => !prev)}>
                    <IconButton
                      size="small"
                      sx={{
                        transform: showTransport ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s ease',
                      }}
                    >
                      <ExpandMoreIcon />
                    </IconButton>
                  </Button>
                </Box>

                <Collapse in={isTravelOpen}>
                  <Box sx={{ pt: 2 }}>
                    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                      <ReferenceSelectWithCreate
                        source="departure_warehouse"
                        reference="warehouses"
                        label="Entrepôt de départ"
                        optionText="name"
                        createUrlEnd={getMiddleUrl('warehouses')}
                        createForm={<WarehouseForm isCreateForm />}
                        sx={{ flex: 1 }}
                      />
                      <ReferenceSelectWithCreate
                        source="arrival_warehouse"
                        reference="warehouses"
                        label="Entrepôt d'arrivée"
                        optionText="name"
                        createUrlEnd={getMiddleUrl('warehouses')}
                        createForm={<WarehouseForm isCreateForm />}
                        sx={{ flex: 1 }}
                      />
                    </Box>
                    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 2 }}>
                      <DateTimeInput
                        source="departure_date"
                        label="Date de départ"
                        sx={{ flex: 1 }}
                        defaultValue={new Date()}
                      />
                      <DateTimeInput
                        source="arrival_date"
                        label="Date d'arrivée"
                        sx={{ flex: 1 }}
                        defaultValue={new Date()}
                      />
                    </Box>
                    <NumberInput
                      source="travel_fee"
                      label="Frais de transport"
                      fullWidth
                      sx={{ mt: 2 }}
                    />
                  </Box>
                </Collapse>
              </Box>

              {/* Bouton de soumission personnalisé */}
              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                <Button type="submit" variant="contained" color="primary">
                  Créer l’opération d’achat
                </Button>
              </Box>
            </Form>
          </FormProvider>
        </CardContent>
      </Card>
    </ResourceContextProvider>
  )
}

export default PurchaseActivityForm
