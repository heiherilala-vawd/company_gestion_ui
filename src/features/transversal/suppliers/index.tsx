import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import SupplierList from './SupplierList'
import SupplierCreate from './SupplierCreate'
import SupplierEdit from './SupplierEdit'
import SupplierShow from './SupplierShow'

const supplierResource = {
  list: SupplierList,
  create: SupplierCreate,
  edit: SupplierEdit,
  show: SupplierShow,
  icon: LocalShippingIcon,
  recordRepresentation: (record: any) => `${record.name}`,
}

export { supplierResource }
export default supplierResource
