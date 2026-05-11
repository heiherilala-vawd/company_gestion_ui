import { Edit, SimpleForm, TextInput } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import TravelExpenseForm from './TravelExpenseForm'

export default function TravelExpenseEdit() {
  return (
    <Edit
      redirect="list"
      transform={(data) => ({
        ...data,
        departure_location: { id: data.departure_location_id },
        arrival_location: { id: data.arrival_location_id },
      })}
      queryOptions={{
        // Intercepter et modifier les données après le fetch
        select: (data) => ({
          ...data,
          departure_location_id: data.departure_location.id,
          arrival_location_id: data.arrival_location.id,
        }),
      }}
    >
      <SimpleForm toolbar={<FormToolbar />}>
        <TextInput source="id" sx={{ display: 'none' }} />
        <TravelExpenseForm />
      </SimpleForm>
    </Edit>
  )
}
