import { TextInput, NumberInput, required } from 'react-admin'
import generateId from '../../../utili/utils.tsx'
import ReferenceSelectWithCreate from '../../../generic/ReferenceSelectWithCreate'

// eslint-disable-next-line react/prop-types
export default function EquipmentForm({ isCreate = false, isCreateForm = false }) {
  return (
    <>
      {isCreate && <TextInput source="id" readOnly defaultValue={generateId()} />}
      {isCreateForm && <TextInput source="newId" readOnly defaultValue={generateId()} />}
      <TextInput source="name" label="Nom" validate={[required()]} />
      <TextInput source="description" label="Description" multiline rows={3} />
      <ReferenceSelectWithCreate
        source="warehouse_id"
        reference="warehouses"
        label="Entrepôt"
        optionText="name"
      />
      <NumberInput source="floor_number" label="Étage" />
      <NumberInput source="storage_number" label="Emplacement" />
    </>
  )
}
