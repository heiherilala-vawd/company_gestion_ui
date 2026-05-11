import { Create, SimpleForm } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import TravelExpenseForm from './TravelExpenseForm'

export default function TravelExpenseCreate() {
  return (
    <Create
      redirect="list"
      transform={(data) => ({
        ...data,
        departure_location: { id: data.departure_location_id },
        arrival_location: { id: data.arrival_location_id },
        expense: { ...data.expense, job_id: localStorage.getItem('currentJobId') },
      })}
    >
      <SimpleForm toolbar={<FormToolbar />}>
        <TravelExpenseForm isCreate />
      </SimpleForm>
    </Create>
  )
}
