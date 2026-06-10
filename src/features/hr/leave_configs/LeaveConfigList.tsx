import { List, TextField, NumberField, DateField, SearchInput, EditButton } from 'react-admin'
import { ResponsiveDatagrid } from '../../../generic/ResponsiveDatagrid'

const LeaveConfigFilters = [<SearchInput source="q" alwaysOn key="search" />]

export default function LeaveConfigList() {
  return (
    <List resource="leave_configs" filters={LeaveConfigFilters} perPage={25}>
      <ResponsiveDatagrid priorityFields={['contract_type']}>
        <TextField source="contract_type" label="Contrat" />
        <DateField source="hire_date" label="Date d'embauche" />
        <NumberField source="vacation_days_per_month" label="Jours / mois" />
        <NumberField source="weekly_hours" label="Heures / semaine" />
        <DateField source="end_date" label="Date fin" />
        <EditButton />
      </ResponsiveDatagrid>
    </List>
  )
}
