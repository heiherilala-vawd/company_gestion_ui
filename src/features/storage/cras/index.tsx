import DirectionsCarIcon from '@mui/icons-material/DirectionsCar'
import CrasList from './CrasList'
import CrasCreate from './CrasCreate'
import CrasEdit from './CrasEdit'
import CrasShow from './CrasShow'

export default {
  list: CrasList,
  create: CrasCreate,
  edit: CrasEdit,
  show: CrasShow,
  icon: DirectionsCarIcon,
  recordRepresentation: (record: any) => record.immatriculation || '',
}
