import { useState } from 'react'
import {
  List,
  Datagrid,
  TextField,
  NumberField,
  DateField,
  SelectField,
  FunctionField,
} from 'react-admin'
import { ToggleButtonGroup, ToggleButton, Box, Typography } from '@mui/material'

export default function TravelMaterialActivity() {
  const [entityType, setEntityType] = useState<'materials' | 'equipment'>('materials')

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
        Réception - Éléments non arrivés
      </Typography>
      <ToggleButtonGroup
        value={entityType}
        exclusive
        onChange={(_, value) => value && setEntityType(value)}
        sx={{ mb: 2 }}
      >
        <ToggleButton value="materials">Matériaux</ToggleButton>
        <ToggleButton value="equipment">Équipement</ToggleButton>
      </ToggleButtonGroup>

      {entityType === 'materials' ? (
        <List
          key="materials"
          resource="materials"
          filter={{ not_arrived: true }}
          title="Matériaux non arrivés"
        >
          <Datagrid>
            <TextField source="id" />
            <TextField source="name" label="Nom" />
            <TextField source="description" label="Description" />
            <SelectField
              source="unit"
              label="Unité"
              choices={[
                { id: 'SAC', name: 'Sac' },
                { id: 'L', name: 'Litre' },
                { id: 'KG', name: 'Kilogramme' },
                { id: 'M2', name: 'Mètre carré' },
                { id: 'M3', name: 'Mètre cube' },
                { id: 'KIT', name: 'Kit' },
                { id: 'POT', name: 'Pot' },
                { id: 'PNL', name: 'Panel' },
                { id: 'FEU', name: 'Feuille' },
                { id: 'BAR', name: 'Barre' },
                { id: 'T', name: 'Tonne' },
                { id: 'M', name: 'Mètre' },
                { id: 'FFT', name: 'Forfait' },
                { id: 'U', name: 'Unité' },
              ]}
            />
            <DateField source="created_at" label="Créé le" showTime />
            <FunctionField
              label="Créé par"
              render={(record) => (
                <span>
                  {record.created_by?.first_name} {record.created_by?.last_name}
                </span>
              )}
            />
          </Datagrid>
        </List>
      ) : (
        <List
          key="equipment"
          resource="equipment"
          filter={{ not_arrived: true }}
          title="Équipement non arrivé"
        >
          <Datagrid>
            <TextField source="name" label="Nom" />
            <TextField source="description" label="Description" />
            <TextField source="warehouse.name" label="Entrepôt" />
            <NumberField source="floor_number" label="Étage" />
            <NumberField source="storage_number" label="Emplacement" />
            <DateField source="created_at" label="Créé le" showTime />
            <FunctionField
              label="Créé par"
              render={(record) => (
                <span>
                  {record.created_by?.first_name} {record.created_by?.last_name}
                </span>
              )}
            />
          </Datagrid>
        </List>
      )}
    </Box>
  )
}
