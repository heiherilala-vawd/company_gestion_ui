import {
  DateField,
  FunctionField,
  Show,
  SimpleShowLayout,
  TextField,
  SelectField,
} from 'react-admin'

export default function TaskScheduleShow() {
  return (
    <Show title="Détails planification de tâches">
      <SimpleShowLayout>
        <TextField source="id" />
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
        <TextField source="frequency" label="Fréquence (cron)" />
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
