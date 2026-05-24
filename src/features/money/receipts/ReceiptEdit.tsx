import { Edit, SimpleForm, TextInput } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import ReceiptForm from './ReceiptForm'

export default function ReceiptEdit() {
  return (
    <Edit redirect="list">
      <SimpleForm toolbar={<FormToolbar />}>
        <TextInput source="id" sx={{ display: 'none' }} />
        <ReceiptForm />
      </SimpleForm>
    </Edit>
  )
}
