import { List, SearchInput, TextField, SelectField, DateField, EditButton } from 'react-admin'
import { ResponsiveDatagrid } from '../../../generic/ResponsiveDatagrid'

const MaintenanceScheduleFilters = [<SearchInput source="q" alwaysOn key="search" />]

export default function MaintenanceScheduleList() {
  return (
    <List resource="maintenance_schedules" filters={MaintenanceScheduleFilters} perPage={25}>
      <ResponsiveDatagrid priorityFields={['equipment_id', 'scheduled_date']}>
        <TextField source="equipment.name" label="Équipement" />
        <TextField source="description" label="Description" />
        <TextField source="frequency" label="Fréquence" />
        <DateField source="scheduled_date" label="Date planifiée" />
        <SelectField
          source="status"
          label="Statut"
          choices={[
            { id: 'ACTIVE', name: 'Actif' },
            { id: 'PAUSED', name: 'En pause' },
            { id: 'DONE', name: 'Terminé' },
          ]}
        />
        <EditButton />
      </ResponsiveDatagrid>
    </List>
  )
}
