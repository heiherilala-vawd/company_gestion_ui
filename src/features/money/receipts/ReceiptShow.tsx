import {
  Show,
  SimpleShowLayout,
  TextField,
  NumberField,
  DateField,
  ReferenceField,
} from 'react-admin'

export default function ReceiptShow() {
  return (
    <Show title="Détails reçu">
      <SimpleShowLayout>
        <TextField source="id" />
        <ReferenceField source="income_id" reference="incomes" label="Revenu">
          <TextField source="source_organization" />
        </ReferenceField>
        <DateField source="payment_date" label="Date paiement" />
        <NumberField source="amount" label="Montant" />
      </SimpleShowLayout>
    </Show>
  )
}
