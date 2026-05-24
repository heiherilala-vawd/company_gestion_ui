import { TextInput, SelectInput, ReferenceInput, DateInput } from 'react-admin'
import generateId from '../../../utili/utils.tsx'

export default function TaskForm({ isCreate = false, isCreateForm = false }) {
  const id = generateId()

  return (
    <>
      {isCreate && (
        <TextInput
          source="id"
          readOnly
          defaultValue={id}
          sx={{ display: 'none' }}
          data-testid="input-id"
        />
      )}
      {isCreateForm && <TextInput source="newId" readOnly defaultValue={id} />}
      <TextInput source="title" label="Titre" data-testid="input-title" />
      <TextInput
        source="description"
        label="Description"
        multiline
        data-testid="input-description"
      />
      <SelectInput
        source="status"
        label="Statut"
        choices={[
          { id: 'TODO', name: 'À faire' },
          { id: 'IN_PROGRESS', name: 'En cours' },
          { id: 'DONE', name: 'Terminé' },
          { id: 'CANCELLED', name: 'Annulé' },
        ]}
        data-testid="input-status"
      />
      <SelectInput
        source="priority"
        label="Priorité"
        choices={[
          { id: 'LOW', name: 'Basse' },
          { id: 'MEDIUM', name: 'Moyenne' },
          { id: 'HIGH', name: 'Haute' },
          { id: 'URGENT', name: 'Urgente' },
        ]}
        data-testid="input-priority"
      />
      <ReferenceInput source="assigned_to" reference="users" label="Assigné à">
        <SelectInput
          optionText={(record) => `${record.first_name} ${record.last_name}`}
          data-testid="input-assigned_to"
        />
      </ReferenceInput>
      <DateInput source="due_date" label="Date échéance" data-testid="input-due_date" />
    </>
  )
}
