import { Edit, SimpleForm, TextInput } from 'react-admin'
import EmployerPaymentForm from './EmployerPaymentForm'

export default function EmployerPaymentEdit() {
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
        <TextInput source="id" disabled />
        <EmployerPaymentForm />
      </SimpleForm>
    </Edit>
  )
}
