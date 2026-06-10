import { SimpleForm } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import ExpenseForm from './ExpenseForm'
import GenericCreate from '../../../generic/GenericCreate'

export default function ExpenseCreate() {
  return (
    <GenericCreate
      transform={(data) => ({
        ...data,
        job_id: localStorage.getItem('currentJobId'),
      })}
    >
      <SimpleForm id="expense-create-form" toolbar={<FormToolbar />}>
        <ExpenseForm isCreate />
      </SimpleForm>
    </GenericCreate>
  )
}
