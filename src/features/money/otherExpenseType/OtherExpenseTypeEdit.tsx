import { Edit, SimpleForm, TextInput } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import OtherExpenseTypeForm from './OtherExpenseTypeForm'

export default function OtherExpenseTypeEdit() {
  return (
    <Edit redirect="list">
      <SimpleForm id="other-expense-type-edit-form" toolbar={<FormToolbar />}>
        <TextInput source="id" sx={{ display: 'none' }} />
        <OtherExpenseTypeForm />
      </SimpleForm>
    </Edit>
  )
}
