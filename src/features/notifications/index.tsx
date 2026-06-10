import NotificationsIcon from '@mui/icons-material/Notifications'
import NotificationsList from './NotificationsList'

export { default as NotificationBell } from './NotificationBell'
export { default as NotificationsList } from './NotificationsList'

export default {
  list: NotificationsList,
  icon: NotificationsIcon,
  recordRepresentation: (record: any) => record.title,
}
