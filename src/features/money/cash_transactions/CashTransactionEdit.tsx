import { Edit, SimpleForm, TextInput } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import CashTransactionForm from './CashTransactionForm'

export default function CashTransactionEdit() {
  return (
    <Edit redirect="list">
      <SimpleForm toolbar={<FormToolbar />}>
        <TextInput source="id" sx={{ display: 'none' }} />
        <CashTransactionForm />
      </SimpleForm>
    </Edit>
  )
}
