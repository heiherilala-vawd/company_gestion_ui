import { TextInput, NumberInput, DateTimeInput, DateInput, BooleanInput } from 'react-admin'
import generateId from '../../../utili/utils.tsx'
import {
  renderIncomeTypeSelect,
  renderJobSelect,
} from '../../../generic/SelectWithCreateProvider.tsx'
import CollapsibleOptionalFields from '../../../generic/CollapsibleOptionalFields'

export default function IncomeForm({ isCreate = false, isCreateForm = false }) {
  return (
    <>
      {isCreate && (
        <TextInput
          source="id"
          defaultValue={generateId()}
          sx={{ display: 'none' }}
          data-testid="input-id"
        />
      )}{' '}
      {isCreateForm && (
        <TextInput source="newId" sx={{ display: 'none' }} defaultValue={generateId()} />
      )}
      <TextInput
        source="source_organization"
        label="Organisation source"
        data-testid="input-source_organization"
      />
      {renderIncomeTypeSelect('income_type_id', 'Type de revenu')}
      {!isCreate && renderJobSelect('job_id', 'Travail')}
      <NumberInput source="amount" label="Montant" data-testid="input-amount" />
      <CollapsibleOptionalFields>
        <TextInput
          source="invoice_reference"
          label="Référence facture"
          data-testid="input-invoice_reference"
        />
        <DateTimeInput
          source="billing_start_date"
          label="Date de début de facturation"
          defaultValue={new Date().toISOString()}
        />
        <DateTimeInput
          source="facturation_date"
          label="Date de facturation"
          defaultValue={new Date().toISOString()}
          data-testid="input-facturation_date"
        />
        <DateInput
          source="due_date"
          label="Date d'échéance"
          defaultValue={new Date().toISOString().split('T')[0]}
          data-testid="input-due_date"
        />
        <TextInput
          source="payment_terms"
          label="Conditions de paiement"
          helperText="Ex: NET-30, 30J fin de mois"
          defaultValue="À réception"
          data-testid="input-payment_terms"
        />
        <BooleanInput source="paid" label="Payé" defaultValue={false} data-testid="input-paid" />
        <TextInput
          source="description"
          label="Description"
          multiline
          rows={3}
          data-testid="input-description"
        />
        <TextInput
          source="comment"
          label="Commentaire"
          multiline
          rows={3}
          data-testid="input-comment"
        />
      </CollapsibleOptionalFields>
    </>
  )
}
