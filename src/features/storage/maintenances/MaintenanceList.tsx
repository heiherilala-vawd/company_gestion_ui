import { List, TextField, SearchInput, EditButton, NumberField, FunctionField } from 'react-admin'
import { ResponsiveDatagrid } from '../../../generic/ResponsiveDatagrid'

const MaintenanceFilters = [<SearchInput source="q" alwaysOn key="search" />]

export default function MaintenanceList() {
  return (
    <List resource="maintenances" filters={MaintenanceFilters} perPage={25}>
      <ResponsiveDatagrid priorityFields={['description']}>
        <FunctionField
          source="equipment_id"
          label="Équipement"
          render={(record) => record.equipment?.name || record.equipment_id || ''}
        />
        <TextField source="description" label="Description" />
        <NumberField
          source="expense.amount"
          label="Montant"
          options={{ style: 'currency', currency: 'MGA' }}
        />
        <EditButton />
      </ResponsiveDatagrid>
    </List>
  )
}
