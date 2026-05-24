import {
  Show,
  SimpleShowLayout,
  TextField,
  NumberField,
  DateField,
  SelectField,
  FunctionField,
} from 'react-admin'

export default function LoanShow() {
  return (
    <Show title="Détails prêt">
      <SimpleShowLayout>
        <TextField source="id" />
        <TextField source="lender" label="Prêteur" />
        <NumberField source="amount" label="Montant" />
        <NumberField source="interest_rate" label="Taux d'intérêt" />
        <DateField source="start_date" label="Date début" />
        <DateField source="due_date" label="Date échéance" />
        <SelectField
          source="status"
          label="Statut"
          choices={[
            { id: 'ACTIVE', name: 'Actif' },
            { id: 'PAID', name: 'Payé' },
            { id: 'DEFAULTED', name: 'Défaut' },
          ]}
        />
        <TextField source="description" label="Description" />
        <NumberField source="remaining_amount" label="Reste dû" />
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
