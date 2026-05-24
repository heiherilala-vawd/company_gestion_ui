import { Edit, SimpleForm, TextInput } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import CashAccountForm from './CashAccountForm'

export default function CashAccountEdit() {
  return (
    <Edit redirect="list">
      <SimpleForm toolbar={<FormToolbar />}>
        <TextInput source="id" sx={{ display: 'none' }} />
        <CashAccountForm />
      </SimpleForm>
    </Edit>
  )
}
