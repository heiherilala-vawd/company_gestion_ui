import { TextInput } from 'react-admin'
import { renderExpenseSelect } from '../../../generic/SelectWithCreateProvider.tsx'
import generateId from '../../../utili/utils.tsx'

export default function BankFeeForm({ isCreate = false, isCreateForm = false }) {
  return (
    <>
      {isCreate && (
        <TextInput source="id" readOnly defaultValue={generateId()} data-testid="input-id" />
      )}
      {isCreateForm && <TextInput source="newId" readOnly defaultValue={generateId()} />}
      {renderExpenseSelect('expense_id', 'Dépense')}
      <TextInput source="bank_name" label="Nom de la banque" data-testid="input-bank_name" />
      <TextInput
        source="description"
        label="Description"
        multiline
        data-testid="input-description"
      />
    </>
  )
}
