import InventoryIcon from '@mui/icons-material/Inventory'
import TravelMaterialList from './TravelMaterialList'
import TravelMaterialEdit from './TravelMaterialEdit'
import TravelMaterialShow from './TravelMaterialShow'

export default {
  list: TravelMaterialList,
  edit: TravelMaterialEdit,
  show: TravelMaterialShow,
  icon: InventoryIcon,
  recordRepresentation: (record: any) => `${record.material} - Qté: ${record.quantity}`,
}
