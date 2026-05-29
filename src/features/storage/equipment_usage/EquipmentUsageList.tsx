import { List, TextField, SearchInput, EditButton } from 'react-admin'
import { ResponsiveDatagrid } from '../../../generic/ResponsiveDatagrid'

const EquipmentUsageFilters = [<SearchInput source="q" alwaysOn key="search" />]

export default function EquipmentUsageList() {
  return (
    <List resource="equipment_usage" filters={EquipmentUsageFilters} perPage={25}>
      <ResponsiveDatagrid priorityFields={['equipment_id', 'start_time']}>
        <TextField source="equipment_id" label="Équipement" />
        <TextField source="job_id" label="Travail" />
        <TextField source="start_time" label="Début" />
        <TextField source="end_time" label="Fin" />
        <EditButton />
      </ResponsiveDatagrid>
    </List>
  )
}
