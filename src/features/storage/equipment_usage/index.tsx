import TimelineIcon from '@mui/icons-material/Timeline'
import EquipmentUsageList from './EquipmentUsageList'
import EquipmentUsageCreate from './EquipmentUsageCreate'
import EquipmentUsageEdit from './EquipmentUsageEdit'
import EquipmentUsageShow from './EquipmentUsageShow'

export default {
  list: EquipmentUsageList,
  create: EquipmentUsageCreate,
  edit: EquipmentUsageEdit,
  show: EquipmentUsageShow,
  icon: TimelineIcon,
  recordRepresentation: (record: any) => `${record.equipment_id}`,
}
