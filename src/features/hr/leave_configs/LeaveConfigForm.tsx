import { TextInput, NumberInput, SelectInput, DateInput } from 'react-admin'
import generateId from '../../../utili/utils.tsx'
import CollapsibleOptionalFields from '../../../generic/CollapsibleOptionalFields'

export default function LeaveConfigForm({ isCreate = false, isCreateForm = false }) {
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
      <DateInput source="hire_date" label="Date d'embauche" data-testid="input-hire_date" />
      <SelectInput
        source="contract_type"
        label="Type de contrat"
        choices={[
          { id: 'CDI', name: 'CDI' },
          { id: 'CDD', name: 'CDD' },
          { id: 'INTERIM', name: 'Intérim' },
          { id: 'STAGE', name: 'Stage' },
          { id: 'FREELANCE', name: 'Freelance' },
        ]}
        data-testid="input-contract_type"
      />
      <NumberInput
        source="vacation_days_per_month"
        label="Jours de congé / mois"
        defaultValue={2.5}
        data-testid="input-vacation_days"
      />
      <NumberInput
        source="weekly_hours"
        label="Heures / semaine"
        defaultValue={35}
        data-testid="input-weekly_hours"
      />
      <TextInput
        source="company_id"
        label="ID Entreprise"
        defaultValue={localStorage.getItem('currentCompanyId')}
        sx={{ display: 'none' }}
      />
      <CollapsibleOptionalFields>
        <DateInput source="end_date" label="Date fin" data-testid="input-end_date" />
        <TextInput source="comment" label="Commentaire" multiline data-testid="input-comment" />
      </CollapsibleOptionalFields>
    </>
  )
}
