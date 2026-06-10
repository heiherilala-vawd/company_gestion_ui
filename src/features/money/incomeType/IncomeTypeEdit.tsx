import { SimpleForm, TextInput } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import IncomeTypeForm from './IncomeTypeForm'
import GenericEdit from '../../../generic/GenericEdit'

export default function IncomeTypeEdit() {
  return (
    <GenericEdit>
      <SimpleForm id="income-type-edit-form" toolbar={<FormToolbar />}>
        <TextInput source="id" sx={{ display: 'none' }} />
        <IncomeTypeForm />
      </SimpleForm>
    </GenericEdit>
  )
}
