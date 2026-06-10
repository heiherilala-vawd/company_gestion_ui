import { SimpleForm } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import TravelExpenseForm from './TravelExpenseForm'
import GenericCreate from '../../../generic/GenericCreate'

export default function TravelExpenseCreate() {
  return (
    <GenericCreate
      transform={(data) => {
        const expense = { ...data.expense, job_id: localStorage.getItem('currentJobId') }
        if (!expense.description && expense._generated_desc) {
          expense.description = expense._generated_desc
        }
        delete expense._generated_desc
        return {
          ...data,
          departure_location: { id: data.departure_location_id },
          arrival_location: { id: data.arrival_location_id },
          expense,
        }
      }}
    >
      <SimpleForm id="travel-expense-create-form" toolbar={<FormToolbar />}>
        <TravelExpenseForm isCreate />
      </SimpleForm>
    </GenericCreate>
  )
}
