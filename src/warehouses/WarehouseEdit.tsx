import { Edit, SimpleForm, TextInput, required } from 'react-admin'

export default function WarehouseEdit() {
  return (
    <Edit>
      <SimpleForm>
        <TextInput source="id" readOnly />
        <TextInput source="name" label="Nom" validate={[required()]} />
        <TextInput source="description" label="Description" multiline rows={3} />
        <TextInput source="job_id" label="ID Chantier" />
      </SimpleForm>
    </Edit>
  )
}
