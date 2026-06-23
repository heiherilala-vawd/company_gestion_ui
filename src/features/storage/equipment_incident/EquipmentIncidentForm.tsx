import { TextInput, SelectInput } from 'react-admin'
import generateId from '../../../utili/utils.tsx'
import React from 'react'

export default function EquipmentIncidentForm({ isCreate = false }: { isCreate?: boolean }) {
  return (
    <>
      {isCreate && (
        <TextInput
          source="id"
          sx={{ display: 'none' }}
          defaultValue={generateId()}
          data-testid="input-id"
        />
      )}
      <SelectInput
        source="incident_type"
        label="Type d'incident"
        data-testid="input-incident_type"
        choices={[
          { id: 'DAMAGED', name: 'Endommagé' },
          { id: 'LOST', name: 'Perdu' },
        ]}
      />
      <TextInput source="equipment_id" label="Équipement ID" data-testid="input-equipment_id" />
      <TextInput source="user_id" label="Utilisateur ID" data-testid="input-user_id" />
      <TextInput source="travel_id" label="Voyage ID" data-testid="input-travel_id" />
      <TextInput source="location" label="Lieu" data-testid="input-location" />
      <TextInput source="comment" label="Commentaire" multiline data-testid="input-comment" />
    </>
  )
}
