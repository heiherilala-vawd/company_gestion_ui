import { SimpleForm, TextInput } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import PurchaseOrderForm from './PurchaseOrderForm'
import GenericEdit from '../../../generic/GenericEdit'

export default function PurchaseOrderEdit() {
  return (
    <GenericEdit>
      <SimpleForm id="purchase-order-edit-form" toolbar={<FormToolbar />}>
        <TextInput source="id" sx={{ display: 'none' }} />
        <PurchaseOrderForm />
      </SimpleForm>
    </GenericEdit>
  )
}
