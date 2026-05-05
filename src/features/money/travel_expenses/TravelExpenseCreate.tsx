import { Create, SimpleForm } from 'react-admin'
import TravelExpenseForm from './TravelExpenseForm'

export default function TravelExpenseCreate() {
  return (
    <Create
      transform={(data) => ({
        ...data,
        expense_id: data.expense?.id,
        expense: undefined,
      })}
    >
      <SimpleForm>
        <TravelExpenseForm isCreate />
      </SimpleForm>
    </Create>
  )
}
