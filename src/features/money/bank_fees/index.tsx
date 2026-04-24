import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import BankFeeList from './BankFeeList'
import BankFeeCreate from './BankFeeCreate'
import BankFeeEdit from './BankFeeEdit'
import BankFeeShow from './BankFeeShow'

export default {
  list: BankFeeList,
  create: BankFeeCreate,
  edit: BankFeeEdit,
  show: BankFeeShow,
  icon: AccountBalanceIcon,
  recordRepresentation: (record: any) => `${record.bank_name} - ${record.description}`,
}
