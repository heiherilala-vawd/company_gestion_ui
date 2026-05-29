import { required, TextInput, SelectInput } from 'react-admin'
import generateId from '../../../utili/utils.tsx'

export default function CompanyForm({ isCreate = false, isCreateForm = false }) {
  return (
    <>
      {isCreateForm && <TextInput source="newId" readOnly defaultValue={generateId()} />}
      {isCreate && (
        <TextInput
          source="id"
          readOnly
          defaultValue={generateId()}
          sx={{ display: 'none' }}
          data-testid="input-id"
        />
      )}
      <TextInput source="name" label="Nom" validate={[required()]} data-testid="input-name" />
      <TextInput source="rib" label="RIB" data-testid="input-rib" />
      <TextInput
        source="description"
        label="Description"
        multiline
        rows={3}
        data-testid="input-description"
      />
      <TextInput source="comment" label="Commentaire" data-testid="input-comment" />
      <SelectInput
        source="company_type"
        label="Type"
        choices={[
          { id: 'BTP', name: 'BTP' },
          { id: 'HOTEL', name: 'Hôtel' },
        ]}
        validate={[required()]}
        data-testid="input-company-type"
      />
    </>
  )
}
