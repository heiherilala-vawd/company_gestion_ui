import { SimpleForm, TextInput } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import ExpenseForm from './ExpenseForm'
import GenericEdit from '../../../generic/GenericEdit'

export default function ExpenseEdit() {
  return (
    <GenericEdit
      queryOptions={{
        // Intercepter et modifier les données après le fetch
        select: (data) => ({
          ...data,
          job_id: data.job?.id,
        }),
      }}
    >
      <SimpleForm id="expense-edit-form" toolbar={<FormToolbar />}>
        <TextInput source="id" sx={{ display: 'none' }} />
        <ExpenseForm />
      </SimpleForm>
    </GenericEdit>
  )
}
