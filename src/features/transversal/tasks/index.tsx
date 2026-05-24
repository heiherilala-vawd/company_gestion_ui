import TaskAltIcon from '@mui/icons-material/TaskAlt'
import TaskList from './TaskList'
import TaskCreate from './TaskCreate'
import TaskEdit from './TaskEdit'
import TaskShow from './TaskShow'

export default {
  list: TaskList,
  create: TaskCreate,
  edit: TaskEdit,
  show: TaskShow,
  icon: TaskAltIcon,
  recordRepresentation: (record: any) => `${record.title}`,
}
