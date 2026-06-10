import { SimpleForm, TextInput } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import SupplierForm from './SupplierForm'
import GenericEdit from '../../../generic/GenericEdit'

export default function SupplierEdit() {
  return (
    <GenericEdit>
      <SimpleForm id="supplier-edit-form" toolbar={<FormToolbar />}>
        <TextInput source="id" sx={{ display: 'none' }} />
        <SupplierForm />
      </SimpleForm>
    </GenericEdit>
  )
}
