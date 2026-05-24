import ReceiptLongIcon from '@mui/icons-material/ReceiptLong'
import FixedCostList from './FixedCostList'
import FixedCostCreate from './FixedCostCreate'
import FixedCostEdit from './FixedCostEdit'
import FixedCostShow from './FixedCostShow'

export default {
  list: FixedCostList,
  create: FixedCostCreate,
  edit: FixedCostEdit,
  show: FixedCostShow,
  icon: ReceiptLongIcon,
  recordRepresentation: (record: any) => `${record.name}`,
}
