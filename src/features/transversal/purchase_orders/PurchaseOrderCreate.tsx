import { Create, SimpleForm } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import PurchaseOrderForm from './PurchaseOrderForm'

export default function PurchaseOrderCreate() {
  return (
    <Create
      redirect="list"
      transform={(data) => ({
        ...data,
        company_id: localStorage.getItem('currentCompanyId'),
      })}
    >
      <SimpleForm id="purchase-order-create-form" toolbar={<FormToolbar />}>
        <PurchaseOrderForm isCreate />
      </SimpleForm>
    </Create>
  )
}
