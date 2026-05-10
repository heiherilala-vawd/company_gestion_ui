import { Edit, SimpleForm, TextInput } from 'react-admin'
import TravelExpenseForm from './TravelExpenseForm'

export default function TravelExpenseEdit() {
  return (
    <Edit
      transform={(data) => ({
        ...data,
        departure_location: { id: data.departure_location_id },
        arrival_location: { id: data.arrival_location_id },
        expense: data.expense.id,
      })}
    >
      <SimpleForm>
        <TextInput source="id" readOnly />
        <TravelExpenseForm />
      </SimpleForm>
    </Edit>
  )
}
