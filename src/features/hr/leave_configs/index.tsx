import SettingsIcon from '@mui/icons-material/Settings'
import LeaveConfigList from './LeaveConfigList'
import LeaveConfigCreate from './LeaveConfigCreate'
import LeaveConfigEdit from './LeaveConfigEdit'
import LeaveConfigShow from './LeaveConfigShow'

export default {
  list: LeaveConfigList,
  create: LeaveConfigCreate,
  edit: LeaveConfigEdit,
  show: LeaveConfigShow,
  icon: SettingsIcon,
  recordRepresentation: (record: any) =>
    `${record.contract_type || ''} - ${record.vacation_days_per_month || ''} jours/mois`,
}
