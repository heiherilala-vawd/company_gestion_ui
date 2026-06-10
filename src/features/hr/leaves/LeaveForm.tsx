import { TextInput, NumberInput, SelectInput, DateInput } from 'react-admin'
import generateId from '../../../utili/utils.tsx'
import {
  renderUserSelect,
  renderLeaveTypesSelect,
} from '../../../generic/SelectWithCreateProvider.tsx'
import CollapsibleOptionalFields from '../../../generic/CollapsibleOptionalFields'

export default function LeaveForm({ isCreate = false, isCreateForm = false }) {
  return (
    <>
      {isCreate && (
        <TextInput
          source="id"
          sx={{ display: 'none' }}
          defaultValue={generateId()}
          data-testid="input-id"
        />
      )}
      {isCreateForm && (
        <TextInput source="newId" sx={{ display: 'none' }} defaultValue={generateId()} />
      )}
      {renderUserSelect('user_id', 'Employé')}
      {renderLeaveTypesSelect('leave_type_id', 'Type de congé')}
      <DateInput
        source="start_date"
        label="Date début"
        defaultValue={new Date().toISOString().split('T')[0]}
        data-testid="input-start_date"
      />
      <NumberInput
        source="duration_days"
        defaultValue={1}
        sx={{ display: 'none' }}
        data-testid="input-duration_days"
      />
      <CollapsibleOptionalFields>
        <DateInput source="end_date" label="Date fin" data-testid="input-end_date" />
        <SelectInput
          source="status"
          label="Statut"
          defaultValue="PENDING"
          choices={[
            { id: 'PENDING', name: 'En attente' },
            { id: 'APPROVED', name: 'Approuvé' },
            { id: 'REJECTED', name: 'Rejeté' },
            { id: 'CANCELLED', name: 'Annulé' },
          ]}
          data-testid="input-status"
        />
        <TextInput source="reason" label="Motif" multiline rows={3} data-testid="input-reason" />
        <TextInput source="comment" label="Commentaire" multiline data-testid="input-comment" />
      </CollapsibleOptionalFields>
    </>
  )
}
