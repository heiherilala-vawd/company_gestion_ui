import { TextInput, NumberInput, SelectInput } from 'react-admin'
import generateId from '../../../utili/utils.tsx'

export default function LoanForm({ isCreate = false, isCreateForm = false }) {
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
      <TextInput source="lender" label="Prêteur" data-testid="input-lender" />
      <NumberInput source="amount" label="Montant" data-testid="input-amount" />
      <NumberInput
        source="interest_rate"
        label="Taux d'intérêt (points de base)"
        data-testid="input-interest_rate"
      />
      <TextInput source="start_date" label="Date début" data-testid="input-start_date" />
      <TextInput source="due_date" label="Date échéance" data-testid="input-due_date" />
      <SelectInput
        source="status"
        label="Statut"
        defaultValue="ACTIVE"
        choices={[
          { id: 'ACTIVE', name: 'Actif' },
          { id: 'PAID', name: 'Payé' },
          { id: 'DEFAULTED', name: 'Défaut' },
        ]}
        data-testid="input-status"
      />
      <TextInput
        source="description"
        label="Description"
        multiline
        rows={3}
        data-testid="input-description"
      />
    </>
  )
}
