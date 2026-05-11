import { Edit, SimpleForm, TextInput } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import OtherExpenseForm from './OtherExpenseForm'

export default function OtherExpenseEdit() {
  return (
    <Edit redirect="list">
      <SimpleForm toolbar={<FormToolbar />}>
        <TextInput source="id" sx={{ display: 'none' }} />
        <OtherExpenseForm />
      </SimpleForm>
    </Edit>
  )
}
