import { Create, SimpleForm } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import DepartmentForm from './DepartmentForm'

export default function DepartmentCreate() {
  return (
    <Create
      redirect="list"
      transform={(data) => ({
        ...data,
        company_id: localStorage.getItem('currentCompanyId'),
      })}
    >
      <SimpleForm id="department-create-form" toolbar={<FormToolbar />}>
        <DepartmentForm isCreate />
      </SimpleForm>
    </Create>
  )
}
