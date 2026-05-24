import { TextInput, DateInput, BooleanInput, SelectInput, ReferenceInput } from 'react-admin'
import generateId from '../../../utili/utils.tsx'

export default function TaskScheduleForm({ isCreate = false, isCreateForm = false }) {
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
      <ReferenceInput source="task_id" reference="tasks" label="Tâche">
        <SelectInput optionText="title" data-testid="input-task_id" />
      </ReferenceInput>
      <DateInput
        source="scheduled_date"
        label="Date planifiée"
        data-testid="input-scheduled_date"
      />
      <TextInput source="start_time" label="Heure début" data-testid="input-start_time" />
      <TextInput source="end_time" label="Heure fin" data-testid="input-end_time" />
      <BooleanInput source="recurring" label="Récurrent" data-testid="input-recurring" />
      <SelectInput
        source="recurrence_pattern"
        label="Récurrence"
        choices={[
          { id: 'daily', name: 'Quotidien' },
          { id: 'weekly', name: 'Hebdomadaire' },
          { id: 'monthly', name: 'Mensuel' },
          { id: 'yearly', name: 'Annuel' },
        ]}
        data-testid="input-recurrence_pattern"
      />
    </>
  )
}
