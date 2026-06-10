import BuildCircleIcon from '@mui/icons-material/BuildCircle'
import MaintenanceScheduleList from './MaintenanceScheduleList'
import MaintenanceScheduleCreate from './MaintenanceScheduleCreate'
import MaintenanceScheduleEdit from './MaintenanceScheduleEdit'
import MaintenanceScheduleShow from './MaintenanceScheduleShow'

export default {
  list: MaintenanceScheduleList,
  create: MaintenanceScheduleCreate,
  edit: MaintenanceScheduleEdit,
  show: MaintenanceScheduleShow,
  icon: BuildCircleIcon,
  recordRepresentation: (record: any) => `${record.id}`,
}
