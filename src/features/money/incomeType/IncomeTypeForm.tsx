import { TextInput } from 'react-admin'
import generateId from '../../../utili/utils.tsx'
import CollapsibleOptionalFields from '../../../generic/CollapsibleOptionalFields'

export default function IncomeTypeForm({ isCreate = false, isCreateForm = false }) {
  return (
    <>
      {isCreate && (
        <TextInput
          source="id"
          sx={{ display: 'none' }}
          defaultValue={generateId()}
          data-testid="input-id"
        />
      )}{' '}
      {isCreateForm && (
        <TextInput source="newId" sx={{ display: 'none' }} defaultValue={generateId()} />
      )}
      <TextInput source="name" label="Nom" data-testid="input-name" />
      <TextInput
        source="company_id"
        defaultValue={localStorage.getItem('currentCompanyId')}
        data-testid="input-company"
        sx={{ display: 'none' }}
      />
      <CollapsibleOptionalFields>
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
      </CollapsibleOptionalFields>
    </>
  )
}
