import { Create, SimpleForm } from 'react-admin'
import TravelExpenseForm from './TravelExpenseForm'

export default function TravelExpenseCreate() {
  return (
    <Create
      transform={(data) => ({
        ...data,
      })}
    >
      <SimpleForm>
        <TravelExpenseForm isCreate />
      </SimpleForm>
    </Create>
  )
}
