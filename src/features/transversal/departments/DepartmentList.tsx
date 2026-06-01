import { List, TextField, SearchInput, EditButton } from 'react-admin'
import { ResponsiveDatagrid } from '../../../generic/ResponsiveDatagrid'

const DepartmentFilters = [<SearchInput source="q" alwaysOn key="search" />]

export default function DepartmentList() {
  return (
    <List resource="departments" filters={DepartmentFilters} perPage={25}>
      <ResponsiveDatagrid priorityFields={['name']}>
        <TextField source="name" label="Nom" />
        <TextField source="description" label="Description" />
        <EditButton />
      </ResponsiveDatagrid>
    </List>
  )
}
