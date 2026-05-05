import { Edit, SimpleForm, TextInput } from 'react-admin'
import EmployeePaymentForm from './EmployeePaymentForm.tsx'

export default function EmployeePaymentEdit() {
  return (
    <Edit
      transform={(data) => ({
        ...data,
        expense_id: data.expense?.id,
        expense: undefined,
        employee_id: data.employee?.id,
        employee: undefined,
      })}
    >
      <SimpleForm>
        <TextInput source="id" readOnly />
        <EmployeePaymentForm />
      </SimpleForm>
    </Edit>
  )
}
