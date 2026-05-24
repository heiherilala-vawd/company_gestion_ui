import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'
import BudgetLineList from './BudgetLineList'
import BudgetLineCreate from './BudgetLineCreate'
import BudgetLineEdit from './BudgetLineEdit'
import BudgetLineShow from './BudgetLineShow'

export default {
  list: BudgetLineList,
  create: BudgetLineCreate,
  edit: BudgetLineEdit,
  show: BudgetLineShow,
  icon: AccountBalanceWalletIcon,
  recordRepresentation: (record: any) => `${record.category}`,
}
