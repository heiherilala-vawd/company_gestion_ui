import { TextInput, NumberInput, DateTimeInput } from 'react-admin'
import generateId from '../../../../utili/utils.tsx'
import {
  renderMaterialSelect,
  renderTravelExpenseSelect,
  renderWarehouseSelect,
} from '../../../../generic/SelectWithCreateProvider.tsx'
import CollapsibleOptionalFields from '../../../../generic/CollapsibleOptionalFields'
import React from 'react'

export default function TravelMaterialForm({ isCreate = false, isCreateForm = false }) {
  return (
    <>
      {isCreate && (
        <TextInput
          source="id"
          sx={{ display: 'none' }}
          defaultValue={generateId()}
          data-testid="input-id"
        />
      )}{' '}
      {isCreateForm && (
        <TextInput source="newId" sx={{ display: 'none' }} defaultValue={generateId()} />
      )}
      {renderTravelExpenseSelect(null, null, !isCreate)}
      {renderMaterialSelect('material', null)}
      {renderWarehouseSelect('arrival_location', "Lieu d'arrivée")}
      <NumberInput source="quantity" label="Quantité" data-testid="input-quantity" />
      <CollapsibleOptionalFields>
        <DateTimeInput
          source="arrival_date"
          label="Date d'arrivée"
          defaultValue={new Date().toISOString()}
          data-testid="input-arrival_date"
        />
        <NumberInput
          source="quantity_received"
          label="Quantité reçue"
          data-testid="input-quantity_received"
        />
        <TextInput source="comment" label="Commentaire" multiline data-testid="input-comment" />
      </CollapsibleOptionalFields>
    </>
  )
}
