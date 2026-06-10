import LocalOfferIcon from '@mui/icons-material/LocalOffer'
import LeaveTypeList from './LeaveTypeList'
import LeaveTypeCreate from './LeaveTypeCreate'
import LeaveTypeEdit from './LeaveTypeEdit'
import LeaveTypeShow from './LeaveTypeShow'

export default {
  list: LeaveTypeList,
  create: LeaveTypeCreate,
  edit: LeaveTypeEdit,
  show: LeaveTypeShow,
  icon: LocalOfferIcon,
  recordRepresentation: (record: any) => record.name || record.id,
}
