import { List, TextField, NumberField, SearchInput, TextInput, EditButton } from 'react-admin'
import { ResponsiveDatagrid } from '../../../generic/ResponsiveDatagrid'

const ExpenseFilters = [
  <SearchInput source="q" alwaysOn key="q" />,
  <TextInput source="amount" label="Montant" key="amount" />,
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
        <TextField source="job.description" label="Travail" />
        <EditButton />
      </ResponsiveDatagrid>
    </List>
  )
}
