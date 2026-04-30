import { TextInput } from 'react-admin'
import ReferenceSelectWithCreate from '../../../generic/ReferenceSelectWithCreate'
import generateId from '../../../utili/utils.tsx'

// eslint-disable-next-line react/prop-types
export default function EmployerPaymentForm({ isCreate = false, isCreateForm = false }) {
  return (
    <>
      {isCreate && <TextInput source="id" readOnly defaultValue={generateId()} />}
      {isCreateForm && <TextInput source="newId" readOnly defaultValue={generateId()} />}

      <ReferenceSelectWithCreate
        source="expense_id"
        reference="expenses"
        label="Dépense"
        optionText="description"
      />
      <ReferenceSelectWithCreate
        source="employee_id"
        reference="users"
        label="Employé"
        optionText="email"
      />
      <TextInput source="payment_description" label="Description du paiement" multiline />
      <TextInput source="payment_type" label="Type de paiement" />
    </>
  )
}
