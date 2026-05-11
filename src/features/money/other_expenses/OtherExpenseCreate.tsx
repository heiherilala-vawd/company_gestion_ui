import { Create, SimpleForm } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
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
      <SimpleForm toolbar={<FormToolbar />}>
        <OtherExpenseForm isCreate />
      </SimpleForm>
    </Create>
  )
}
