import { Edit, SimpleForm, TextInput } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import SupplierForm from './SupplierForm'

export default function SupplierEdit() {
  return (
    <Edit redirect="list">
      <SimpleForm id="supplier-edit-form" toolbar={<FormToolbar />}>
        <TextInput source="id" sx={{ display: 'none' }} />
        <SupplierForm />
      </SimpleForm>
    </Edit>
  )
}
