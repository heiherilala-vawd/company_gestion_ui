import { SimpleForm } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import OtherExpenseForm from './OtherExpenseForm'
import GenericCreate from '../../../generic/GenericCreate'

export default function OtherExpenseCreate() {
  return (
    <GenericCreate
      transform={(data) => {
        const expense = { ...data.expense, job_id: localStorage.getItem('currentJobId') }
        if (!expense.description && expense._generated_desc) {
          expense.description = expense._generated_desc
        }
        delete expense._generated_desc
        return { ...data, expense }
      }}
    >
      <SimpleForm id="other-expense-create-form" toolbar={<FormToolbar />}>
        <OtherExpenseForm isCreate />
      </SimpleForm>
    </GenericCreate>
  )
}
