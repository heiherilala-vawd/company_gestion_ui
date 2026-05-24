import { TextInput, NumberInput, ReferenceInput, SelectInput } from 'react-admin'
import generateId from '../../../utili/utils.tsx'

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
      <TextInput source="payment_date" label="Date paiement" data-testid="input-payment_date" />
      <NumberInput source="amount" label="Montant" data-testid="input-amount" />
      <ReferenceInput source="loan_id" reference="loans" label="Prêt">
        <SelectInput optionText="lender" data-testid="input-loan_id" />
      </ReferenceInput>
    </>
  )
}
