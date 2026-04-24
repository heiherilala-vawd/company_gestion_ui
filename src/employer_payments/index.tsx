import PaymentsIcon from '@mui/icons-material/Payments'
import EmployerPaymentList from './EmployerPaymentList'
import EmployerPaymentCreate from './EmployerPaymentCreate'
import EmployerPaymentEdit from './EmployerPaymentEdit'
import EmployerPaymentShow from './EmployerPaymentShow'

export default {
  list: EmployerPaymentList,
  create: EmployerPaymentCreate,
  edit: EmployerPaymentEdit,
  show: EmployerPaymentShow,
  icon: PaymentsIcon,
  recordRepresentation: (record: any) => `${record.employee_id} - ${record.payment_description}`,
}
