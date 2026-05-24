import { List, TextField, SearchInput, EditButton, SelectField, FunctionField } from 'react-admin'
import { ResponsiveDatagrid } from '../../../generic/ResponsiveDatagrid'

const TaskFilters = [<SearchInput source="q" alwaysOn />]

export default function TaskList() {
  return (
    <List resource="tasks" filters={TaskFilters} perPage={25}>
      <ResponsiveDatagrid priorityFields={['title']}>
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
        <EditButton />
      </ResponsiveDatagrid>
    </List>
  )
}
