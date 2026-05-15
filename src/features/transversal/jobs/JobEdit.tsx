import { Edit, SimpleForm, TextInput } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import JobForm from './JobForm'

export default function JobEdit() {
  return (
    <Edit
      redirect="list"
      queryOptions={{
        // Intercepter et modifier les données après le fetch
        select: (data) => ({
          ...data,
          company_id: data.company?.id,
        }),
      }}
    >
      <SimpleForm toolbar={<FormToolbar />}>
        <TextInput source="id" sx={{ display: 'none' }} />
        <JobForm />
      </SimpleForm>
    </Edit>
  )
}
