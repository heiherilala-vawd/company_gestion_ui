import { SimpleForm, TextInput } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import CashTransactionForm from './CashTransactionForm'
import GenericEdit from '../../../generic/GenericEdit'

export default function CashTransactionEdit() {
  return (
    <GenericEdit>
      <SimpleForm id="cash-transaction-edit-form" toolbar={<FormToolbar />}>
        <TextInput source="id" sx={{ display: 'none' }} />
        <CashTransactionForm />
      </SimpleForm>
    </GenericEdit>
  )
}
