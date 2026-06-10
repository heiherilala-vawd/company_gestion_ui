import { SimpleForm } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import CashTransactionForm from './CashTransactionForm'
import GenericCreate from '../../../generic/GenericCreate'

export default function CashTransactionCreate() {
  return (
    <GenericCreate>
      <SimpleForm id="cash-transaction-create-form" toolbar={<FormToolbar />}>
        <CashTransactionForm isCreate />
      </SimpleForm>
    </GenericCreate>
  )
}
