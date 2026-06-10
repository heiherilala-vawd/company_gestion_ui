import { SimpleForm, TextInput } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import BudgetLineForm from './BudgetLineForm'
import GenericEdit from '../../../generic/GenericEdit'

export default function BudgetLineEdit() {
  return (
    <GenericEdit>
      <SimpleForm id="budget-line-edit-form" toolbar={<FormToolbar />}>
        <TextInput source="id" sx={{ display: 'none' }} />
        <BudgetLineForm />
      </SimpleForm>
    </GenericEdit>
  )
}
