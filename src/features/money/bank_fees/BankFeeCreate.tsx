import { Create, SimpleForm } from 'react-admin'
import BankFeeForm from './BankFeeForm.tsx'

export default function BankFeeCreate() {
  return (
    <Create
      redirect="list"
      transform={(data) => ({
        ...data,
        expense: { ...data.expense, job_id: localStorage.getItem('currentJobId') },
      })}
    >
      <SimpleForm>
        <BankFeeForm isCreate />
      </SimpleForm>
    </Create>
  )
}
