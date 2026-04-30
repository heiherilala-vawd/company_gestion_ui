import { Create, SimpleForm } from 'react-admin'
import JobForm from './JobForm'

export default function JobCreate() {
  return (
    <Create>
      <SimpleForm>
        <JobForm isCreate />
      </SimpleForm>
    </Create>
  )
}
