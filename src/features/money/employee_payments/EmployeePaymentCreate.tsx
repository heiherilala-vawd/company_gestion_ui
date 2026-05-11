import { Create, SimpleForm } from 'react-admin'
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
      <SimpleForm>
        <EmployeePaymentForm isCreate />
      </SimpleForm>
    </Create>
  )
}
