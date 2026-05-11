import { Edit, SimpleForm, TextInput } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import IncomeForm from './IncomeForm'

export default function IncomeEdit() {
  return (
    <Edit
      redirect="list"
      queryOptions={{
        // Intercepter et modifier les données après le fetch
        select: (data) => ({
          ...data,
          job_id: data.job.id,
          income_type_id: data.income_type.id,
        }),
      }}
    >
      <SimpleForm toolbar={<FormToolbar />}>
        <TextInput source="id" sx={{ display: 'none' }} />
        <IncomeForm />
      </SimpleForm>
    </Edit>
  )
}
