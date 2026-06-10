import { SimpleForm } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import JobForm from './JobForm'
import GenericCreate from '../../../generic/GenericCreate'

export default function JobCreate() {
  return (
    <GenericCreate
      transform={(data) => ({
        ...data,
        company_id: localStorage.getItem('currentCompanyId'),
      })}
    >
      <SimpleForm id="job-create-form" toolbar={<FormToolbar />}>
        <JobForm isCreate />
      </SimpleForm>
    </GenericCreate>
  )
}
