import PaymentsIcon from '@mui/icons-material/Payments'
import LoanRepaymentList from './LoanRepaymentList'
import LoanRepaymentCreate from './LoanRepaymentCreate'
import LoanRepaymentEdit from './LoanRepaymentEdit'
import LoanRepaymentShow from './LoanRepaymentShow'

export default {
  list: LoanRepaymentList,
  create: LoanRepaymentCreate,
  edit: LoanRepaymentEdit,
  show: LoanRepaymentShow,
  icon: PaymentsIcon,
  recordRepresentation: (record: any) => `${record.payment_date} - ${record.amount}`,
}
