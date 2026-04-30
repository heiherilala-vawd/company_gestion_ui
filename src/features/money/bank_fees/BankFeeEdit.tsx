import { Edit, SimpleForm, TextInput, SelectInput } from 'react-admin'
import ReferenceSelectWithCreate from '../../../generic/ReferenceSelectWithCreate'

export default function BankFeeEdit() {
  return (
    <Edit
      transform={(data) => ({
        ...data,
        expense_id: data.expense?.id,
        expense: undefined,
      })}
    >
      <SimpleForm>
        <TextInput source="id" disabled />
        <ReferenceSelectWithCreate
          source="expense_id"
          reference="expenses"
          label="Dépense"
          optionText="description"
        />
        <TextInput source="bank_name" label="Nom de la banque" />
        <TextInput source="description" label="Description" multiline />
      </SimpleForm>
    </Edit>
  )
}
