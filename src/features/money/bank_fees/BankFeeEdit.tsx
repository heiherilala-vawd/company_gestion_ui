import { Edit, SimpleForm, TextInput } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import BankFeeForm from './BankFeeForm.tsx'

export default function BankFeeEdit() {
  return (
    <Edit redirect="list">
      <SimpleForm toolbar={<FormToolbar />}>
        <TextInput source="id" sx={{ display: 'none' }} />
        <BankFeeForm />
      </SimpleForm>
    </Edit>
  )
}
