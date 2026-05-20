import { required, TextInput, NumberInput, SelectInput } from 'react-admin'
import generateId from '../../../utili/utils.tsx'

export default function LeaveConfigForm({ isCreate = false, isCreateForm = false }) {
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
      <TextInput source="hire_date" label="Date d'embauche" data-testid="input-hire_date" />
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
    </>
  )
}
