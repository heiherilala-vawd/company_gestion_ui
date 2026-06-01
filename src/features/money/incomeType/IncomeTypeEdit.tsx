import { Edit, SimpleForm, TextInput } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import IncomeTypeForm from './IncomeTypeForm'

export default function IncomeTypeEdit() {
  return (
    <Edit redirect="list">
      <SimpleForm id="income-type-edit-form" toolbar={<FormToolbar />}>
        <TextInput source="id" sx={{ display: 'none' }} />
        <IncomeTypeForm />
      </SimpleForm>
    </Edit>
  )
}
