import { Edit, SimpleForm, TextInput } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import LoanForm from './LoanForm'

export default function LoanEdit() {
  return (
    <Edit redirect="list">
      <SimpleForm id="loan-edit-form" toolbar={<FormToolbar />}>
        <TextInput source="id" sx={{ display: 'none' }} />
        <LoanForm />
      </SimpleForm>
    </Edit>
  )
}
