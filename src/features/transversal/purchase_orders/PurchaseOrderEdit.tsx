import { Edit, SimpleForm, TextInput } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import PurchaseOrderForm from './PurchaseOrderForm'

export default function PurchaseOrderEdit() {
  return (
    <Edit redirect="list">
      <SimpleForm id="purchase-order-edit-form" toolbar={<FormToolbar />}>
        <TextInput source="id" sx={{ display: 'none' }} />
        <PurchaseOrderForm />
      </SimpleForm>
    </Edit>
  )
}
