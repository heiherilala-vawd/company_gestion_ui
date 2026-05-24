import { TextInput, NumberInput, DateInput, SelectInput, ReferenceInput } from 'react-admin'
import generateId from '../../../utili/utils.tsx'

export default function CashTransactionForm({ isCreate = false, isCreateForm = false }) {
  const id = generateId()

  return (
    <>
      {isCreate && (
        <TextInput
          source="id"
          readOnly
          defaultValue={id}
          sx={{ display: 'none' }}
          data-testid="input-id"
        />
      )}
      {isCreateForm && <TextInput source="newId" readOnly defaultValue={id} />}
      <ReferenceInput source="cash_account_id" reference="cash_accounts" label="Compte caisse">
        <SelectInput optionText="name" data-testid="input-cash_account_id" />
      </ReferenceInput>
      <NumberInput source="amount" label="Montant" data-testid="input-amount" />
      <DateInput
        source="transaction_date"
        label="Date transaction"
        data-testid="input-transaction_date"
      />
      <TextInput
        source="description"
        label="Description"
        multiline
        data-testid="input-description"
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
    </>
  )
}
