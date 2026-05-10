import { Create, SimpleForm } from 'react-admin'
import ExpenseForm from './ExpenseForm'

export default function ExpenseCreate() {
  return (
    <Create
      transform={(data) => ({
        ...data,
        job_id: localStorage.getItem('currentJobId'),
      })}
    >
      <SimpleForm>
        <ExpenseForm isCreate />
      </SimpleForm>
    </Create>
  )
}
