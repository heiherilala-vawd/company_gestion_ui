import { Create, SimpleForm } from 'react-admin'
import JobForm from './JobForm'

export default function JobCreate() {
  return (
    <Create
      transform={(data) => ({
        ...data,
        company_id: data.company?.id,
        company: undefined,
      })}
    >
      <SimpleForm>
        <JobForm isCreate />
      </SimpleForm>
    </Create>
  )
}
