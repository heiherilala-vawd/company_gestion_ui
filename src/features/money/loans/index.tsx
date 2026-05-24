import CreditCardIcon from '@mui/icons-material/CreditCard'
import LoanList from './LoanList'
import LoanCreate from './LoanCreate'
import LoanEdit from './LoanEdit'
import LoanShow from './LoanShow'

export default {
  list: LoanList,
  create: LoanCreate,
  edit: LoanEdit,
  show: LoanShow,
  icon: CreditCardIcon,
  recordRepresentation: (record: any) => `${record.lender} - ${record.amount}`,
}
