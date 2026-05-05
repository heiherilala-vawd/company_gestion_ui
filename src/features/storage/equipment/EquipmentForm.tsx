import { TextInput, NumberInput, required } from 'react-admin'
import generateId from '../../../utili/utils.tsx'
import { renderWarehouseSelect } from '../../../generic/SelectWithCreateProvider.tsx'

// eslint-disable-next-line react/prop-types
export default function EquipmentForm({ isCreate = false, isCreateForm = false }) {
  return (
    <>
      {isCreate && (
        <TextInput source="id" readOnly defaultValue={generateId()} data-testid="input-id" />
      )}{' '}
      {isCreateForm && <TextInput source="newId" readOnly defaultValue={generateId()} />}
      <TextInput source="name" label="Nom" validate={[required()]} data-testid="input-name" />
      <TextInput
        source="description"
        label="Description"
        multiline
        rows={3}
        data-testid="input-description"
      />
      {renderWarehouseSelect('warehouse_id', 'Entrepôt')}
      <div data-testid="input-floor_number" style={{ width: '100%' }}>
        <NumberInput source="floor_number" label="Étage" />
      </div>
      <NumberInput source="storage_number" label="Emplacement" data-testid="input-storage_number" />
    </>
  )
}
