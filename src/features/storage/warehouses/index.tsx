import WarehouseIcon from '@mui/icons-material/Warehouse'
import WarehouseList from './WarehouseList'
import WarehouseCreate from './WarehouseCreate'
import WarehouseEdit from './WarehouseEdit'
import WarehouseShow from './WarehouseShow'

export default {
  list: WarehouseList,
  create: WarehouseCreate,
  edit: WarehouseEdit,
  show: WarehouseShow,
  icon: WarehouseIcon,
  recordRepresentation: (record: any) => record.name,
}
