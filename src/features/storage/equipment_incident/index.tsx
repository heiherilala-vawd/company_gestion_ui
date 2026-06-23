import ReportProblemIcon from '@mui/icons-material/ReportProblem'
import EquipmentIncidentList from './EquipmentIncidentList'
import EquipmentIncidentCreate from './EquipmentIncidentCreate'
import EquipmentIncidentEdit from './EquipmentIncidentEdit'
import EquipmentIncidentShow from './EquipmentIncidentShow'

export default {
  list: EquipmentIncidentList,
  create: EquipmentIncidentCreate,
  edit: EquipmentIncidentEdit,
  show: EquipmentIncidentShow,
  icon: ReportProblemIcon,
  recordRepresentation: (record: any) => `${record.incident_type} - ${record.equipment_id}`,
}
