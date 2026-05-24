import ReceiptIcon from '@mui/icons-material/Receipt'
import ReceiptList from './ReceiptList'
import ReceiptCreate from './ReceiptCreate'
import ReceiptEdit from './ReceiptEdit'
import ReceiptShow from './ReceiptShow'

export default {
  list: ReceiptList,
  create: ReceiptCreate,
  edit: ReceiptEdit,
  show: ReceiptShow,
  icon: ReceiptIcon,
  recordRepresentation: (record: any) => `${record.payment_date} - ${record.amount}`,
}
