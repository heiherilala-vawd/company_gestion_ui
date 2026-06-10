import { List, TextField, FunctionField, TextInput, SearchInput } from 'react-admin'
import { ResponsiveDatagrid } from '../../../generic/ResponsiveDatagrid'

const LeaveBalanceFilters = [
  <SearchInput source="q" alwaysOn key="search" />,
  <TextInput
    source="year"
    label="Année"
    defaultValue={String(new Date().getFullYear())}
    key="year"
  />,
]

export default function LeaveBalanceList() {
  return (
    <List resource="leave_balances" filters={LeaveBalanceFilters} perPage={25}>
      <ResponsiveDatagrid
        priorityFields={['user', 'accrued_days', 'taken_days', 'remaining_days']}
        rowClick={false}
      >
        <FunctionField
          source="user"
          label="Employé"
          render={(record: any) =>
            record.user ? `${record.user.first_name} ${record.user.last_name}` : ''
          }
        />
        <TextField source="accrued_days" label="Jours acquis" />
        <TextField source="taken_days" label="Jours pris" />
        <TextField source="remaining_days" label="Jours restants" />
      </ResponsiveDatagrid>
    </List>
  )
}
