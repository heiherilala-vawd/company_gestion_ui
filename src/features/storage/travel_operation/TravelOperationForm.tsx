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
import generateId from '../../../utili/utils.tsx'
import ReferenceSelectWithCreate from '../../../generic/ReferenceSelectWithCreate.tsx'
import { getMiddleUrl } from '../../../config/dynamicResources.ts'
import MaterialForm from '../../storage/materials/MaterialForm.tsx'
import WarehouseForm from '../../storage/warehouses/WarehouseForm.tsx'
import { useNavigate, useSearchParams } from 'react-router'
import EquipmentForm from '../equipment/EquipmentForm.tsx'
import { operationFormStyles } from '../../../style/components'
import { transitions } from '../../../style/themeConfig'

type TravelMode = 'full' | 'people' | 'materials' | 'equipment'

const modeTitles: Record<TravelMode, { title: string; docTitle: string }> = {
  full: {
    title: 'Nouvelle Opération de Déplacement',
    docTitle: 'Nouvelle Opération de Déplacement',
  },
  people: { title: 'Déplacement du personnel', docTitle: 'Nouveau Déplacement du Personnel' },
  materials: { title: 'Déplacer des matériaux', docTitle: 'Nouveau Déplacement de Matériaux' },
  equipment: { title: 'Déplacer des équipements', docTitle: "Nouveau Déplacement d'Équipements" },
}

interface TravelOperationFormProps {
  mode?: TravelMode
}

const TravelOperationForm = ({ mode: propMode }: TravelOperationFormProps = {}) => {
  const notify = useNotify()
  const { isLoading: identityLoading } = useGetIdentity()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const modeParam = propMode || searchParams.get('mode') || 'full'
  const mode: TravelMode = ['people', 'materials', 'equipment', 'full'].includes(modeParam)
    ? (modeParam as TravelMode)
    : 'full'
  const { title: pageTitle, docTitle } = modeTitles[mode]

  const [departureLocationId, setDepartureLocationId] = useState<string | null>(null)

  const toInstant = (date: string) => {
    if (!date) return null
    return new Date(date).toISOString()
  }

  const add_autogenaration_id = (source: string) => {
    return <TextInput source={source} sx={{ display: 'none' }} defaultValue={generateId()} />
  }

  const [isCommentOpen, setIsCommentOpen] = useState(false)

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
      equipment_lines:
        mode === 'full' || mode === 'equipment'
          ? (data.equipment_lines || []).map((line: any) => ({
              id: line.travel_equipment_id,
              equipment: {
                id: line.equipment_id,
              },
            }))
          : [],
      material_lines:
        mode === 'full' || mode === 'materials'
          ? (data.material_lines || []).map((line: any) => ({
              id: line.travel_material_id,
              material: {
                id: line.material_id,
              },
              quantity: parseFloat(line.material_quantity) || 0,
            }))
          : [],
      people_lines:
        mode === 'full' || mode === 'people'
          ? (data.people_lines || []).map((line: any) => ({
              id: line.travel_people_id,
              user_id: line.user_id,
            }))
          : [],
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

      await response.json()
      notify(
        mode === 'people'
          ? 'Déplacement du personnel créé avec succès !'
          : mode === 'materials'
            ? 'Déplacement des matériaux créé avec succès !'
            : mode === 'equipment'
              ? 'Déplacement des équipements créé avec succès !'
              : 'Opération de déplacement créée avec succès !',
        { type: 'success' },
      )
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
          <Title title={docTitle} />
          <Form id="travel-operation-form" onSubmit={onSubmit}>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
              {pageTitle}
            </Typography>

            <Divider sx={operationFormStyles.divider} />

            <Box sx={{ mb: 2 }}>
              <Box
                onClick={() => setIsCommentOpen(!isCommentOpen)}
                sx={operationFormStyles.toggleBox}
              >
                <Typography variant="h6" color="primary" sx={operationFormStyles.flexFull}>
                  📋 Informations Générales
                </Typography>
                <IconButton
                  size="small"
                  sx={{
                    transform: isCommentOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: transitions.spin,
                  }}
                  data-testid="toggle-comment"
                >
                  <ExpandMoreIcon />
                </IconButton>
              </Box>

              <Collapse in={isCommentOpen}>
                <Box sx={operationFormStyles.collapseContent}>
                  <TextInput
                    source="comment"
                    label="Commentaire"
                    multiline
                    rows={3}
                    fullWidth
                    sx={operationFormStyles.flexFull}
                    data-testid="input-comment"
                  />
                </Box>
              </Collapse>
            </Box>

            <Divider sx={operationFormStyles.divider} />

            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" color="primary" sx={operationFormStyles.sectionHeader}>
                🚚 Détails du Trajet
              </Typography>

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
                      data-testid="input-departure_location_id"
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
              </Box>
            </Box>

            {(mode === 'full' || mode === 'equipment') && (
              <>
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
                        filter={
                          departureLocationId ? { warehouse_id: departureLocationId } : undefined
                        }
                        sx={operationFormStyles.flexDouble}
                        extractionPath={'equipment_lines'}
                      />
                    </Box>
                  </SimpleFormIterator>
                </ArrayInput>
              </>
            )}

            {(mode === 'full' || mode === 'materials') && (
              <>
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
                        filter={
                          departureLocationId ? { warehouse_id: departureLocationId } : undefined
                        }
                        sx={operationFormStyles.flexDouble}
                        extractionPath={'material_lines'}
                      />

                      <NumberInput
                        source="material_quantity"
                        label="Quantité"
                        sx={operationFormStyles.flexFull}
                        data-testid="input-material_quantity"
                      />
                    </Box>
                  </SimpleFormIterator>
                </ArrayInput>
              </>
            )}

            {(mode === 'full' || mode === 'people') && (
              <>
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
              </>
            )}

            <Box sx={operationFormStyles.submitBox}>
              <Button type="submit" variant="contained" color="primary" data-testid="submit-travel">
                Créer l'opération de déplacement
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

export default TravelOperationForm
