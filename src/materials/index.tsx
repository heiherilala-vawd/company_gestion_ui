import CategoryIcon from '@mui/icons-material/Category'
import MaterialList from './MaterialList'
import MaterialCreate from './MaterialCreate'
import MaterialEdit from './MaterialEdit'
import MaterialShow from './MaterialShow'

export default {
  list: MaterialList,
  create: MaterialCreate,
  edit: MaterialEdit,
  show: MaterialShow,
  icon: CategoryIcon,
  recordRepresentation: (record: any) => record.name,
}
