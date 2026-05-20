import BeachAccessIcon from '@mui/icons-material/BeachAccess'
import LeaveList from './LeaveList'
import LeaveCreate from './LeaveCreate'
import LeaveEdit from './LeaveEdit'
import LeaveShow from './LeaveShow'

export default {
  list: LeaveList,
  create: LeaveCreate,
  edit: LeaveEdit,
  show: LeaveShow,
  icon: BeachAccessIcon,
  recordRepresentation: (record: any) =>
    `${record.user?.first_name || ''} ${record.user?.last_name || ''} - ${record.leave_type?.name || ''}`,
}
