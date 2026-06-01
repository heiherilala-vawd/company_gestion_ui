import { List, TextField, SearchInput, EditButton } from 'react-admin'
import { ResponsiveDatagrid } from '../../../generic/ResponsiveDatagrid'

const OtherExpenseTypeFilters = [<SearchInput source="q" alwaysOn key="search" />]

export default function OtherExpenseTypeList() {
  return (
    <List resource="other_expense_types" filters={OtherExpenseTypeFilters} perPage={25}>
      <ResponsiveDatagrid priorityFields={['name']}>
        <TextField source="name" label="Nom" />
        <TextField source="description" label="Description" />
        <EditButton />
      </ResponsiveDatagrid>
    </List>
  )
}
