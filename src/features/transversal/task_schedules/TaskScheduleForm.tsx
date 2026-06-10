import {
  TextInput,
  DateInput,
  SelectInput,
  ReferenceArrayInput,
  AutocompleteArrayInput,
} from 'react-admin'
import generateId from '../../../utili/utils.tsx'
import CollapsibleOptionalFields from '../../../generic/CollapsibleOptionalFields'
import CronInput from './CronInput'

export default function TaskScheduleForm({ isCreate = false, isCreateForm = false }) {
  const id = generateId()

  return (
    <>
      {isCreate && (
        <TextInput source="id" sx={{ display: 'none' }} defaultValue={id} data-testid="input-id" />
      )}
      {isCreateForm && <TextInput source="newId" sx={{ display: 'none' }} defaultValue={id} />}
      <TextInput source="title" label="Titre" data-testid="input-title" />
      <SelectInput
        source="priority"
        label="Priorité"
        choices={[
          { id: 'LOW', name: 'Basse' },
          { id: 'MEDIUM', name: 'Moyenne' },
          { id: 'HIGH', name: 'Haute' },
          { id: 'CRITICAL', name: 'Critique' },
        ]}
        defaultValue="MEDIUM"
        data-testid="input-priority"
      />
      <CronInput source="frequency" label="Fréquence" data-testid="input-frequency" />
      <DateInput
        source="scheduled_date"
        label="Date planifiée"
        defaultValue={new Date()}
        data-testid="input-scheduled_date"
      />
      <SelectInput
        source="status"
        label="Statut"
        defaultValue="ACTIVE"
        choices={[
          { id: 'ACTIVE', name: 'Actif' },
          { id: 'PAUSED', name: 'En pause' },
          { id: 'DONE', name: 'Terminé' },
        ]}
        data-testid="input-status"
      />
      <ReferenceArrayInput source="assigned_user_ids" reference="users" label="Assigné à">
        <AutocompleteArrayInput
          fullWidth
          optionText={(record) => `${record.first_name} ${record.last_name}`}
          data-testid="input-assigned_user_ids"
        />
      </ReferenceArrayInput>
      <TextInput
        source="company_id"
        defaultValue={localStorage.getItem('currentCompanyId')}
        sx={{ display: 'none' }}
        data-testid="input-company_id"
      />
      <CollapsibleOptionalFields>
        <TextInput
          source="description"
          label="Description"
          multiline
          data-testid="input-description"
        />
        <TextInput source="comment" label="Commentaire" multiline data-testid="input-comment" />
      </CollapsibleOptionalFields>
    </>
  )
}
