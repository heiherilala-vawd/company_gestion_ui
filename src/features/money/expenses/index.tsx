import MoneyOffIcon from '@mui/icons-material/MoneyOff'
import ExpenseList from './ExpenseList'
import ExpenseCreate from './ExpenseCreate'
import ExpenseEdit from './ExpenseEdit'
import ExpenseShow from './ExpenseShow'

export default {
  list: ExpenseList,
  create: ExpenseCreate,
  edit: ExpenseEdit,
  show: ExpenseShow,
  icon: MoneyOffIcon,
  recordRepresentation: (record: any) => `${record.description} - ${record.amount}€`,
}
