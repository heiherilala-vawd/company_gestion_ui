import { Edit, SimpleForm, TextInput } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import BudgetLineForm from './BudgetLineForm'

export default function BudgetLineEdit() {
  return (
    <Edit redirect="list">
      <SimpleForm id="budget-line-edit-form" toolbar={<FormToolbar />}>
        <TextInput source="id" sx={{ display: 'none' }} />
        <BudgetLineForm />
      </SimpleForm>
    </Edit>
  )
}
