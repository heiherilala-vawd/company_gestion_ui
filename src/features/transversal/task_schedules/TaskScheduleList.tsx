import { List, TextField, SearchInput, EditButton, SelectField, FunctionField } from 'react-admin'
import { ResponsiveDatagrid } from '../../../generic/ResponsiveDatagrid'

const TaskScheduleFilters = [<SearchInput source="q" alwaysOn key="search" />]

export default function TaskScheduleList() {
  return (
    <List resource="task_schedules" filters={TaskScheduleFilters} perPage={25}>
      <ResponsiveDatagrid priorityFields={['title', 'scheduled_date']}>
        <TextField source="title" label="Titre" />
        <TextField source="description" label="Description" />
        <SelectField
          source="priority"
          label="Priorité"
          choices={[
            { id: 'LOW', name: 'Basse' },
            { id: 'MEDIUM', name: 'Moyenne' },
            { id: 'HIGH', name: 'Haute' },
            { id: 'CRITICAL', name: 'Critique' },
          ]}
        />
        <TextField source="frequency" label="Fréquence" />
        <TextField source="scheduled_date" label="Date planifiée" />
        <SelectField
          source="status"
          label="Statut"
          choices={[
            { id: 'ACTIVE', name: 'Actif' },
            { id: 'PAUSED', name: 'En pause' },
            { id: 'DONE', name: 'Terminé' },
          ]}
        />
        <FunctionField
          label="Assigné à"
          render={(record) =>
            record.assigned_users?.map((u: any) => `${u.first_name} ${u.last_name}`).join(', ') ||
            ''
          }
        />
        <EditButton />
      </ResponsiveDatagrid>
    </List>
  )
}
