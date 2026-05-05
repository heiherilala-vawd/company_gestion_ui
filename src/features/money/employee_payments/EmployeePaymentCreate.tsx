import { Create, SimpleForm } from 'react-admin'
import EmployeePaymentForm from './EmployeePaymentForm.tsx'

export default function EmployeePaymentCreate() {
  return (
    <Create
      transform={(data) => ({
        ...data,
        expense_id: data.expense?.id,
        expense: undefined,
        employee_id: data.employee?.id,
        employee: undefined,
      })}
    >
      <SimpleForm>
        <EmployeePaymentForm isCreate />
      </SimpleForm>
    </Create>
  )
}
