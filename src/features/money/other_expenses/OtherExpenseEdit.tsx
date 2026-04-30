import { Edit, SimpleForm, TextInput } from 'react-admin'
import OtherExpenseForm from './OtherExpenseForm'

export default function OtherExpenseEdit() {
  return (
    <Edit
      transform={(data) => ({
        ...data,
        expense_id: data.expense?.id,
        expense: undefined,
      })}
    >
      <SimpleForm>
        <TextInput source="id" disabled />
        <OtherExpenseForm />
      </SimpleForm>
    </Edit>
  )
}
