import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff'
import TravelExpenseList from './TravelExpenseList'
import TravelExpenseCreate from './TravelExpenseCreate'
import TravelExpenseEdit from './TravelExpenseEdit'
import TravelExpenseShow from './TravelExpenseShow'

export default {
  list: TravelExpenseList,
  create: TravelExpenseCreate,
  edit: TravelExpenseEdit,
  show: TravelExpenseShow,
  icon: FlightTakeoffIcon,
  recordRepresentation: (record: any) =>
    `${record.departure_location} → ${record.arrival_location}`,
}
