import { TextInput, NumberInput, DateInput, SelectInput, ReferenceInput } from 'react-admin'
import generateId from '../../../utili/utils.tsx'
import CollapsibleOptionalFields from '../../../generic/CollapsibleOptionalFields'

export default function CashTransactionForm({ isCreate = false, isCreateForm = false }) {
  const id = generateId()

  return (
    <>
      {isCreate && (
        <TextInput source="id" sx={{ display: 'none' }} defaultValue={id} data-testid="input-id" />
      )}
      {isCreateForm && <TextInput source="newId" sx={{ display: 'none' }} defaultValue={id} />}
      <ReferenceInput source="cash_account_id" reference="cash_accounts" label="Compte caisse">
        <SelectInput optionText="name" data-testid="input-cash_account_id" />
      </ReferenceInput>
      <NumberInput source="amount" label="Montant" data-testid="input-amount" />
      <DateInput
        source="transaction_date"
        label="Date transaction"
        data-testid="input-transaction_date"
      />
      <SelectInput
        source="type"
        label="Type"
        choices={[
          { id: 'CREDIT', name: 'Crédit' },
          { id: 'DEBIT', name: 'Débit' },
        ]}
        data-testid="input-type"
      />
      <CollapsibleOptionalFields>
        <TextInput
          source="description"
          label="Description"
          multiline
          data-testid="input-description"
        />
        <TextInput source="comment" label="Commentaire" multiline data-testid="input-comment" />
      </CollapsibleOptionalFields>
    </>
  )
}
