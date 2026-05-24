import DeleteSweepIcon from '@mui/icons-material/DeleteSweep'
import MaterialConsumptionList from './MaterialConsumptionList'
import MaterialConsumptionCreate from './MaterialConsumptionCreate'
import MaterialConsumptionEdit from './MaterialConsumptionEdit'
import MaterialConsumptionShow from './MaterialConsumptionShow'

export default {
  list: MaterialConsumptionList,
  create: MaterialConsumptionCreate,
  edit: MaterialConsumptionEdit,
  show: MaterialConsumptionShow,
  icon: DeleteSweepIcon,
  recordRepresentation: (record: any) => `${record.material_id}`,
}
