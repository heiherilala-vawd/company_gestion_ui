import { SimpleForm } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import BankFeeForm from './BankFeeForm.tsx'
import GenericCreate from '../../../generic/GenericCreate'

export default function BankFeeCreate() {
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
      <SimpleForm id="bank-fee-create-form" toolbar={<FormToolbar />}>
        <BankFeeForm isCreate />
      </SimpleForm>
    </GenericCreate>
  )
}
