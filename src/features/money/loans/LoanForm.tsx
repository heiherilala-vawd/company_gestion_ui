import { TextInput, NumberInput, DateInput } from 'react-admin'
import generateId from '../../../utili/utils.tsx'
import {
  renderJobSelect,
  renderOrganizationSelect,
} from '../../../generic/SelectWithCreateProvider.tsx'
import CollapsibleOptionalFields from '../../../generic/CollapsibleOptionalFields'

export default function LoanForm({ isCreate = false, isCreateForm = false }) {
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
      {renderOrganizationSelect('organization_id', 'Prêteur')}
      <NumberInput source="amount" label="Montant" data-testid="input-amount" />
      <NumberInput
        source="interest_rate"
        label="Taux d'intérêt (% par mois)"
        data-testid="input-interest_rate"
      />
      {isCreate ? (
        <TextInput
          source="job_id"
          sx={{ display: 'none' }}
          defaultValue={localStorage.getItem('currentJobId')}
        />
      ) : (
        renderJobSelect('job_id', 'Travail')
      )}
      <CollapsibleOptionalFields>
        <DateInput
          source="start_date"
          label="Date début"
          defaultValue={new Date().toISOString().split('T')[0]}
          data-testid="input-start_date"
        />
        <DateInput
          source="due_date"
          label="Date échéance"
          defaultValue={new Date().toISOString().split('T')[0]}
          data-testid="input-due_date"
        />
        <TextInput
          source="description"
          label="Description"
          multiline
          rows={3}
          data-testid="input-description"
        />
        <TextInput source="comment" label="Commentaire" multiline data-testid="input-comment" />
      </CollapsibleOptionalFields>
    </>
  )
}
