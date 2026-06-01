import GroupIcon from '@mui/icons-material/Group'
import TeamList from './TeamList'
import TeamCreate from './TeamCreate'
import TeamEdit from './TeamEdit'
import TeamShow from './TeamShow'

const teamResource = {
  list: TeamList,
  create: TeamCreate,
  edit: TeamEdit,
  show: TeamShow,
  icon: GroupIcon,
  recordRepresentation: (record: any) => `${record.name}`,
}

export { teamResource }
export default teamResource
