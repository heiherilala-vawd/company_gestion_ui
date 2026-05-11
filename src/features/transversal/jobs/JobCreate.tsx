import { Create, SimpleForm } from 'react-admin'
import JobForm from './JobForm'

export default function JobCreate() {
  return (
    <Create
      redirect="list"
      transform={(data) => ({
        ...data,
        company_id: localStorage.getItem('currentCompanyId'),
      })}
    >
      <SimpleForm>
        <JobForm isCreate />
      </SimpleForm>
    </Create>
  )
}
