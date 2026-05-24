import SwapHorizIcon from '@mui/icons-material/SwapHoriz'
import CashTransactionList from './CashTransactionList'
import CashTransactionCreate from './CashTransactionCreate'
import CashTransactionEdit from './CashTransactionEdit'
import CashTransactionShow from './CashTransactionShow'

export default {
  list: CashTransactionList,
  create: CashTransactionCreate,
  edit: CashTransactionEdit,
  show: CashTransactionShow,
  icon: SwapHorizIcon,
  recordRepresentation: (record: any) => `${record.description}`,
}
