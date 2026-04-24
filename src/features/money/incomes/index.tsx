import PaidIcon from '@mui/icons-material/Paid'
import IncomeList from './IncomeList'
import IncomeCreate from './IncomeCreate'
import IncomeEdit from './IncomeEdit'
import IncomeShow from './IncomeShow'

export default {
  list: IncomeList,
  create: IncomeCreate,
  edit: IncomeEdit,
  show: IncomeShow,
  icon: PaidIcon,
  recordRepresentation: (record: any) => `${record.source_organization} - ${record.amount}€`,
}
