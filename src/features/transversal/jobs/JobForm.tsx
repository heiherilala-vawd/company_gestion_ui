import { TextInput, DateInput, SelectInput } from 'react-admin'
import generateId from '../../../utili/utils.tsx'
import { renderCompanySelect } from '../../../generic/SelectWithCreateProvider.tsx'

// eslint-disable-next-line react/prop-types
export default function JobForm({ isCreate = false, isCreateForm = false }) {
  return (
    <>
      {isCreate && (
        <TextInput source="id" readOnly defaultValue={generateId()} data-testid="input-id" />
      )}{' '}
      {isCreateForm && <TextInput source="newId" readOnly defaultValue={generateId()} />}
      {renderCompanySelect('company_id', 'companies')}
      <TextInput
        source="description"
        label="Description"
        multiline
        rows={3}
        data-testid="input-description"
      />
      <DateInput
        source="contract_signature_date"
        label="Date signature contrat"
        defaultValue={new Date()}
        data-testid="input-contract-signature-date"
      />
      <DateInput
        source="start_date"
        label="Date début"
        defaultValue={new Date()}
        data-testid="input-start-date"
      />
      <DateInput source="end_date" label="Date fin" data-testid="input-end-date" />
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
    </>
  )
}
