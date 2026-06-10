import { SimpleForm, TextInput } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import CashAccountForm from './CashAccountForm'
import GenericEdit from '../../../generic/GenericEdit'

export default function CashAccountEdit() {
  return (
    <GenericEdit>
      <SimpleForm id="cash-account-edit-form" toolbar={<FormToolbar />}>
        <TextInput source="id" sx={{ display: 'none' }} />
        <CashAccountForm />
      </SimpleForm>
    </GenericEdit>
  )
}
