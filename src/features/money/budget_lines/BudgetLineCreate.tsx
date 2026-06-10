import { SimpleForm } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import BudgetLineForm from './BudgetLineForm'
import GenericCreate from '../../../generic/GenericCreate'

export default function BudgetLineCreate() {
  return (
    <GenericCreate>
      <SimpleForm id="budget-line-create-form" toolbar={<FormToolbar />}>
        <BudgetLineForm isCreate />
      </SimpleForm>
    </GenericCreate>
  )
}
