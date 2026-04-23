// companies/CompanyCreate.tsx
import { Create, SimpleForm, TextInput, SelectInput, required } from 'react-admin'

const generateId = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export default function CompanyCreate() {
  return (
    <Create
      transform={(data) => ({
        ...data,
        id: data.id || generateId(),
      })}
    >
      <SimpleForm>
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
