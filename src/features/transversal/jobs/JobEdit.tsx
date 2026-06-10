import { SimpleForm, TextInput } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import JobForm from './JobForm'
import GenericEdit from '../../../generic/GenericEdit'

export default function JobEdit() {
  return (
    <GenericEdit
      queryOptions={{
        // Intercepter et modifier les données après le fetch
        select: (data) => ({
          ...data,
          company_id: data.company?.id,
        }),
      }}
    >
      <SimpleForm id="job-edit-form" toolbar={<FormToolbar />}>
        <TextInput source="id" sx={{ display: 'none' }} />
        <JobForm />
      </SimpleForm>
    </GenericEdit>
  )
}
