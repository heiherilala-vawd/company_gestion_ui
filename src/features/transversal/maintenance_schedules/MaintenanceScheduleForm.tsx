import {
  TextInput,
  DateInput,
  SelectInput,
  ReferenceInput,
  SelectInput as RefSelectInput,
} from 'react-admin'
import generateId from '../../../utili/utils.tsx'
import CollapsibleOptionalFields from '../../../generic/CollapsibleOptionalFields'
import CronInput from '../task_schedules/CronInput'

export default function MaintenanceScheduleForm({ isCreate = false }) {
  const id = generateId()

  return (
    <>
      {isCreate && (
        <TextInput source="id" sx={{ display: 'none' }} defaultValue={id} data-testid="input-id" />
      )}
      <ReferenceInput source="equipment_id" reference="equipment" label="Équipement">
        <RefSelectInput optionText="name" data-testid="input-equipment_id" />
      </ReferenceInput>
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
