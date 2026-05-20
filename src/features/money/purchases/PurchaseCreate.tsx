import { Create, SimpleForm } from 'react-admin'
import { useSearchParams } from 'react-router-dom'
import FormToolbar from '../../../generic/FormToolbar'
import PurchaseForm from './PurchaseForm'

export default function PurchaseCreate() {
  const [searchParams] = useSearchParams()
  const isEquipment =
    searchParams.get('isEquipment') === 'true' ||
    sessionStorage.getItem('purchaseMode') === 'equipment'
  const isMaterial =
    searchParams.get('isMaterial') === 'true' ||
    sessionStorage.getItem('purchaseMode') === 'material'

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
        <PurchaseForm isCreate isEquipment={isEquipment} isMaterial={isMaterial} />
      </SimpleForm>
    </Create>
  )
}
