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
  SelectInput,
  ReferenceInput,
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
import generateId from '../../../utili/utils.tsx'
import ReferenceSelectWithCreate from '../../../generic/ReferenceSelectWithCreate.tsx'
import { getMiddleUrl } from '../../../config/dynamicResources.ts'
import MaterialForm from '../../storage/materials/MaterialForm.tsx'
import WarehouseForm from '../../storage/warehouses/WarehouseForm.tsx'
import { useNavigate } from 'react-router'
import EquipmentForm from '../equipment/EquipmentForm.tsx'
import { operationFormStyles } from '../../../style/components'
import { transitions } from '../../../style/themeConfig'

const TravelOperationForm = () => {
  const notify = useNotify()
  const { isLoading: identityLoading } = useGetIdentity()
  const navigate = useNavigate()

  const [departureLocationId, setDepartureLocationId] = useState<string | null>(null)

  const toInstant = (date: string) => {
    if (!date) return null
    return new Date(date).toISOString()
  }

  const add_autogenaration_id = (source: string) => {
    return (
      <TextInput source={source} readOnly defaultValue={generateId()} sx={{ display: 'none' }} />
    )
  }

  const [isTravelOpen, setIsTravelOpen] = useState(true)

  const onSubmit = async (data: any) => {
    const payload = {
      comment: data.comment || null,
      travel: {
        id: data.travel_id,
        expense_id: data.expense_id,
        departure_location: data.departure_location_id
          ? {
              id: data.departure_location_id,
            }
          : null,
        arrival_location: data.arrival_location_id
          ? {
              id: data.arrival_location_id,
            }
          : null,
        departure_date: toInstant(data.departure_date),
        arrival_date: toInstant(data.arrival_date),
        fee: parseFloat(data.fee) || 0,
      },
      equipment_lines: (data.equipment_lines || []).map((line: any) => ({
        id: line.travel_equipment_id,
        equipment: {
          id: line.equipment_id,
        },
      })),
      material_lines: (data.material_lines || []).map((line: any) => ({
        id: line.travel_material_id,
        material: {
          id: line.material_id,
        },
        quantity: parseFloat(line.material_quantity) || 0,
      })),
      people_lines: (data.people_lines || []).map((line: any) => ({
        id: line.travel_people_id,
        user_id: line.user_id,
      })),
    }

    const url = getMiddleUrl(`travel_operations`)
    const token = localStorage.getItem('token')

    if (!token) {
      notify("Token d'authentification manquant", { type: 'error' })
      return
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
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `Erreur HTTP ${response.status}`)
      }

      const result = await response.json()
      notify('Opération de déplacement créée avec succès !', { type: 'success' })
      navigate(`/`)
    } catch (error: any) {
      console.error(error)
      notify(`Erreur : ${error.message}`, { type: 'error' })
    }
  }

  if (identityLoading) return <div>Chargement de l'authentification...</div>

  return (
    <ResourceContextProvider value="travel_operations">
      <Card sx={operationFormStyles.card}>
        <CardContent>
          <Title title="Nouvelle Opération de Déplacement" />
          <Form onSubmit={onSubmit}>
            <Typography variant="h6" color="primary" sx={operationFormStyles.sectionHeader}>
              📋 Informations Générales
            </Typography>

            <Box sx={operationFormStyles.flexRow}>
              <TextInput
                source="comment"
                label="Commentaire"
                multiline
                rows={3}
                fullWidth
                sx={operationFormStyles.flexFull}
              />
            </Box>

            <Divider sx={operationFormStyles.divider} />

            <Box sx={{ mb: 2 }}>
              <Box
                onClick={() => setIsTravelOpen(!isTravelOpen)}
                sx={operationFormStyles.toggleBox}
              >
                <Typography variant="h6" color="primary" sx={operationFormStyles.flexFull}>
                  🚚 Détails du Trajet
                </Typography>
                <IconButton
                  size="small"
                  sx={{
                    transform: isTravelOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: transitions.spin,
                  }}
                >
                  <ExpandMoreIcon />
                </IconButton>
              </Box>

              <Collapse in={isTravelOpen}>
                <Box sx={operationFormStyles.collapseContent}>
                  {add_autogenaration_id('travel_id')}
                  {add_autogenaration_id('expense_id')}

                  <Box sx={operationFormStyles.flexRow}>
                    <ReferenceInput source="departure_location_id" reference="warehouses">
                      <SelectInput
                        source="departure_location_id"
                        label="Lieu de départ"
                        optionText="name"
                        fullWidth
                        onChange={(event) => {
                          setDepartureLocationId(event.target.value)
                        }}
                        sx={operationFormStyles.flexFull}
                      />
                    </ReferenceInput>

                    <ReferenceSelectWithCreate
                      source="arrival_location_id"
                      reference="warehouses"
                      label="Lieu d'arrivée"
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

                  <NumberInput source="fee" label="Frais de déplacement" fullWidth sx={{ mt: 2 }} />
                </Box>
              </Collapse>
            </Box>

            <Divider sx={operationFormStyles.divider} />

            <Typography variant="h6" color="primary" sx={operationFormStyles.sectionHeader}>
              🔧 Équipements à déplacer
            </Typography>
            <ArrayInput source="equipment_lines" label="">
              <SimpleFormIterator inline>
                <Box sx={operationFormStyles.flexRowAlign}>
                  {add_autogenaration_id('travel_equipment_id')}

                  <ReferenceSelectWithCreate
                    source="equipment_id"
                    reference="equipment"
                    label="Équipement"
                    optionText={(record) => `${record.name} - ${record.description || ''}`}
                    createUrlEnd={getMiddleUrl('equipment')}
                    createForm={<EquipmentForm isCreateForm />}
                    filter={departureLocationId ? { warehouse_id: departureLocationId } : undefined}
                    sx={operationFormStyles.flexDouble}
                    extractionPath={'equipment_lines'}
                  />
                </Box>
              </SimpleFormIterator>
            </ArrayInput>

            <Divider sx={operationFormStyles.divider} />

            <Typography variant="h6" color="primary" sx={operationFormStyles.sectionHeader}>
              📦 Matériaux à déplacer
            </Typography>
            <ArrayInput source="material_lines" label="">
              <SimpleFormIterator inline>
                <Box sx={operationFormStyles.flexRowAlign}>
                  {add_autogenaration_id('travel_material_id')}

                  <ReferenceSelectWithCreate
                    source="material_id"
                    reference="materials"
                    label="Matériau"
                    optionText={(record) => `${record.name} / ${record.unit}`}
                    createUrlEnd={getMiddleUrl('materials')}
                    createForm={<MaterialForm isCreateForm />}
                    filter={departureLocationId ? { warehouse_id: departureLocationId } : undefined}
                    sx={operationFormStyles.flexDouble}
                    extractionPath={'material_lines'}
                  />

                  <NumberInput
                    source="material_quantity"
                    label="Quantité"
                    sx={operationFormStyles.flexFull}
                  />
                </Box>
              </SimpleFormIterator>
            </ArrayInput>

            <Divider sx={operationFormStyles.divider} />

            <Typography variant="h6" color="primary" sx={operationFormStyles.sectionHeader}>
              👥 Personnel à déplacer
            </Typography>
            <ArrayInput source="people_lines" label="">
              <SimpleFormIterator inline>
                <Box sx={operationFormStyles.flexRowAlign}>
                  {add_autogenaration_id('travel_people_id')}

                  <ReferenceSelectWithCreate
                    source="user_id"
                    reference="users"
                    label="Utilisateur"
                    optionText={(record) =>
                      `${record.first_name} ${record.last_name} - ${record.email || ''}`
                    }
                    createUrlEnd={getMiddleUrl('users')}
                    createForm={<div>Formulaire de création d'utilisateur à définir</div>}
                    sx={operationFormStyles.flexDouble}
                  />
                </Box>
              </SimpleFormIterator>
            </ArrayInput>

            <Box sx={operationFormStyles.submitBox}>
              <Button type="submit" variant="contained" color="primary">
                Créer l'opération de déplacement
              </Button>
            </Box>
          </Form>
        </CardContent>
      </Card>
    </ResourceContextProvider>
  )
}

export default TravelOperationForm
