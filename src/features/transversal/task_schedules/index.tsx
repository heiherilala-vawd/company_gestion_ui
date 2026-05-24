import ScheduleIcon from '@mui/icons-material/Schedule'
import TaskScheduleList from './TaskScheduleList'
import TaskScheduleCreate from './TaskScheduleCreate'
import TaskScheduleEdit from './TaskScheduleEdit'
import TaskScheduleShow from './TaskScheduleShow'

export default {
  list: TaskScheduleList,
  create: TaskScheduleCreate,
  edit: TaskScheduleEdit,
  show: TaskScheduleShow,
  icon: ScheduleIcon,
  recordRepresentation: (record: any) => `${record.task_id}`,
}
