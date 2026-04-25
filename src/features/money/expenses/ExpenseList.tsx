import {
  List,
  Datagrid,
  TextField,
  NumberField,
  DateField,
  SearchInput,
  TextInput,
  EditButton,
  DeleteButton,
  FunctionField,
} from 'react-admin'
import { useCompany } from '../../transversal/companies/CompanyContext'
import { ResponsiveDatagrid } from '../../../generic/ResponsiveDatagrid'

const ExpenseFilters = [
  <SearchInput source="description" alwaysOn />,
  <TextInput source="job_id" label="Chantier" />,
]

export default function ExpenseList() {
  const { currentCompanyId } = useCompany()

  return (
    <List resource="expenses" filters={ExpenseFilters} perPage={25}>
      <ResponsiveDatagrid
        priorityFields={['job.description', 'amount', 'description']}
        rowClick="show"
      >
        <TextField source="job.description" label="Chantier" />

        <NumberField source="amount" label="Montant" />
        <TextField source="description" label="Description" />
        <DateField source="created_at" label="Créé le" showTime />
        <DateField source="updated_at" label="Modifié le" showTime />
        <FunctionField
          label="Créé par"
          render={(record) => (
            <span>
              {record.created_by?.first_name} {record.created_by?.last_name}
            </span>
          )}
        />

        <FunctionField
          label="Modifié par"
          render={(record) => (
            <span>
              {record.updated_by?.first_name} {record.updated_by?.last_name}
            </span>
          )}
        />
        <EditButton />
        <DeleteButton />
      </ResponsiveDatagrid>
    </List>
  )
}
