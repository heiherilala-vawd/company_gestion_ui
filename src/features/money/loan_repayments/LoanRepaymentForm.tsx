import { TextInput, NumberInput, DateInput, ReferenceInput, SelectInput } from 'react-admin'
import generateId from '../../../utili/utils.tsx'
import CollapsibleOptionalFields from '../../../generic/CollapsibleOptionalFields'

export default function LoanRepaymentForm({ isCreate = false, isCreateForm = false }) {
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
      <ReferenceInput source="loan_id" reference="loans" label="Prêt">
        <SelectInput optionText="organization.name" data-testid="input-loan_id" />
      </ReferenceInput>
      <NumberInput source="amount" label="Montant" data-testid="input-amount" />
      <NumberInput
        source="principal_portion"
        label="Part capitale"
        data-testid="input-principal_portion"
      />
      <NumberInput
        source="interest_portion"
        label="Part intérêts"
        data-testid="input-interest_portion"
      />
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
