import PaymentsIcon from '@mui/icons-material/Payments'
import EmployeePaymentList from './EmployeePaymentList.tsx'
import EmployeePaymentCreate from './EmployeePaymentCreate.tsx'
import EmployeePaymentEdit from './EmployeePaymentEdit.tsx'
import EmployeePaymentShow from './EmployeePaymentShow.tsx'

export default {
  list: EmployeePaymentList,
  create: EmployeePaymentCreate,
  edit: EmployeePaymentEdit,
  show: EmployeePaymentShow,
  icon: PaymentsIcon,
  recordRepresentation: (record: any) => `${record.employee_id} - ${record.payment_description}`,
}
