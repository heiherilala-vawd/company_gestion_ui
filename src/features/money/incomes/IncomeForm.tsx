import { TextInput, NumberInput, DateTimeInput } from 'react-admin'
import generateId from '../../../utili/utils.tsx'
import {
  renderIncomeTypeSelect,
  renderJobSelect,
} from '../../../generic/SelectWithCreateProvider.tsx'

// eslint-disable-next-line react/prop-types
export default function IncomeForm({ isCreate = false, isCreateForm = false }) {
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
      )}{' '}
      {isCreateForm && <TextInput source="newId" readOnly defaultValue={generateId()} />}
      <TextInput
        source="source_organization"
        label="Organisation source"
        data-testid="input-source_organization"
      />
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
      {renderIncomeTypeSelect('income_type_id', 'Type de revenu')}
      {!isCreate && renderJobSelect('job_id', 'Chantier')}
      <NumberInput source="amount" label="Montant" data-testid="input-amount" />
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
    </>
  )
}
