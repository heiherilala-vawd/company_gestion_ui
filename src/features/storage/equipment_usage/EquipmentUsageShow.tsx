import {
  DateField,
  FunctionField,
  SelectField,
  Show,
  SimpleShowLayout,
  TextField,
} from 'react-admin'

export default function EquipmentUsageShow() {
  return (
    <Show title="Détails utilisation équipement">
      <SimpleShowLayout>
        <TextField source="id" />
        <TextField source="equipment.name" label="Équipement" />
        <TextField source="job.description" label="Travail" />
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
