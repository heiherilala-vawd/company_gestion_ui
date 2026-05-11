import { Create, SimpleForm } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import PurchaseForm from './PurchaseForm'

export default function PurchaseCreate() {
  return (
    <Create
      redirect="list"
      transform={(data) => ({
        ...data,
        quantity: data.quantity ? data.quantity : 1,
        supplier: { id: data.supplier_id },
        expense: { ...data.expense, job_id: localStorage.getItem('currentJobId') },
      })}
    >
      <SimpleForm toolbar={<FormToolbar />}>
        <PurchaseForm isCreate />
      </SimpleForm>
    </Create>
  )
}
