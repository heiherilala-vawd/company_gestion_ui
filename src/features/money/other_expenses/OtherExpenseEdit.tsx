import { Edit, SimpleForm, TextInput } from 'react-admin'
import OtherExpenseForm from './OtherExpenseForm'

export default function OtherExpenseEdit() {
  return (
    <Edit redirect="list">
      <SimpleForm>
        <TextInput source="id" sx={{ display: 'none' }} />
        <OtherExpenseForm />
      </SimpleForm>
    </Edit>
  )
}
