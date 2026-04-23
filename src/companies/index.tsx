// companies/index.tsx
import BusinessIcon from '@mui/icons-material/Business'
import CompanyList from './CompanyList'
import CompanyCreate from './CompanyCreate'
import CompanyEdit from './CompanyEdit'
import CompanyShow from './CompanyShow'

export default {
  list: CompanyList,
  create: CompanyCreate,
  edit: CompanyEdit,
  show: CompanyShow,
  icon: BusinessIcon,
  recordRepresentation: (record: any) => `${record.name} (${record.company_type})`,
}
