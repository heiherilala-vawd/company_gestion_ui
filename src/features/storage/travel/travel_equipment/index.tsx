import ConstructionIcon from '@mui/icons-material/Construction'
import TravelEquipmentList from './TravelEquipmentList'
import TravelEquipmentEdit from './TravelEquipmentEdit'
import TravelEquipmentShow from './TravelEquipmentShow'

export default {
  list: TravelEquipmentList,
  edit: TravelEquipmentEdit,
  show: TravelEquipmentShow,
  icon: ConstructionIcon,
  recordRepresentation: (record: any) => `${record.equipment} - Qté: ${record.quantity}`,
}
