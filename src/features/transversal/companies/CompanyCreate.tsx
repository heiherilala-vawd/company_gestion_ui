// companies/CompanyCreate.tsx
import { Create, SimpleForm, TextInput, SelectInput, required } from 'react-admin'
import generateId from '../../../utili/utils.tsx'

export default function CompanyCreate() {
  return (
    <Create
      transform={(data) => ({
        ...data,
        id: data.id || generateId(),
      })}
    >
      <SimpleForm>
        <TextInput source="id" readOnly defaultValue={generateId()} />
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
    </Create>
  )
}
