import { List, TextField, SearchInput, EditButton } from 'react-admin'
import { ResponsiveDatagrid } from '../../../generic/ResponsiveDatagrid'

const TaskScheduleFilters = [<SearchInput source="q" alwaysOn />]

export default function TaskScheduleList() {
  return (
    <List resource="task_schedules" filters={TaskScheduleFilters} perPage={25}>
      <ResponsiveDatagrid priorityFields={['task_id', 'scheduled_date']}>
        <TextField source="task_id" label="Tâche" />
        <TextField source="scheduled_date" label="Date planifiée" />
        <TextField source="start_time" label="Heure début" />
        <TextField source="end_time" label="Heure fin" />
        <EditButton />
      </ResponsiveDatagrid>
    </List>
  )
}
