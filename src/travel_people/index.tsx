import PeopleIcon from '@mui/icons-material/People'
import TravelPeopleList from './TravelPeopleList'
import TravelPeopleCreate from './TravelPeopleCreate'
import TravelPeopleEdit from './TravelPeopleEdit'
import TravelPeopleShow from './TravelPeopleShow'

export default {
  list: TravelPeopleList,
  create: TravelPeopleCreate,
  edit: TravelPeopleEdit,
  show: TravelPeopleShow,
  icon: PeopleIcon,
  recordRepresentation: (record: any) => record.person_name,
}
