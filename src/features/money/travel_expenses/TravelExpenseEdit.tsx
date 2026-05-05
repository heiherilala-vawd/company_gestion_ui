import { Edit, SimpleForm, TextInput } from 'react-admin'
import TravelExpenseForm from './TravelExpenseForm'

export default function TravelExpenseEdit() {
  return (
    <Edit
      transform={(data) => ({
        ...data,
        expense_id: data.expense?.id,
        expense: undefined,
      })}
    >
      <SimpleForm>
        <TextInput source="id" readOnly />
        <TravelExpenseForm />
      </SimpleForm>
    </Edit>
  )
}
