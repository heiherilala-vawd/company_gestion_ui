import { Create, SimpleForm } from 'react-admin'
import ExpenseForm from './ExpenseForm'

export default function ExpenseCreate() {
  return (
    <Create>
      <SimpleForm>
        <ExpenseForm isCreate />
      </SimpleForm>
    </Create>
  )
}
