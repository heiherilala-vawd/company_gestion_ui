import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff'
import TravelExpenseList from './TravelExpenseList.tsx'
import TravelExpenseCreate from './TravelExpenseCreate.tsx'
import TravelExpenseEdit from './TravelExpenseEdit.tsx'
import TravelExpenseShow from './TravelExpenseShow.tsx'

export default {
  list: TravelExpenseList,
  create: TravelExpenseCreate,
  edit: TravelExpenseEdit,
  show: TravelExpenseShow,
  icon: FlightTakeoffIcon,
  recordRepresentation: (record: any) =>
    `${record.departure_location} → ${record.arrival_location}`,
}
