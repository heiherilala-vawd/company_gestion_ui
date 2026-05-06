import { Edit, SimpleForm, TextInput } from 'react-admin'
import TravelExpenseForm from './TravelExpenseForm'

export default function TravelExpenseEdit() {
  return (
    <Edit
      transform={(data) => ({
        ...data,
      })}
    >
      <SimpleForm>
        <TextInput source="id" readOnly />
        <TravelExpenseForm />
      </SimpleForm>
    </Edit>
  )
}
