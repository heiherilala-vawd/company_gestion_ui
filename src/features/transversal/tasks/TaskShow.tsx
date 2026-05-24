import {
  DateField,
  FunctionField,
  Show,
  SimpleShowLayout,
  TextField,
  SelectField,
} from 'react-admin'

export default function TaskShow() {
  return (
    <Show title="Détails tâche">
      <SimpleShowLayout>
        <TextField source="id" />
        <TextField source="title" label="Titre" />
        <TextField source="description" label="Description" />
        <SelectField
          source="status"
          label="Statut"
          choices={[
            { id: 'TODO', name: 'À faire' },
            { id: 'IN_PROGRESS', name: 'En cours' },
            { id: 'DONE', name: 'Terminé' },
            { id: 'CANCELLED', name: 'Annulé' },
          ]}
        />
        <SelectField
          source="priority"
          label="Priorité"
          choices={[
            { id: 'LOW', name: 'Basse' },
            { id: 'MEDIUM', name: 'Moyenne' },
            { id: 'HIGH', name: 'Haute' },
            { id: 'URGENT', name: 'Urgente' },
          ]}
        />
        <FunctionField
          label="Assigné à"
          render={(record) =>
            record.assigned_to
              ? `${record.assigned_to.first_name} ${record.assigned_to.last_name}`
              : ''
          }
        />
        <TextField source="due_date" label="Date échéance" />
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
