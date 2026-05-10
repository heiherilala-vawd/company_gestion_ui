import { Create, SimpleForm } from 'react-admin'
import BankFeeForm from './BankFeeForm.tsx'

export default function BankFeeCreate() {
  return (
    <Create
      transform={(data) => ({
        ...data,
        expense_id: data.expense_id,
        expense: { ...data.expense, job_id: localStorage.getItem('currentJobId') },
      })}
    >
      <SimpleForm>
        <BankFeeForm isCreate />
      </SimpleForm>
    </Create>
  )
}
