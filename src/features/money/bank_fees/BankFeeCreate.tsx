import { Create, SimpleForm } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
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
      <SimpleForm toolbar={<FormToolbar />}>
        <BankFeeForm isCreate />
      </SimpleForm>
    </Create>
  )
}
