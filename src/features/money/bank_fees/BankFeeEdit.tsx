import { Edit, SimpleForm, TextInput } from 'react-admin'
import BankFeeForm from './BankFeeForm.tsx'

export default function BankFeeEdit() {
  return (
    <Edit redirect="list">
      <SimpleForm>
        <TextInput source="id" sx={{ display: 'none' }} />
        <BankFeeForm />
      </SimpleForm>
    </Edit>
  )
}
