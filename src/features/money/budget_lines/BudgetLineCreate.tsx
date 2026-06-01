import { Create, SimpleForm } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import BudgetLineForm from './BudgetLineForm'

export default function BudgetLineCreate() {
  return (
    <Create redirect="list">
      <SimpleForm id="budget-line-create-form" toolbar={<FormToolbar />}>
        <BudgetLineForm isCreate />
      </SimpleForm>
    </Create>
  )
}
