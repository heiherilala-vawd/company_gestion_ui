import { SimpleForm } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import DepartmentForm from './DepartmentForm'
import GenericCreate from '../../../generic/GenericCreate'

export default function DepartmentCreate() {
  return (
    <GenericCreate
      transform={(data) => ({
        ...data,
        company_id: localStorage.getItem('currentCompanyId'),
      })}
    >
      <SimpleForm id="department-create-form" toolbar={<FormToolbar />}>
        <DepartmentForm isCreate />
      </SimpleForm>
    </GenericCreate>
  )
}
