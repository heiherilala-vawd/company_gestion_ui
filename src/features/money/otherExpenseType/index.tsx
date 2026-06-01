import MoneyOffIcon from '@mui/icons-material/MoneyOff'
import OtherExpenseTypeList from './OtherExpenseTypeList'
import OtherExpenseTypeCreate from './OtherExpenseTypeCreate'
import OtherExpenseTypeEdit from './OtherExpenseTypeEdit'
import OtherExpenseTypeShow from './OtherExpenseTypeShow'

const otherExpenseTypeResource = {
  list: OtherExpenseTypeList,
  create: OtherExpenseTypeCreate,
  edit: OtherExpenseTypeEdit,
  show: OtherExpenseTypeShow,
  icon: MoneyOffIcon,
  recordRepresentation: (record: any) => `${record.name}`,
}

export { otherExpenseTypeResource }
export default otherExpenseTypeResource
