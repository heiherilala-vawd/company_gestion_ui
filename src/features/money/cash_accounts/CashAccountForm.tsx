import { TextInput, NumberInput } from 'react-admin'
import generateId from '../../../utili/utils.tsx'
import CollapsibleOptionalFields from '../../../generic/CollapsibleOptionalFields'

export default function CashAccountForm({ isCreate = false, isCreateForm = false }) {
  const id = generateId()

  return (
    <>
      {isCreate && (
        <TextInput source="id" sx={{ display: 'none' }} defaultValue={id} data-testid="input-id" />
      )}
      {isCreateForm && <TextInput source="newId" sx={{ display: 'none' }} defaultValue={id} />}
      <TextInput source="name" label="Nom" data-testid="input-name" />
      <NumberInput source="balance" label="Solde" data-testid="input-balance" />
      <TextInput
        source="company_id"
        label="ID Entreprise"
        defaultValue={localStorage.getItem('currentCompanyId')}
        sx={{ display: 'none' }}
      />
      <CollapsibleOptionalFields>
        <TextInput
          source="description"
          label="Description"
          multiline
          data-testid="input-description"
        />
        <TextInput source="comment" label="Commentaire" multiline data-testid="input-comment" />
      </CollapsibleOptionalFields>
    </>
  )
}
