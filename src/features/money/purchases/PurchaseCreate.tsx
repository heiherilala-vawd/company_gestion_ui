import { Create, SimpleForm } from 'react-admin'
import PurchaseForm from './PurchaseForm'

export default function PurchaseCreate() {
  return (
    <Create
      transform={(data) => ({
        ...data,
        material: data.material?.id,
        expense: { ...data.expense, job_id: localStorage.getItem('currentJobId') },
      })}
    >
      <SimpleForm>
        <PurchaseForm isCreate />
      </SimpleForm>
    </Create>
  )
}
