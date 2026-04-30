import { Edit, SimpleForm, TextInput } from 'react-admin'
import JobForm from './JobForm'

export default function JobEdit() {
  return (
    <Edit
      transform={(data) => ({
        ...data,
        company_id: data.company?.id,
        company: undefined,
      })}
    >
      <SimpleForm>
        <TextInput source="id" readOnly />
        <JobForm />
      </SimpleForm>
    </Edit>
  )
}
