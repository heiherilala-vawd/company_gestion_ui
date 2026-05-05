import { Create, SimpleForm } from 'react-admin'
import ExpenseForm from './ExpenseForm'

export default function ExpenseCreate() {
  return (
    <Create
      transform={(data) => ({
        ...data,
        job_id: data.job?.id,
        job: undefined,
      })}
    >
      <SimpleForm>
        <ExpenseForm isCreate />
      </SimpleForm>
    </Create>
  )
}
