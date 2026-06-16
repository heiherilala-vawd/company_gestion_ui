import {
  Show,
  SimpleShowLayout,
  TextField,
  NumberField,
  BooleanField,
  DateField,
  FunctionField,
} from 'react-admin'

export default function IncomeShow() {
  return (
    <Show title="Détails revenu">
      <SimpleShowLayout>
        <TextField source="id" />
        <TextField source="organization.name" label="Organisation" />
        <TextField source="invoice_reference" label="Référence facture" />
        <NumberField
          source="amount"
          label="Montant"
          options={{ style: 'currency', currency: 'MGA' }}
        />
        <BooleanField source="paid" label="Payé" />
        <NumberField
          source="remaining_amount"
          label="Reste à recevoir"
          options={{ style: 'currency', currency: 'MGA' }}
        />
        <TextField source="description" label="Description" />
        <TextField source="job.description" label="Travail" />
        <TextField source="income_type.name" label="Type de revenu" />
        <DateField source="billing_start_date" label="Date début facturation" />
        <TextField source="comment" label="Commentaire" />
        <DateField source="created_at" label="Créé le" showTime />
        <DateField source="updated_at" label="Modifié le" showTime />
        <FunctionField
          label="Créé par"
          render={(record) => (
            <span>
              {record.created_by?.first_name} {record.created_by?.last_name}
            </span>
          )}
        />
        <FunctionField
          label="Modifié par"
          render={(record) => (
            <span>
              {record.updated_by?.first_name} {record.updated_by?.last_name}
            </span>
          )}
        />
      </SimpleShowLayout>
    </Show>
  )
}
