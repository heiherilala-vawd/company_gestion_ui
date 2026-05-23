import {
  List,
  TextField,
  DateField,
  SelectField,
  SearchInput,
  SelectInput,
  NumberField,
  FunctionField,
  EditButton,
} from 'react-admin'
import { ResponsiveDatagrid } from '../../../generic/ResponsiveDatagrid'
import { LeaveStatus } from '../../../../gen-ts'

const LeaveFilters = [
  <SearchInput source="q" alwaysOn />,
  <SelectInput
    source="status"
    label="Statut"
    choices={[
      { id: 'PENDING', name: 'En attente' },
      { id: 'APPROVED', name: 'Approuvé' },
      { id: 'REJECTED', name: 'Rejeté' },
      { id: 'CANCELLED', name: 'Annulé' },
    ]}
  />,
]

const statusColors: Record<string, string> = {
  PENDING: '#FF9800',
  APPROVED: '#4CAF50',
  REJECTED: '#F44336',
  CANCELLED: '#9E9E9E',
}

export default function LeaveList() {
  return (
    <List resource="leaves" filters={LeaveFilters} perPage={25}>
      <ResponsiveDatagrid priorityFields={['user', 'leave_type.name', 'start_date', 'status']}>
        <FunctionField
          label="Employé"
          render={(record: any) => record.user?.first_name + ' ' + record.user?.last_name || ''}
        />
        <TextField source="leave_type.name" label="Type de congé" />
        <DateField source="start_date" label="Début" />
        <DateField source="end_date" label="Fin" />
        <NumberField source="duration_days" label="Jours" />
        <FunctionField
          label="Statut"
          render={(record: any) => (
            <span
              style={{
                color: statusColors[record.status] || '#000',
                fontWeight: 'bold',
              }}
            >
              {record.status === 'PENDING' && 'En attente'}
              {record.status === 'APPROVED' && 'Approuvé'}
              {record.status === 'REJECTED' && 'Rejeté'}
              {record.status === 'CANCELLED' && 'Annulé'}
            </span>
          )}
        />
        <EditButton />
      </ResponsiveDatagrid>
    </List>
  )
}
