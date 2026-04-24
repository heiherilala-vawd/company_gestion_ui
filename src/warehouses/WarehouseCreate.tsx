import { Create, SimpleForm, TextInput, required } from 'react-admin'
import generateId from '../utili/utils.tsx'
export default function WarehouseCreate() {
  return (
    <Create>
      <SimpleForm>
        <TextInput source="id" readOnly defaultValue={generateId()} />
        <TextInput source="name" label="Nom" validate={[required()]} />
        <TextInput source="description" label="Description" multiline rows={3} />
        <TextInput source="job_id" label="ID Chantier" />
      </SimpleForm>
    </Create>
  )
}
