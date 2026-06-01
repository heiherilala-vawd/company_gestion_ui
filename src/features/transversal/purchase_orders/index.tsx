import DescriptionIcon from '@mui/icons-material/Description'
import PurchaseOrderList from './PurchaseOrderList'
import PurchaseOrderCreate from './PurchaseOrderCreate'
import PurchaseOrderEdit from './PurchaseOrderEdit'
import PurchaseOrderShow from './PurchaseOrderShow'

const purchaseOrderResource = {
  list: PurchaseOrderList,
  create: PurchaseOrderCreate,
  edit: PurchaseOrderEdit,
  show: PurchaseOrderShow,
  icon: DescriptionIcon,
  recordRepresentation: (record: any) =>
    `BC ${record.order_date || ''} - ${record.supplier?.name || ''}`,
}

export { purchaseOrderResource }
export default purchaseOrderResource
