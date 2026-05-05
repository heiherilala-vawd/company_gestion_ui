// pages/TravelOperationForm.tsx
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
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

const TravelOperationForm = () => {
  const notify = useNotify()
  const { isLoading: identityLoading } = useGetIdentity()
  const navigate = useNavigate()

  // ÉTAT POUR LE FILTRAGE DYNAMIQUE
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

    // Construction de l'URL dynamique avec les paramètres
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

  if (identityLoading) return <div>Chargement de l’authentification...</div>

  return (
    <ResourceContextProvider value="travel_operations">
      <Card sx={{ maxWidth: 'xl', mx: 'auto', my: 2 }}>
        <CardContent>
          <Title title="Nouvelle Opération de Déplacement" />
          <Form onSubmit={onSubmit}>
            {/* ---------- Informations Générales ---------- */}
            <Typography variant="h6" color="primary" sx={{ mt: 2, mb: 1 }}>
              📋 Informations Générales
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <TextInput
                source="comment"
                label="Commentaire"
                multiline
                rows={3}
                fullWidth
                sx={{ flex: 1 }}
              />
            </Box>

            <Divider sx={{ my: 3 }} />

            {/* ---------- Transport / Trajet ---------- */}
            <Box sx={{ mb: 2 }}>
              <Box
                onClick={() => setIsTravelOpen(!isTravelOpen)}
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
                  🚚 Détails du Trajet
                </Typography>
                <IconButton
                  size="small"
                  sx={{
                    transform: isTravelOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease',
                  }}
                >
                  <ExpandMoreIcon />
                </IconButton>
              </Box>

              <Collapse in={isTravelOpen}>
                <Box sx={{ pt: 2 }}>
                  {add_autogenaration_id('travel_id')}
                  {add_autogenaration_id('expense_id')}

                  <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                    {/* MODIFIÉ : Séparer le ReferenceInput et le SelectInput pour capturer le changement */}
                    <ReferenceInput source="departure_location_id" reference="warehouses">
                      <SelectInput
                        source="departure_location_id"
                        label="Lieu de départ"
                        optionText="name"
                        fullWidth
                        onChange={(event) => {
                          setDepartureLocationId(event.target.value)
                        }}
                        sx={{ flex: 1 }}
                      />
                    </ReferenceInput>

                    <ReferenceSelectWithCreate
                      source="arrival_location_id"
                      reference="warehouses"
                      label="Lieu d'arrivée"
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

                  <NumberInput source="fee" label="Frais de déplacement" fullWidth sx={{ mt: 2 }} />
                </Box>
              </Collapse>
            </Box>

            <Divider sx={{ my: 3 }} />

            {/* ---------- Équipements ---------- */}
            <Typography variant="h6" color="primary" sx={{ mb: 1 }}>
              🔧 Équipements à déplacer
            </Typography>
            <ArrayInput source="equipment_lines" label="">
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
                  {add_autogenaration_id('travel_equipment_id')}

                  <ReferenceSelectWithCreate
                    source="equipment_id"
                    reference="equipment"
                    label="Équipement"
                    optionText={(record) => `${record.name} - ${record.description || ''}`}
                    createUrlEnd={getMiddleUrl('equipment')}
                    createForm={<EquipmentForm isCreateForm />}
                    filter={departureLocationId ? { warehouse_id: departureLocationId } : undefined}
                    sx={{ flex: 2 }}
                    extractionPath={'equipment_lines'}
                  />
                </Box>
              </SimpleFormIterator>
            </ArrayInput>

            <Divider sx={{ my: 3 }} />

            {/* ---------- Matériaux ---------- */}
            <Typography variant="h6" color="primary" sx={{ mb: 1 }}>
              📦 Matériaux à déplacer
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
                  {add_autogenaration_id('travel_material_id')}

                  <ReferenceSelectWithCreate
                    source="material_id"
                    reference="materials"
                    label="Matériau"
                    optionText={(record) => `${record.name} / ${record.unit}`}
                    createUrlEnd={getMiddleUrl('materials')}
                    createForm={<MaterialForm isCreateForm />}
                    filter={departureLocationId ? { warehouse_id: departureLocationId } : undefined}
                    sx={{ flex: 2 }}
                    extractionPath={'material_lines'}
                  />

                  <NumberInput source="material_quantity" label="Quantité" sx={{ flex: 1 }} />
                </Box>
              </SimpleFormIterator>
            </ArrayInput>

            <Divider sx={{ my: 3 }} />

            {/* ---------- Personnel ---------- */}
            <Typography variant="h6" color="primary" sx={{ mb: 1 }}>
              👥 Personnel à déplacer
            </Typography>
            <ArrayInput source="people_lines" label="">
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
                    sx={{ flex: 2 }}
                  />
                </Box>
              </SimpleFormIterator>
            </ArrayInput>

            {/* Bouton de soumission personnalisé */}
            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
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
