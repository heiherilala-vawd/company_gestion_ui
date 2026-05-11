import { TextInput, NumberInput } from 'react-admin'
import generateId from '../../../utili/utils.tsx'

// eslint-disable-next-line react/prop-types
export default function IncomeTypeForm({ isCreate = false, isCreateForm = false }) {
  return (
    <>
      {isCreate && (
        <TextInput
          source="id"
          readOnly
          defaultValue={generateId()}
          sx={{ display: 'none' }}
          data-testid="input-id"
        />
      )}{' '}
      {isCreateForm && <TextInput source="newId" readOnly defaultValue={generateId()} />}
      <TextInput source="name" label="Nom" data-testid="input-name" />
      <TextInput
        source="company_id"
        defaultValue={localStorage.getItem('currentCompanyId')}
        data-testid="input-company"
        sx={{ display: 'none' }}
      />
      <TextInput
        source="description"
        label="Description"
        multiline
        rows={3}
        data-testid="input-description"
      />
      <TextInput
        source="comment"
        label="Commentaire"
        multiline
        rows={3}
        data-testid="input-comment"
      />
    </>
  )
}
