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
import { ResponsiveDatagrid } from '../../../generic/ResponsiveDatagrid'

const ExpenseFilters = [
  <SearchInput source="description" alwaysOn />,
  <TextInput source="amount" label="Montant" />,
]

export default function ExpenseList() {
  return (
    <List resource="expenses" filters={ExpenseFilters} perPage={25}>
      <ResponsiveDatagrid
        priorityFields={['job.description', 'amount', 'description']}
        rowClick="show"
      >
        <TextField source="description" label="Description" />
        <NumberField source="amount" label="Montant" />
        <TextField source="job.description" label="Chantier" />
        <EditButton />
      </ResponsiveDatagrid>
    </List>
  )
}
