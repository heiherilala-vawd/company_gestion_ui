import DirectionsCarIcon from '@mui/icons-material/DirectionsCar'
import VoitureList from './VoitureList'
import VoitureCreate from './VoitureCreate'
import VoitureEdit from './VoitureEdit'
import VoitureShow from './VoitureShow'

export default {
  list: VoitureList,
  create: VoitureCreate,
  edit: VoitureEdit,
  show: VoitureShow,
  icon: DirectionsCarIcon,
  recordRepresentation: (record: any) => record.immatriculation || '',
}
