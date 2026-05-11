import PeopleIcon from '@mui/icons-material/People'
import UserEdit from './UserEdit'
import UserList from './UserList'
import UserShow from './UserShow'

export default {
  list: UserList,
  edit: UserEdit,
  show: UserShow,
  icon: PeopleIcon,
  recordRepresentation: (record: any) => `${record.email} (${record.role})`,
}
