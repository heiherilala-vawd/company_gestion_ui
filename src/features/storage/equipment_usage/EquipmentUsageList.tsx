import { List, TextField, SearchInput, EditButton, FunctionField, SelectField } from 'react-admin'
import { ResponsiveDatagrid } from '../../../generic/ResponsiveDatagrid'

const EquipmentUsageFilters = [<SearchInput source="q" alwaysOn key="search" />]

export default function EquipmentUsageList() {
  return (
    <List resource="equipment_usage" filters={EquipmentUsageFilters} perPage={25}>
      <ResponsiveDatagrid priorityFields={['equipment_id', 'usage_status', 'start_time']}>
        <FunctionField
          source="equipment_id"
          label="Équipement"
          render={(record) => record.equipment?.name || ''}
        />
        <FunctionField
          source="job_id"
          label="Travail"
          render={(record) => record.job?.description || ''}
        />
        <SelectField
          source="usage_status"
          label="Statut"
          choices={[
            { id: 'IN_USE', name: 'En cours' },
            { id: 'BROKEN', name: 'En panne' },
            { id: 'RETURNED', name: 'Retourné' },
            { id: 'LOST', name: 'Perdu' },
          ]}
        />
        <TextField source="start_time" label="Début" />
        <TextField source="end_time" label="Fin" />
        <EditButton />
      </ResponsiveDatagrid>
    </List>
  )
}
