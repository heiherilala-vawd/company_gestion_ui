import { Edit, SimpleForm, TextInput } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import LoanRepaymentForm from './LoanRepaymentForm'

export default function LoanRepaymentEdit() {
  return (
    <Edit redirect="list">
      <SimpleForm toolbar={<FormToolbar />}>
        <TextInput source="id" sx={{ display: 'none' }} />
        <LoanRepaymentForm />
      </SimpleForm>
    </Edit>
  )
}
