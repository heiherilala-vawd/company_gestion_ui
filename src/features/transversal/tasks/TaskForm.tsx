import {
  TextInput,
  SelectInput,
  DateInput,
  BooleanInput,
  ReferenceArrayInput,
  AutocompleteArrayInput,
} from 'react-admin'
import generateId from '../../../utili/utils.tsx'
import CollapsibleOptionalFields from '../../../generic/CollapsibleOptionalFields'

export default function TaskForm({ isCreate = false, isCreateForm = false }) {
  const id = generateId()

  return (
    <>
      {isCreate && (
        <TextInput source="id" sx={{ display: 'none' }} defaultValue={id} data-testid="input-id" />
      )}
      {isCreateForm && <TextInput source="newId" sx={{ display: 'none' }} defaultValue={id} />}
      <TextInput source="title" label="Titre" data-testid="input-title" />
      <TextInput
        source="description"
        label="Description"
        multiline
        data-testid="input-description"
      />
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
      <ReferenceArrayInput source="assigned_user_ids" reference="users" label="Assigné à">
        <AutocompleteArrayInput
          fullWidth
          optionText={(record) => `${record.first_name} ${record.last_name}`}
          data-testid="input-assigned_user_ids"
        />
      </ReferenceArrayInput>
      <TextInput
        source="description"
        label="Description"
        multiline
        data-testid="input-description"
      />
      <TextInput
        source="company_id"
        defaultValue={localStorage.getItem('currentCompanyId')}
        sx={{ display: 'none' }}
        data-testid="input-company_id"
      />
      <CollapsibleOptionalFields>
        <DateInput source="due_date" label="Date échéance" data-testid="input-due_date" />
        <BooleanInput
          source="completed"
          label="Terminée"
          defaultValue={false}
          data-testid="input-completed"
        />
        <TextInput source="comment" label="Commentaire" multiline data-testid="input-comment" />
      </CollapsibleOptionalFields>
    </>
  )
}
