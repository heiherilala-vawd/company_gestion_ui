import { Edit, SimpleForm, TextInput } from 'react-admin'
import ExpenseForm from './ExpenseForm'

export default function ExpenseEdit() {
  return (
    <Edit
      transform={(data) => ({
        ...data,
        job_id: data.job?.id,
        job: undefined,
      })}
    >
      <SimpleForm>
        <TextInput source="id" disabled />
        <ExpenseForm />
      </SimpleForm>
    </Edit>
  )
}
