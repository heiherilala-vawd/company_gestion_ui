import { Create, SimpleForm } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import EmployeePaymentForm from './EmployeePaymentForm.tsx'

export default function EmployeePaymentCreate() {
  return (
    <Create
      redirect="list"
      transform={(data) => {
        const transformed: any = {
          ...data,
          expense: { ...data.expense, job_id: localStorage.getItem('currentJobId') },
        }
        if (data.is_for_team) {
          transformed.user_ids = data.user_ids || []
          delete transformed.employee_id
        } else {
          transformed.user_ids = data.user_ids || []
          delete transformed.employee_id
        }
        return transformed
      }}
    >
      <SimpleForm toolbar={<FormToolbar />}>
        <EmployeePaymentForm isCreate />
      </SimpleForm>
    </Create>
  )
}
