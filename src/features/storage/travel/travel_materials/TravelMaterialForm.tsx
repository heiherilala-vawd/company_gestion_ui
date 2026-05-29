import { TextInput, NumberInput, DateTimeInput } from 'react-admin'
import generateId from '../../../../utili/utils.tsx'
import {
  renderMaterialSelect,
  renderTravelExpenseSelect,
  renderWarehouseSelect,
} from '../../../../generic/SelectWithCreateProvider.tsx'
import React from 'react'

export default function TravelMaterialForm({ isCreate = false, isCreateForm = false }) {
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
      {isCreateForm && <TextInput source="newId" readOnly defaultValue={generateId()} />}
      {renderTravelExpenseSelect(null, null)}
      {renderMaterialSelect('material', null)}
      {renderWarehouseSelect('arrival_location', "Lieu d'arrivée")}
      <DateTimeInput
        source="arrival_date"
        label="Date d'arrivée"
        defaultValue={new Date().toISOString()}
        data-testid="input-arrival_date"
      />
      <NumberInput source="quantity" label="Quantité" data-testid="input-quantity" />
      <NumberInput
        source="quantity_received"
        label="Quantité reçue"
        data-testid="input-quantity_received"
      />
      <TextInput source="comment" label="Commentaire" multiline data-testid="input-comment" />
    </>
  )
}
