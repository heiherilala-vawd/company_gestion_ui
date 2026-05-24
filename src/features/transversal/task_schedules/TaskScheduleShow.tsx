import {
  DateField,
  FunctionField,
  Show,
  SimpleShowLayout,
  TextField,
  BooleanField,
} from 'react-admin'

export default function TaskScheduleShow() {
  return (
    <Show title="Détails planification">
      <SimpleShowLayout>
        <TextField source="id" />
        <TextField source="task_id" label="Tâche" />
        <TextField source="scheduled_date" label="Date planifiée" />
        <TextField source="start_time" label="Heure début" />
        <TextField source="end_time" label="Heure fin" />
        <BooleanField source="recurring" label="Récurrent" />
        <TextField source="recurrence_pattern" label="Récurrence" />
        <DateField source="created_at" label="Créé le" showTime />
        <DateField source="updated_at" label="Modifié le" showTime />
        <FunctionField
          label="Créé par"
          render={(record) => (
            <span>
              {record.created_by?.first_name} {record.created_by?.last_name}
            </span>
          )}
        />
        <FunctionField
          label="Modifié par"
          render={(record) => (
            <span>
              {record.updated_by?.first_name} {record.updated_by?.last_name}
            </span>
          )}
        />
      </SimpleShowLayout>
    </Show>
  )
}
