import Inventory2Icon from '@mui/icons-material/Inventory2'
import MaterialWarehouseList from './MaterialWarehouseList'
import MaterialWarehouseCreate from './MaterialWarehouseCreate'
import MaterialWarehouseEdit from './MaterialWarehouseEdit'
import MaterialWarehouseShow from './MaterialWarehouseShow'

export default {
  list: MaterialWarehouseList,
  create: MaterialWarehouseCreate,
  edit: MaterialWarehouseEdit,
  show: MaterialWarehouseShow,
  icon: Inventory2Icon,
  recordRepresentation: (record: any) => `${record.material?.name} - ${record.warehouse?.name}`,
}
