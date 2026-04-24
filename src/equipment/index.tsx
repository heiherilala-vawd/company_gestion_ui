import BuildIcon from '@mui/icons-material/Build'
import EquipmentList from './EquipmentList'
import EquipmentCreate from './EquipmentCreate'
import EquipmentEdit from './EquipmentEdit'
import EquipmentShow from './EquipmentShow'

export default {
  list: EquipmentList,
  create: EquipmentCreate,
  edit: EquipmentEdit,
  show: EquipmentShow,
  icon: BuildIcon,
  recordRepresentation: (record: any) => record.name,
}
