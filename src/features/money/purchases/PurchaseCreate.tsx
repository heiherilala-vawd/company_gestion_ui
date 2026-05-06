import { Create, SimpleForm } from 'react-admin'
import PurchaseForm from './PurchaseForm'

export default function PurchaseCreate() {
  return (
    <Create
      transform={(data) => ({
        ...data,
        material: data.material?.id,
      })}
    >
      <SimpleForm>
        <PurchaseForm isCreate />
      </SimpleForm>
    </Create>
  )
}
