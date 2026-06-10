import { TextInput, NumberInput, DateInput, ReferenceInput, SelectInput } from 'react-admin'
import generateId from '../../../utili/utils.tsx'
import CollapsibleOptionalFields from '../../../generic/CollapsibleOptionalFields'

export default function ReceiptForm({ isCreate = false, isCreateForm = false }) {
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
      <ReferenceInput source="income_id" reference="incomes" label="Revenu">
        <SelectInput optionText="organization.name" data-testid="input-income_id" />
      </ReferenceInput>
      <NumberInput source="amount" label="Montant" data-testid="input-amount" />
      <CollapsibleOptionalFields>
        <DateInput
          source="payment_date"
          label="Date paiement"
          defaultValue={new Date().toISOString().split('T')[0]}
          data-testid="input-payment_date"
        />
        <TextInput source="comment" label="Commentaire" multiline data-testid="input-comment" />
      </CollapsibleOptionalFields>
    </>
  )
}
