import { List, TextField, SearchInput, EditButton, FunctionField } from 'react-admin'
import { ResponsiveDatagrid } from '../../../generic/ResponsiveDatagrid'

const EquipmentUsageFilters = [<SearchInput source="q" alwaysOn key="search" />]

export default function EquipmentUsageList() {
  return (
    <List resource="equipment_usage" filters={EquipmentUsageFilters} perPage={25}>
      <ResponsiveDatagrid priorityFields={['equipment_id', 'start_time']}>
        <FunctionField
          source="equipment_id"
          label="Équipement"
          render={(record) => record.equipment?.name || record.equipment_id || ''}
        />
        <FunctionField
          source="job_id"
          label="Travail"
          render={(record) => record.job?.description || record.job_id || ''}
        />
        <TextField source="start_time" label="Début" />
        <TextField source="end_time" label="Fin" />
        <EditButton />
      </ResponsiveDatagrid>
    </List>
  )
}
