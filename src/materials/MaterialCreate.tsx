import { Create, SimpleForm, TextInput, NumberInput, required } from 'react-admin'
import generateId from '../utili/utils.tsx'

export default function MaterialCreate() {
  return (
    <Create>
      <SimpleForm>
        <TextInput source="id" readOnly defaultValue={generateId()} />
        <TextInput source="name" label="Nom" validate={[required()]} />
        <TextInput source="description" label="Description" multiline rows={3} />
        <TextInput source="warehouse_id" label="ID Entrepôt" validate={[required()]} />
        <NumberInput source="floor_number" label="Étage" />
        <NumberInput source="storage_number" label="Emplacement" />
      </SimpleForm>
    </Create>
  )
}
