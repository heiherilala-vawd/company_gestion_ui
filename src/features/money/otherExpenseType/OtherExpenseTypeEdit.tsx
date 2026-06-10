import { SimpleForm, TextInput } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import OtherExpenseTypeForm from './OtherExpenseTypeForm'
import GenericEdit from '../../../generic/GenericEdit'

export default function OtherExpenseTypeEdit() {
  return (
    <GenericEdit>
      <SimpleForm id="other-expense-type-edit-form" toolbar={<FormToolbar />}>
        <TextInput source="id" sx={{ display: 'none' }} />
        <OtherExpenseTypeForm />
      </SimpleForm>
    </GenericEdit>
  )
}
