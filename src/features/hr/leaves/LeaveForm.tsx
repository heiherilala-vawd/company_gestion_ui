import { TextInput, NumberInput, SelectInput } from 'react-admin'
import generateId from '../../../utili/utils.tsx'
import {
  renderUserSelect,
  renderLeaveTypesSelect,
} from '../../../generic/SelectWithCreateProvider.tsx'

export default function LeaveForm({ isCreate = false, isCreateForm = false }) {
  return (
    <>
      {isCreate && (
        <TextInput
          source="id"
          readOnly
          defaultValue={generateId()}
          sx={{ display: 'none' }}
          data-testid="input-id"
        />
      )}
      {isCreateForm && <TextInput source="newId" readOnly defaultValue={generateId()} />}
      {renderUserSelect('user_id', 'Employé')}
      {renderLeaveTypesSelect('leave_type_id', 'Type de congé')}
      <TextInput source="start_date" label="Date début" data-testid="input-start_date" />
      <TextInput source="end_date" label="Date fin" data-testid="input-end_date" />
      <NumberInput source="duration_days" label="Durée (jours)" data-testid="input-duration_days" />
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
    </>
  )
}
