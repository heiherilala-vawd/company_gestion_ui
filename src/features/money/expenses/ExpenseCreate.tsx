import { Create, SimpleForm } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import ExpenseForm from './ExpenseForm'

export default function ExpenseCreate() {
  return (
    <Create
      redirect="list"
      transform={(data) => ({
        ...data,
        job_id: localStorage.getItem('currentJobId'),
      })}
    >
      <SimpleForm toolbar={<FormToolbar />}>
        <ExpenseForm isCreate />
      </SimpleForm>
    </Create>
  )
}
