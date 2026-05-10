import { Create, SimpleForm } from 'react-admin'
import EmployeePaymentForm from './EmployeePaymentForm.tsx'

export default function EmployeePaymentCreate() {
  return (
    <Create
      transform={(data) => ({
        ...data,
        employee_id: data.employee?.id,
        employee: undefined,
        expense: { ...data.expense, job_id: localStorage.getItem('currentJobId') },
      })}
    >
      <SimpleForm>
        <EmployeePaymentForm isCreate />
      </SimpleForm>
    </Create>
  )
}
