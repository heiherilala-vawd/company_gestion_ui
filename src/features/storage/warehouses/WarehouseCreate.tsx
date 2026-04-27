import { Create, SimpleForm, TextInput, ReferenceInput, SelectInput } from 'react-admin'
import generateId from '../../../utili/utils.tsx'
export default function WarehouseCreate() {
  return (
    <Create>
      <SimpleForm>
        <TextInput source="id" readOnly defaultValue={generateId()} />
        <TextInput source="name" label="Nom" />
        <TextInput source="description" label="Description" multiline rows={3} />
        <ReferenceInput source="job_id" reference="jobs" label="Chantier">
          <SelectInput optionText="description" />
        </ReferenceInput>
      </SimpleForm>
    </Create>
  )
}
