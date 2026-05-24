import { Create, SimpleForm } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import BudgetLineForm from './BudgetLineForm'

export default function BudgetLineCreate() {
  return (
    <Create redirect="list">
      <SimpleForm toolbar={<FormToolbar />}>
        <BudgetLineForm isCreate />
      </SimpleForm>
    </Create>
  )
}
