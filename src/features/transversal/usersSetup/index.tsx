import PeopleIcon from '@mui/icons-material/People'
import UserEdit from './UserEdit'
import UserList from './UserList'
import UserShow from './UserShow'
import UserCreateBulk from './UserCreateBulk'

export default {
  list: UserList,
  edit: UserEdit,
  show: UserShow,
  create: UserCreateBulk,
  icon: PeopleIcon,
  recordRepresentation: (record: any) => `${record.email} (${record.role})`,
}
