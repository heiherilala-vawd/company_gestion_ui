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
          <TextField source="organization.name" />
        </ReferenceField>
        <DateField source="payment_date" label="Date paiement" />
        <NumberField
          source="amount"
          label="Montant"
          options={{ style: 'currency', currency: 'MGA' }}
        />
        <NumberField
          source="principal_portion"
          label="Part capital"
          options={{ style: 'currency', currency: 'MGA' }}
        />
        <NumberField
          source="interest_portion"
          label="Part intérêts"
          options={{ style: 'currency', currency: 'MGA' }}
        />
      </SimpleShowLayout>
    </Show>
  )
}
