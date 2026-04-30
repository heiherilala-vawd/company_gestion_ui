import { Create, SimpleForm } from 'react-admin'
import TravelExpenseForm from './TravelExpenseForm'

export default function TravelExpenseCreate() {
  return (
    <Create>
      <SimpleForm>
        <TravelExpenseForm isCreate />
      </SimpleForm>
    </Create>
  )
}
