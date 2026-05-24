import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import CashAccountList from './CashAccountList'
import CashAccountCreate from './CashAccountCreate'
import CashAccountEdit from './CashAccountEdit'
import CashAccountShow from './CashAccountShow'

export default {
  list: CashAccountList,
  create: CashAccountCreate,
  edit: CashAccountEdit,
  show: CashAccountShow,
  icon: AccountBalanceIcon,
  recordRepresentation: (record: any) => `${record.name}`,
}
