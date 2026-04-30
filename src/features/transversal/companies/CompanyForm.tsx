import { TextInput, SelectInput, required } from 'react-admin'
import generateId from '../../../utili/utils.tsx'

// eslint-disable-next-line react/prop-types
export default function CompanyForm({ isCreate = false, isCreateForm = false }) {
  return (
    <>
      {isCreateForm && <TextInput source="newId" readOnly defaultValue={generateId()} />}
      {isCreate && <TextInput source="id" readOnly defaultValue={generateId()} />}
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
    </>
  )
}
