import { TextInput } from 'react-admin'
import generateId from '../../../utili/utils.tsx'
import { renderJobSelect } from '../../../generic/SelectWithCreateProvider.tsx'
import CollapsibleOptionalFields from '../../../generic/CollapsibleOptionalFields'

export default function WarehouseForm({ isCreate = false, isCreateForm = false }) {
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
      {!isCreate && renderJobSelect('job_id', 'Travail')}
      <CollapsibleOptionalFields>
        <TextInput
          source="description"
          label="Description"
          multiline
          rows={3}
          data-testid="input-description"
        />
        <TextInput source="comment" label="Commentaire" multiline data-testid="input-comment" />
      </CollapsibleOptionalFields>
    </>
  )
}
