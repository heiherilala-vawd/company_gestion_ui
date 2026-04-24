import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import PurchaseList from './PurchaseList'
import PurchaseCreate from './PurchaseCreate'
import PurchaseEdit from './PurchaseEdit'
import PurchaseShow from './PurchaseShow'

export default {
  list: PurchaseList,
  create: PurchaseCreate,
  edit: PurchaseEdit,
  show: PurchaseShow,
  icon: ShoppingCartIcon,
  recordRepresentation: (record: any) => `${record.supplier} - Qté: ${record.quantity}`,
}
