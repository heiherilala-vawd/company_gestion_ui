import { useSearchParams } from 'react-router-dom'
import PurchaseActivityForm from '../purchase_operation/PurchaseActivityForm'

export default function PurchaseCreate() {
  const [searchParams] = useSearchParams()
  const isEquipment =
    searchParams.get('isEquipment') === 'true' ||
    sessionStorage.getItem('purchaseMode') === 'equipment'
  const isMaterial =
    searchParams.get('isMaterial') === 'true' ||
    sessionStorage.getItem('purchaseMode') === 'material'

  const mode = isEquipment ? 'equipment' : isMaterial ? 'materials' : 'full'

  return <PurchaseActivityForm mode={mode} />
}
