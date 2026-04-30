import { Create, SimpleForm } from 'react-admin'
import PurchaseForm from './PurchaseForm'

export default function PurchaseCreate() {
  return (
    <Create
      transform={(data) => ({
        ...data,
        expense_id: data.expense?.id,
        expense: undefined,
        material: data.material?.id,
      })}
    >
      <SimpleForm>
        <PurchaseForm isCreate />
      </SimpleForm>
    </Create>
  )
}
