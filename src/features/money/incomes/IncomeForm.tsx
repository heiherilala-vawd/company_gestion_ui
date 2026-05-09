import { TextInput, NumberInput } from 'react-admin'
import generateId from '../../../utili/utils.tsx'
import { renderJobSelect } from '../../../generic/SelectWithCreateProvider.tsx'

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
      {renderJobSelect('job_id', 'Chantier')}
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
      <NumberInput source="amount" label="Montant" data-testid="input-amount" />
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
