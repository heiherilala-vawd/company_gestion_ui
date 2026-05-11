import { Create, SimpleForm } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import EmployeePaymentForm from './EmployeePaymentForm.tsx'

export default function EmployeePaymentCreate() {
  return (
    <Create
      redirect="list"
      transform={(data) => ({
        ...data,
        expense: { ...data.expense, job_id: localStorage.getItem('currentJobId') },
      })}
    >
      <SimpleForm toolbar={<FormToolbar />}>
        <EmployeePaymentForm isCreate />
      </SimpleForm>
    </Create>
  )
}
