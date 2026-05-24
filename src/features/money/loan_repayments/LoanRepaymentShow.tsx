import {
  Show,
  SimpleShowLayout,
  TextField,
  NumberField,
  DateField,
  ReferenceField,
} from 'react-admin'

export default function LoanRepaymentShow() {
  return (
    <Show title="Détails remboursement">
      <SimpleShowLayout>
        <TextField source="id" />
        <ReferenceField source="loan_id" reference="loans" label="Prêt">
          <TextField source="lender" />
        </ReferenceField>
        <DateField source="payment_date" label="Date paiement" />
        <NumberField source="amount" label="Montant" />
        <NumberField source="principal_portion" label="Part capital" />
        <NumberField source="interest_portion" label="Part intérêts" />
      </SimpleShowLayout>
    </Show>
  )
}
