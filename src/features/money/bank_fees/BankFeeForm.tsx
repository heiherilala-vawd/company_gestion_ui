import { TextInput } from 'react-admin'
import ReferenceSelectWithCreate from '../../../generic/ReferenceSelectWithCreate'

export default function BankFeeForm({ isCreate = false }) {
  return (
    <>
      <ReferenceSelectWithCreate
        source="expense_id"
        reference="expenses"
        label="Dépense"
        optionText="description"
      />
      <TextInput source="bank_name" label="Nom de la banque" />
      <TextInput source="description" label="Description" multiline />
    </>
  )
}
