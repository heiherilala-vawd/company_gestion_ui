import HistoryIcon from '@mui/icons-material/History'
import HistoryList from './HistoryList'
import HistoryShow from './HistoryShow'

const historyResource = {
  list: HistoryList,
  show: HistoryShow,
  icon: HistoryIcon,
  recordRepresentation: (record: any) => `${record.entity_type} #${record.entity_id}`,
}

export { historyResource }
export default historyResource
