import { TextInput, NumberInput, SelectInput, DateTimeInput } from 'react-admin'
import generateId from '../../../../utili/utils.tsx'
import {
  renderEquipmentSelect,
  renderTravelExpenseSelect,
  renderWarehouseSelect,
} from '../../../../generic/SelectWithCreateProvider.tsx'
import React from 'react'

// eslint-disable-next-line react/prop-types
export default function TravelEquipmentForm({ isCreate = false, isCreateForm = false }) {
  return (
    <>
      {isCreate && (
        <TextInput
          source="id"
          readOnly
          defaultValue={generateId()}
          sx={{ display: 'none' }}
          data-testid="input-id"
        />
      )}{' '}
      {isCreateForm && (
        <TextInput source="newId" readOnly defaultValue={generateId()} data-testid="input-id" />
      )}
      {renderTravelExpenseSelect(null, null)}
      {renderEquipmentSelect('equipment', null)}
      {renderWarehouseSelect('arrival_location', "Lieu d'arrivée")}
      <DateTimeInput
        source="arrival_date"
        label="Date d'arrivée"
        defaultValue={new Date().toISOString()}
        data-testid="input-arrival_date"
      />
      <NumberInput source="quantity" label="Quantité" data-testid="input-quantity" />
      <SelectInput
        source="status"
        label="Statut"
        choices={[
          { id: 'IN_PROGRESS', name: 'En cours' },
          { id: 'LOST', name: 'Perdu' },
          { id: 'ARRIVED', name: 'Arrivé' },
        ]}
        data-testid="input-status"
      />
      <TextInput source="comment" label="Commentaire" multiline data-testid="input-comment" />
    </>
  )
}
