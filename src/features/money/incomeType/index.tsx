import CategoryIcon from '@mui/icons-material/Category'
import IncomeTypeList from './IncomeTypeList'
import IncomeTypeCreate from './IncomeTypeCreate'
import IncomeTypeEdit from './IncomeTypeEdit'
import IncomeTypeShow from './IncomeTypeShow'

const incomeTypeResource = {
  list: IncomeTypeList,
  create: IncomeTypeCreate,
  edit: IncomeTypeEdit,
  show: IncomeTypeShow,
  icon: CategoryIcon,
  recordRepresentation: (record: any) => `${record.name}`,
}

export { incomeTypeResource }
export default incomeTypeResource
