import { Create, SimpleForm } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import CashAccountForm from './CashAccountForm'

export default function CashAccountCreate() {
  return (
    <Create redirect="list">
      <SimpleForm id="cash-account-create-form" toolbar={<FormToolbar />}>
        <CashAccountForm isCreate />
      </SimpleForm>
    </Create>
  )
}
