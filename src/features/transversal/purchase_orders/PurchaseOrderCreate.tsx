import { SimpleForm } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import PurchaseOrderForm from './PurchaseOrderForm'
import GenericCreate from '../../../generic/GenericCreate'

export default function PurchaseOrderCreate() {
  return (
    <GenericCreate
      transform={(data) => ({
        ...data,
        company_id: localStorage.getItem('currentCompanyId'),
      })}
    >
      <SimpleForm
        id="purchase-order-create-form"
        toolbar={<FormToolbar />}
        defaultValues={{ order_date: new Date() }}
      >
        <PurchaseOrderForm isCreate />
      </SimpleForm>
    </GenericCreate>
  )
}
