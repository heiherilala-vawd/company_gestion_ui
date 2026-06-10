import { List, TextField, BooleanField, NumberField, SearchInput, EditButton } from 'react-admin'
import { ResponsiveDatagrid } from '../../../generic/ResponsiveDatagrid'

const LeaveTypeFilters = [<SearchInput source="q" alwaysOn key="search" />]

export default function LeaveTypeList() {
  return (
    <List resource="leave_types" filters={LeaveTypeFilters} perPage={25}>
      <ResponsiveDatagrid priorityFields={['name', 'days_per_year']}>
        <TextField source="name" label="Nom" />
        <TextField source="description" label="Description" />
        <BooleanField source="paid" label="Payé" />
        <BooleanField source="deduct_from_balance" label="Déduit du solde" />
        <NumberField source="days_per_year" label="Jours / an" />
        <TextField source="color" label="Couleur" />
        <EditButton />
      </ResponsiveDatagrid>
    </List>
  )
}
