import BusinessIcon from '@mui/icons-material/Business'
import OrganizationList from './OrganizationList'
import OrganizationCreate from './OrganizationCreate'
import OrganizationEdit from './OrganizationEdit'
import OrganizationShow from './OrganizationShow'

const organizationResource = {
  list: OrganizationList,
  create: OrganizationCreate,
  edit: OrganizationEdit,
  show: OrganizationShow,
  icon: BusinessIcon,
  recordRepresentation: (record: any) => `${record.name}`,
}

export { organizationResource }
export default organizationResource
