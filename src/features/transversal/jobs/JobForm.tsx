import { TextInput, SelectInput, DateTimeInput, required } from 'react-admin'
import generateId from '../../../utili/utils.tsx'
import { renderCompanySelect } from '../../../generic/SelectWithCreateProvider.tsx'
import CollapsibleOptionalFields from '../../../generic/CollapsibleOptionalFields'

export default function JobForm({ isCreate = false, isCreateForm = false }) {
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
      {!isCreate && renderCompanySelect('company_id', 'companies')}
      <SelectInput
        source="status"
        label="Statut"
        choices={[
          { id: 'PENDING_SIGNATURE', name: 'En attente signature' },
          { id: 'IN_PROGRESS', name: 'En cours' },
          { id: 'COMPLETED', name: 'Terminé' },
        ]}
        defaultValue="PENDING_SIGNATURE"
        data-testid="input-status"
      />
      <TextInput
        source="description"
        label="Description"
        multiline
        rows={3}
        validate={[required()]}
        data-testid="input-description"
      />
      <CollapsibleOptionalFields>
        <DateTimeInput
          source="contract_signature_date"
          label="Date signature contrat"
          defaultValue={new Date().toISOString()}
          data-testid="input-contract-signature-date"
        />
        <DateTimeInput
          source="start_date"
          label="Date début"
          defaultValue={new Date().toISOString()}
          data-testid="input-start-date"
        />
        <DateTimeInput source="end_date" label="Date fin" data-testid="input-end-date" />
        <TextInput source="comment" label="Commentaire" multiline data-testid="input-comment" />
      </CollapsibleOptionalFields>
    </>
  )
}
