import { Create, SimpleForm } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
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
      <SimpleForm toolbar={<FormToolbar />}>
        <JobForm isCreate />
      </SimpleForm>
    </Create>
  )
}
