import { TextInput } from 'react-admin'
import generateId from '../../../utili/utils.tsx'
import { renderExpenseSelect } from '../../../generic/SelectWithCreateProvider.tsx'

// eslint-disable-next-line react/prop-types
export default function OtherExpenseForm({ isCreate = false, isCreateForm = false }) {
  return (
    <>
      {isCreate && (
        <TextInput source="id" readOnly defaultValue={generateId()} data-testid="input-id" />
      )}{' '}
      {isCreateForm && <TextInput source="newId" readOnly defaultValue={generateId()} />}
      {renderExpenseSelect('expense_id', 'Dépense')}
      <TextInput
        source="description"
        label="Description"
        multiline
        data-testid="input-description"
      />
    </>
  )
}
