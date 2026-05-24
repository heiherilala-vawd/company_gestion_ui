import { List, TextField, SearchInput, EditButton, NumberField } from 'react-admin'
import { ResponsiveDatagrid } from '../../../generic/ResponsiveDatagrid'

const MaintenanceFilters = [<SearchInput source="q" alwaysOn />]

export default function MaintenanceList() {
  return (
    <List resource="maintenances" filters={MaintenanceFilters} perPage={25}>
      <ResponsiveDatagrid priorityFields={['description']}>
        <TextField source="equipment_id" label="Équipement" />
        <TextField source="description" label="Description" />
        <NumberField source="expense.amount" label="Montant" />
        <EditButton />
      </ResponsiveDatagrid>
    </List>
  )
}
