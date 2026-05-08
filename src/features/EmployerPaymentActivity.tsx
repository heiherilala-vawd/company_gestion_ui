import { List, Datagrid, TextField, NumberField, DateField, FunctionField } from 'react-admin'

export default function EmployerPaymentActivity() {
  return (
    <List
      resource="incomes"
      filter={{ money_received: false }}
      title="Paiements en attente de réception"
    >
      <Datagrid>
        <TextField source="source_organization" label="Organisation source" />
        <TextField source="invoice_reference" label="Réf. facture" />
        <NumberField source="amount" label="Montant" />
        <TextField source="description" label="Description" />
        <TextField source="job.description" label="Chantier" />
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
      </Datagrid>
    </List>
  )
}
