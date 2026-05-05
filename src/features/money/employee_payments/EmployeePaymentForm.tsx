import { TextInput } from 'react-admin'
import generateId from '../../../utili/utils.tsx'
import {
  renderExpenseSelect,
  renderUserSelect,
} from '../../../generic/SelectWithCreateProvider.tsx'

// eslint-disable-next-line react/prop-types
export default function EmployeePaymentForm({ isCreate = false, isCreateForm = false }) {
  return (
    <>
      {isCreate && (
        <TextInput source="id" readOnly defaultValue={generateId()} data-testid="input-id" />
      )}{' '}
      {isCreateForm && <TextInput source="newId" readOnly defaultValue={generateId()} />}
      {renderUserSelect('employee_id', 'Employé')}
      {renderExpenseSelect('expense_id', 'Dépense')}
      <TextInput
        source="payment_description"
        label="Description du paiement"
        multiline
        data-testid="input-payment_description"
      />
      <TextInput source="payment_type" label="Type de paiement" data-testid="input-payment_type" />
    </>
  )
}
