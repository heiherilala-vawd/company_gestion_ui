import { TextInput, NumberInput, ReferenceInput, SelectInput } from 'react-admin'
import generateId from '../../../utili/utils.tsx'

export default function MaterialWarehouseForm({ isCreate = false, isCreateForm = false }) {
  const id = generateId()

  return (
    <>
      {isCreate && (
        <TextInput source="id" sx={{ display: 'none' }} defaultValue={id} data-testid="input-id" />
      )}
      {isCreateForm && <TextInput source="newId" sx={{ display: 'none' }} defaultValue={id} />}
      <ReferenceInput source="material_id" reference="materials" label="Matériau">
        <SelectInput optionText="name" data-testid="input-material_id" />
      </ReferenceInput>
      <ReferenceInput source="warehouse_id" reference="warehouses" label="Entrepôt">
        <SelectInput optionText="name" data-testid="input-warehouse_id" />
      </ReferenceInput>
      <NumberInput source="quantity" label="Quantité" data-testid="input-quantity" />
    </>
  )
}
