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
  ReferenceInput,
  TextInput,
  NumberInput,
  SelectInput,
  BooleanInput,
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
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import generateId from '../utili/utils'
import ReferenceSelectWithCreate from '../generic/ReferenceSelectWithCreate'
import { getMiddleUrl } from '../config/dynamicResources'
import EquipmentForm from './storage/equipment/EquipmentForm'
import { useNavigate } from 'react-router'
import { operationFormStyles } from '../style/components'
import { transitions } from '../style/themeConfig'

const TravelEquipmentActivityForm = () => {
  const notify = useNotify()
  const { isLoading: identityLoading } = useGetIdentity()
  const navigate = useNavigate()

  const [isTravelOpen, setIsTravelOpen] = useState(true)
  const [departureLocationId, setDepartureLocationId] = useState<string | null>(null)

  const toInstant = (date: string) => {
    if (!date) return null
    return new Date(date).toISOString()
  }

  const addAutoId = (source: string) => (
    <TextInput source={source} sx={{ display: 'none' }} defaultValue={generateId()} />
  )

  const onSubmit = async (data: any) => {
    const payload = {
      comment: data.comment || null,
      travel: {
        id: data.travel_id,
        expense_id: data.expense_id,
        departure_location: data.departure_location_id ? { id: data.departure_location_id } : null,
        arrival_location: data.arrival_location_id ? { id: data.arrival_location_id } : null,
        departure_date: toInstant(data.departure_date),
        arrival_date: toInstant(data.arrival_date),
        fee: parseFloat(data.fee) || 0,
      },
      direct_arrival: data.direct_arrival ?? false,
      equipment_lines: (data.equipment_lines || []).map((line: any) => ({
        id: line.travel_equipment_id,
        equipment: { id: line.equipment_id },
      })),
      material_lines: [],
      people_lines: [],
    }

    const url = getMiddleUrl('travel_operations')
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

      await response.json()
      notify('Déplacement des équipements créé avec succès !', { type: 'success' })
      navigate('/')
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
          <Title title="Nouveau Déplacement d'Équipements" />
          <Form id="travel-equipment-activity-form" onSubmit={onSubmit}>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
              Déplacer des équipements
            </Typography>

            <TextInput
              source="comment"
              label="Commentaire"
              multiline
              rows={3}
              fullWidth
              sx={{ mb: 2 }}
              data-testid="input-comment"
            />

            <Box sx={{ mb: 2 }}>
              <Box
                onClick={() => setIsTravelOpen(!isTravelOpen)}
                sx={operationFormStyles.toggleBox}
              >
                <Typography variant="h6" color="primary" sx={operationFormStyles.flexFull}>
                  Détails du Trajet
                </Typography>
                <IconButton
                  size="small"
                  sx={{
                    transform: isTravelOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: transitions.spin,
                  }}
                  data-testid="toggle-travel-details"
                >
                  <ExpandMoreIcon />
                </IconButton>
              </Box>

              <Collapse in={isTravelOpen}>
                <Box sx={operationFormStyles.collapseContent}>
                  {addAutoId('travel_id')}
                  {addAutoId('expense_id')}

                  <Box sx={operationFormStyles.flexRow}>
                    <ReferenceInput source="departure_location_id" reference="warehouses">
                      <SelectInput
                        label="Lieu de départ"
                        optionText="name"
                        fullWidth
                        onChange={(event) => {
                          setDepartureLocationId(event.target.value)
                        }}
                        sx={operationFormStyles.flexFull}
                        data-testid="input-departure_location_id"
                      />
                    </ReferenceInput>

                    <ReferenceSelectWithCreate
                      source="arrival_location_id"
                      reference="warehouses"
                      label="Lieu d'arrivée"
                      optionText="name"
                      createUrlEnd={getMiddleUrl('warehouses')}
                      createForm={<div />}
                      sx={operationFormStyles.flexFull}
                    />
                  </Box>

                  <Box sx={operationFormStyles.collapseRow}>
                    <DateTimeInput
                      source="departure_date"
                      label="Date de départ"
                      sx={operationFormStyles.flexFull}
                      defaultValue={new Date().toISOString()}
                      data-testid="input-departure_date"
                    />
                    <DateTimeInput
                      source="arrival_date"
                      label="Date d'arrivée"
                      sx={operationFormStyles.flexFull}
                      defaultValue={new Date().toISOString()}
                      data-testid="input-arrival_date"
                    />
                  </Box>

                  <NumberInput
                    source="fee"
                    label="Frais de déplacement"
                    fullWidth
                    sx={{ mt: 2 }}
                    data-testid="input-fee"
                  />

                  <BooleanInput
                    source="direct_arrival"
                    label="Arrivée directe"
                    helperText="Activé : les matériaux/équipements arrivent directement à destination. Désactivé : ils sont en route."
                    defaultValue={false}
                    sx={{ mt: 2 }}
                    data-testid="input-direct_arrival"
                  />
                </Box>
              </Collapse>
            </Box>

            <Divider sx={operationFormStyles.divider} />

            <Typography variant="h6" color="primary" sx={operationFormStyles.sectionHeader}>
              Équipements à déplacer
            </Typography>
            <ArrayInput source="equipment_lines" label="">
              <SimpleFormIterator inline>
                <Box sx={operationFormStyles.flexRowAlign}>
                  {addAutoId('travel_equipment_id')}

                  <ReferenceSelectWithCreate
                    source="equipment_id"
                    reference="equipment"
                    label="Équipement"
                    optionText={(record: any) => `${record.name} - ${record.description || ''}`}
                    createUrlEnd={getMiddleUrl('equipment')}
                    createForm={<EquipmentForm isCreateForm />}
                    filter={departureLocationId ? { warehouse_id: departureLocationId } : undefined}
                    sx={operationFormStyles.flexDouble}
                    extractionPath={'equipment_lines'}
                  />
                </Box>
              </SimpleFormIterator>
            </ArrayInput>

            <Box sx={operationFormStyles.submitBox}>
              <Button type="submit" variant="contained" color="primary" data-testid="submit-travel">
                Créer le déplacement
              </Button>
              <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/')} sx={{ ml: 1 }}>
                Retour
              </Button>
            </Box>
          </Form>
        </CardContent>
      </Card>
    </ResourceContextProvider>
  )
}

export default TravelEquipmentActivityForm
