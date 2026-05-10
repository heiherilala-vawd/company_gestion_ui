import { Edit, SimpleForm, TextInput } from 'react-admin'
import ExpenseForm from './ExpenseForm'

export default function ExpenseEdit() {
  return (
    <Edit>
      <SimpleForm>
        <TextInput source="id" readOnly />
        <ExpenseForm />
      </SimpleForm>
    </Edit>
  )
}
