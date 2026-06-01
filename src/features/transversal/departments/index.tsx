import AccountTreeIcon from '@mui/icons-material/AccountTree'
import DepartmentList from './DepartmentList'
import DepartmentCreate from './DepartmentCreate'
import DepartmentEdit from './DepartmentEdit'
import DepartmentShow from './DepartmentShow'

const departmentResource = {
  list: DepartmentList,
  create: DepartmentCreate,
  edit: DepartmentEdit,
  show: DepartmentShow,
  icon: AccountTreeIcon,
  recordRepresentation: (record: any) => `${record.name}`,
}

export { departmentResource }
export default departmentResource
