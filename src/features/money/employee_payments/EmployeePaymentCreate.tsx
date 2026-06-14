import { SimpleForm } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import EmployeePaymentForm from './EmployeePaymentForm.tsx'
import GenericCreate from '../../../generic/GenericCreate'

export default function EmployeePaymentCreate() {
  return (
    <GenericCreate
      transform={(data) => {
        const expense = { ...data.expense, job_id: localStorage.getItem('currentJobId') }
        if (!expense.description && expense._generated_desc) {
          expense.description = expense._generated_desc
        }
        delete expense._generated_desc
        const transformed: any = {
          ...data,
          expense,
        }
        if (!transformed.payment_description && expense.description) {
          transformed.payment_description = expense.description
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
      <SimpleForm id="employee-payment-create-form" toolbar={<FormToolbar />}>
        <EmployeePaymentForm isCreate />
      </SimpleForm>
    </GenericCreate>
  )
}
