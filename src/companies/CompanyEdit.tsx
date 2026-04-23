// companies/CompanyEdit.tsx
import { Edit, SimpleForm, TextInput, SelectInput, required } from 'react-admin'

export default function CompanyEdit() {
  return (
    <Edit>
      <SimpleForm>
        <TextInput source="id" disabled />
        <TextInput source="name" label="Nom" validate={[required()]} />
        <TextInput source="rib" label="RIB" />
        <TextInput source="description" label="Description" multiline rows={3} />
        <SelectInput
          source="company_type"
          label="Type"
          choices={[
            { id: 'BTP', name: 'BTP' },
            { id: 'HOTEL', name: 'Hôtel' },
          ]}
          validate={[required()]}
        />
      </SimpleForm>
    </Edit>
  )
}
