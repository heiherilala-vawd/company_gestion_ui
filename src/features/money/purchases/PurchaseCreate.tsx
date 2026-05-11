import { Create, SimpleForm } from 'react-admin'
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
      <SimpleForm>
        <PurchaseForm isCreate />
      </SimpleForm>
    </Create>
  )
}
