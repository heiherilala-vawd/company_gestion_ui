import { Create, SimpleForm } from 'react-admin'
import IncomeForm from './IncomeForm'

export default function IncomeCreate() {
  return (
    <Create>
      <SimpleForm>
        <IncomeForm isCreate />
      </SimpleForm>
    </Create>
  )
}
