import { Edit, SimpleForm, TextInput, NumberInput, required } from 'react-admin'

export default function MaterialEdit() {
  return (
    <Edit>
      <SimpleForm>
        <TextInput source="id" disabled />
        <TextInput source="name" label="Nom" validate={[required()]} />
        <TextInput source="description" label="Description" multiline rows={3} />
        <TextInput source="warehouse_id" label="ID Entrepôt" validate={[required()]} />
        <NumberInput source="floor_number" label="Étage" />
        <NumberInput source="storage_number" label="Emplacement" />
      </SimpleForm>
    </Edit>
  )
}
