import { TextInput, NumberInput } from 'react-admin'
import generateId from '../../../../utili/utils.tsx'
import {
  renderMaterialSelect,
  renderTravelExpenseSelect,
} from '../../../../generic/SelectWithCreateProvider.tsx'

// eslint-disable-next-line react/prop-types
export default function TravelMaterialForm({ isCreate = false, isCreateForm = false }) {
  return (
    <>
      {isCreate && (
        <TextInput source="id" readOnly defaultValue={generateId()} data-testid="input-id" />
      )}{' '}
      {isCreateForm && <TextInput source="newId" readOnly defaultValue={generateId()} />}
      {renderTravelExpenseSelect(null, null)}
      {renderMaterialSelect(null, null)}
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
