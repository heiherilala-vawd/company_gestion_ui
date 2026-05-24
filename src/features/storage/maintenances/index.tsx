import BuildIcon from '@mui/icons-material/Build'
import MaintenanceList from './MaintenanceList'
import MaintenanceCreate from './MaintenanceCreate'
import MaintenanceEdit from './MaintenanceEdit'
import MaintenanceShow from './MaintenanceShow'

export default {
  list: MaintenanceList,
  create: MaintenanceCreate,
  edit: MaintenanceEdit,
  show: MaintenanceShow,
  icon: BuildIcon,
  recordRepresentation: (record: any) => `${record.description}`,
}
