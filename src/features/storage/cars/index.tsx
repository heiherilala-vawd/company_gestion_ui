import DirectionsCarIcon from '@mui/icons-material/DirectionsCar'
import CarsList from './CarsList'
import CarsCreate from './CarsCreate'
import CarsEdit from './CarsEdit'
import CarsShow from './CarsShow'

export default {
  list: CarsList,
  create: CarsCreate,
  edit: CarsEdit,
  show: CarsShow,
  icon: DirectionsCarIcon,
  recordRepresentation: (record: any) => record.immatriculation || '',
}
