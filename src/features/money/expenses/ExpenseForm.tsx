import { TextInput, NumberInput } from 'react-admin'
import generateId from '../../../utili/utils.tsx'
import { renderJobSelect } from '../../../generic/SelectWithCreateProvider.tsx'

// eslint-disable-next-line react/prop-types
export default function ExpenseForm({ isCreate = false, isCreateForm = false }) {
  return (
    <>
      {isCreate && (
        <TextInput source="id" readOnly defaultValue={generateId()} data-testid="input-id" />
      )}{' '}
      {isCreateForm && <TextInput source="newId" readOnly defaultValue={generateId()} />}
      {renderJobSelect('job_id', 'Chantier')}
      <NumberInput source="amount" label="Montant" data-testid="input-amount" />
      <TextInput
        source="description"
        label="Description"
        multiline
        data-testid="input-description"
      />
      <TextInput source="comment" label="Commentaire" multiline data-testid="input-comment" />
    </>
  )
}
