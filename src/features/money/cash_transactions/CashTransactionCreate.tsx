import { Create, SimpleForm } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import CashTransactionForm from './CashTransactionForm'

export default function CashTransactionCreate() {
  return (
    <Create redirect="list">
      <SimpleForm toolbar={<FormToolbar />}>
        <CashTransactionForm isCreate />
      </SimpleForm>
    </Create>
  )
}
