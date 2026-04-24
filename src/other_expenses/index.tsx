import MoneyOffIcon from '@mui/icons-material/MoneyOff'
import OtherExpenseList from './OtherExpenseList'
import OtherExpenseCreate from './OtherExpenseCreate'
import OtherExpenseEdit from './OtherExpenseEdit'
import OtherExpenseShow from './OtherExpenseShow'

export default {
  list: OtherExpenseList,
  create: OtherExpenseCreate,
  edit: OtherExpenseEdit,
  show: OtherExpenseShow,
  icon: MoneyOffIcon,
  recordRepresentation: (record: any) => record.description,
}
