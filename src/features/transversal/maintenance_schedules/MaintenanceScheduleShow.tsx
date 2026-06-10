import {
  DateField,
  FunctionField,
  Show,
  SimpleShowLayout,
  TextField,
  SelectField,
  ReferenceField,
} from 'react-admin'

export default function MaintenanceScheduleShow() {
  return (
    <Show title="Détails planification de maintenance">
      <SimpleShowLayout>
        <TextField source="id" />
        <ReferenceField source="equipment_id" reference="equipment" label="Équipement">
          <TextField source="name" />
        </ReferenceField>
        <TextField source="description" label="Description" />
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
