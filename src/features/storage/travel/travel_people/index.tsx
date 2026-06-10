import PeopleIcon from '@mui/icons-material/People'
import TravelPeopleList from './TravelPeopleList'
import TravelPeopleEdit from './TravelPeopleEdit'
import TravelPeopleShow from './TravelPeopleShow'

export default {
  list: TravelPeopleList,
  edit: TravelPeopleEdit,
  show: TravelPeopleShow,
  icon: PeopleIcon,
  recordRepresentation: (record: any) => `${record.user?.first_name} ${record.user?.last_name}`,
}
