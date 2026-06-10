import { SimpleForm, TextInput } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import TravelExpenseForm from './TravelExpenseForm'
import GenericEdit from '../../../generic/GenericEdit'

export default function TravelExpenseEdit() {
  return (
    <GenericEdit
      transform={(data) => {
        if (!data.expense?.description && data.expense?._generated_desc) {
          data.expense.description = data.expense._generated_desc
        }
        delete data.expense?._generated_desc
        return {
          ...data,
          departure_location: { id: data.departure_location_id },
          arrival_location: { id: data.arrival_location_id },
        }
      }}
      queryOptions={{
        // Intercepter et modifier les données après le fetch
        select: (data) => ({
          ...data,
          departure_location_id: data.departure_location?.id,
          arrival_location_id: data.arrival_location?.id,
        }),
      }}
    >
      <SimpleForm id="travel-expense-edit-form" toolbar={<FormToolbar />}>
        <TextInput source="id" sx={{ display: 'none' }} />
        <TravelExpenseForm />
      </SimpleForm>
    </GenericEdit>
  )
}
