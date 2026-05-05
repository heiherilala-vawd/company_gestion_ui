import { Create, SimpleForm } from 'react-admin'
import OtherExpenseForm from './OtherExpenseForm'

export default function OtherExpenseCreate() {
  return (
    <Create
      transform={(data) => ({
        ...data,
        expense_id: data.expense?.id,
        expense: undefined,
      })}
    >
      <SimpleForm>
        <OtherExpenseForm isCreate />
      </SimpleForm>
    </Create>
  )
}
