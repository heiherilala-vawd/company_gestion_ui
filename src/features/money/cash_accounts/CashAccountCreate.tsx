import { SimpleForm } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import CashAccountForm from './CashAccountForm'
import GenericCreate from '../../../generic/GenericCreate'

export default function CashAccountCreate() {
  return (
    <GenericCreate>
      <SimpleForm id="cash-account-create-form" toolbar={<FormToolbar />}>
        <CashAccountForm isCreate />
      </SimpleForm>
    </GenericCreate>
  )
}
