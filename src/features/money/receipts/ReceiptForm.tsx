import { TextInput, NumberInput, ReferenceInput, SelectInput } from 'react-admin'
import generateId from '../../../utili/utils.tsx'

export default function ReceiptForm({ isCreate = false, isCreateForm = false }) {
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
      <TextInput source="payment_date" label="Date paiement" data-testid="input-payment_date" />
      <NumberInput source="amount" label="Montant" data-testid="input-amount" />
      <ReferenceInput source="income_id" reference="incomes" label="Revenu">
        <SelectInput optionText="source_organization" data-testid="input-income_id" />
      </ReferenceInput>
    </>
  )
}
