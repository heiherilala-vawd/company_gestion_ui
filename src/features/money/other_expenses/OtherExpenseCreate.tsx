import { Create, SimpleForm } from 'react-admin'
import OtherExpenseForm from './OtherExpenseForm'

export default function OtherExpenseCreate() {
  return (
    <Create
      transform={(data) => ({
        ...data,
      })}
    >
      <SimpleForm>
        <OtherExpenseForm isCreate />
      </SimpleForm>
    </Create>
  )
}
