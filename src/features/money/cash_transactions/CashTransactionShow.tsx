import {
  DateField,
  FunctionField,
  Show,
  SimpleShowLayout,
  TextField,
  NumberField,
  SelectField,
} from 'react-admin'

export default function CashTransactionShow() {
  return (
    <Show title="Détails transaction caisse">
      <SimpleShowLayout>
        <TextField source="id" />
        <TextField source="cash_account_id" label="Compte caisse" />
        <NumberField source="amount" label="Montant" />
        <TextField source="transaction_date" label="Date transaction" />
        <TextField source="description" label="Description" />
        <SelectField
          source="type"
          label="Type"
          choices={[
            { id: 'CREDIT', name: 'Crédit' },
            { id: 'DEBIT', name: 'Débit' },
          ]}
        />
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
