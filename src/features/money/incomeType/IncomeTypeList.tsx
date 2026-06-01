import { List, TextField, SearchInput, EditButton } from 'react-admin'
import { ResponsiveDatagrid } from '../../../generic/ResponsiveDatagrid'

const IncomeTypeFilters = [<SearchInput source="q" alwaysOn key="search" />]

export default function IncomeTypeList() {
  return (
    <List resource="income_types" filters={IncomeTypeFilters} perPage={25}>
      <ResponsiveDatagrid priorityFields={['name']}>
        <TextField source="name" label="Nom" />
        <TextField source="description" label="Description" />
        <EditButton />
      </ResponsiveDatagrid>
    </List>
  )
}
