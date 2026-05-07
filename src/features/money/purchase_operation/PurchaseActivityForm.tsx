import React, { useState } from 'react'
import {
  Title,
  Form,
  DateTimeInput,
  ArrayInput,
  SimpleFormIterator,
  useNotify,
  ResourceContextProvider,
  useGetIdentity,
  TextInput,
  NumberInput,
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
import { useNavigate } from 'react-router'
import { operationFormStyles } from '../../../style/components'
import { transitions } from '../../../style/themeConfig'

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

  const { isLoading: identityLoading } = useGetIdentity()

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
      notify("Opération d'achat créée avec succès !", { type: 'success' })
      navigate('/')
    } catch (error) {
      console.error(error)
      notify(`Erreur : ${error.message}`, { type: 'error' })
    }
  }

  if (identityLoading) return <div>Chargement de l\'authentification...</div>

  return (
    <ResourceContextProvider value="purchases_activity">
      <Card sx={operationFormStyles.card}>
        <CardContent>
          <Title title="Nouvelle Opération d'Achat" />
          <FormProvider {...methods}>
            <Form onSubmit={onSubmit}>
              <Typography variant="h6" color="primary" sx={operationFormStyles.sectionHeader}>
                📋 Informations Générales
              </Typography>
              {add_autogenaration_id('id')}
              {add_autogenaration_id('travel_expense_id')}
              {add_autogenaration_id('travel_id')}
              <Box sx={operationFormStyles.flexRow}>
                <TextInput
                  source="comment"
                  label="Commentaire"
                  multiline
                  fullWidth
                  sx={operationFormStyles.flexDouble}
                />
              </Box>
              <Divider sx={operationFormStyles.divider} />

              <Typography variant="h6" color="primary" sx={operationFormStyles.sectionHeader}>
                🔧 Équipements
              </Typography>
              <ArrayInput source="equipment_lines" label="">
                <SimpleFormIterator inline>
                  <Box sx={operationFormStyles.flexRowTight}>
                    <TextInput
                      source="equipment_id"
                      label="ID Équipement"
                      readOnly
                      defaultValue={generateId()}
                      sx={{ display: 'none' }}
                    />
                    <TextInput
                      source="equipment_name"
                      label="Nom"
                      sx={operationFormStyles.flexFull}
                    />
                    <TextInput
                      source="description"
                      label="Description"
                      sx={operationFormStyles.flexFull}
                    />
                    <NumberInput
                      source="unit_price"
                      label="Prix"
                      sx={operationFormStyles.flexFull}
                    />
                    {add_autogenaration_id('expense_id')}
                    {add_autogenaration_id('purchase_id')}
                    {add_autogenaration_id('travel_equipment_id')}
                  </Box>
                </SimpleFormIterator>
              </ArrayInput>
              <Divider sx={operationFormStyles.divider} />

              <Typography variant="h6" color="primary" sx={operationFormStyles.sectionHeader}>
                📦 Matériaux
              </Typography>
              <ArrayInput source="material_lines" label="">
                <SimpleFormIterator inline>
                  <Box sx={operationFormStyles.flexRowAlign}>
                    <ReferenceSelectWithCreate
                      source="material"
                      reference="materials"
                      label="Matériau"
                      optionText={(record) => `${record.name} / ${record.unit}`}
                      createUrlEnd={getMiddleUrl('materials')}
                      createForm={<MaterialForm isCreateForm />}
                      sx={operationFormStyles.flexFull}
                      extractionPath={'material_lines'}
                    />
                    <NumberInput
                      source="quantity"
                      label="Quantité"
                      sx={operationFormStyles.flexFull}
                    />
                    <NumberInput
                      source="unit_price"
                      label="Prix Unitaire"
                      sx={operationFormStyles.flexFull}
                    />
                    {add_autogenaration_id('expense_id')}
                    {add_autogenaration_id('purchase_id')}
                    {add_autogenaration_id('travel_material_id')}
                  </Box>
                </SimpleFormIterator>
              </ArrayInput>
              <Divider sx={operationFormStyles.divider} />

              <Box sx={{ mb: 2 }}>
                <Box
                  onClick={() => setShowTransport(!showTransport)}
                  sx={operationFormStyles.toggleBox}
                >
                  <Typography variant="h6" color="primary" sx={operationFormStyles.flexFull}>
                    🚚 Transport
                  </Typography>
                  <Button onClick={() => setIsTravelOpen((prev) => !prev)}>
                    <IconButton
                      size="small"
                      sx={{
                        transform: showTransport ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: transitions.spin,
                      }}
                    >
                      <ExpandMoreIcon />
                    </IconButton>
                  </Button>
                </Box>

                <Collapse in={isTravelOpen}>
                  <Box sx={operationFormStyles.collapseContent}>
                    <Box sx={operationFormStyles.flexRow}>
                      <ReferenceSelectWithCreate
                        source="departure_warehouse"
                        reference="warehouses"
                        label="Entrepôt de départ"
                        optionText="name"
                        createUrlEnd={getMiddleUrl('warehouses')}
                        createForm={<WarehouseForm isCreateForm />}
                        sx={operationFormStyles.flexFull}
                      />
                      <ReferenceSelectWithCreate
                        source="arrival_warehouse"
                        reference="warehouses"
                        label="Entrepôt d'arrivée"
                        optionText="name"
                        createUrlEnd={getMiddleUrl('warehouses')}
                        createForm={<WarehouseForm isCreateForm />}
                        sx={operationFormStyles.flexFull}
                      />
                    </Box>
                    <Box sx={operationFormStyles.collapseRow}>
                      <DateTimeInput
                        source="departure_date"
                        label="Date de départ"
                        sx={operationFormStyles.flexFull}
                        defaultValue={new Date()}
                      />
                      <DateTimeInput
                        source="arrival_date"
                        label="Date d'arrivée"
                        sx={operationFormStyles.flexFull}
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

              <Box sx={operationFormStyles.submitBox}>
                <Button type="submit" variant="contained" color="primary">
                  Créer l'opération d'achat
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
