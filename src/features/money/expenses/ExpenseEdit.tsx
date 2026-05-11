import { Edit, SimpleForm, TextInput } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import ExpenseForm from './ExpenseForm'

export default function ExpenseEdit() {
  return (
    <Edit
      redirect="list"
      queryOptions={{
        // Intercepter et modifier les données après le fetch
        select: (data) => ({
          ...data,
          job_id: data.job.id,
        }),
      }}
    >
      <SimpleForm toolbar={<FormToolbar />}>
        <TextInput source="id" sx={{ display: 'none' }} />
        <ExpenseForm />
      </SimpleForm>
    </Edit>
  )
}
