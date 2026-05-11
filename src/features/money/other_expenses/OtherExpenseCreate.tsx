import { Create, SimpleForm } from 'react-admin'
import OtherExpenseForm from './OtherExpenseForm'

export default function OtherExpenseCreate() {
  return (
    <Create
      redirect="list"
      transform={(data) => ({
        ...data,
        expense: { ...data.expense, job_id: localStorage.getItem('currentJobId') },
      })}
    >
      <SimpleForm>
        <OtherExpenseForm isCreate />
      </SimpleForm>
    </Create>
  )
}
