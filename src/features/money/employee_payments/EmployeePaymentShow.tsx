import {
  Show,
  SimpleShowLayout,
  TextField,
  SelectField,
  DateField,
  FunctionField,
} from 'react-admin'

export default function EmployeePaymentShow() {
  return (
    <Show title="Détails paiement employé">
      <SimpleShowLayout>
        <TextField source="id" />
        <TextField source="expense.amount" label="Pris dépense" />
        <TextField source="expense.comment" label="Commentaire" />
        <TextField source="expense.job_id" label="Id travail" />
        <TextField source="employee.first_name" label="Nom persone" />
        <TextField source="employee.last_name" label="Prénomm persone" />
        <TextField source="payment_description" label="Description" />
        <SelectField
          source="payment_type"
          label="Type"
          choices={[
            { id: 'ADVANCE', name: 'Acompte' },
            { id: 'MONTHLY', name: 'Mensuel' },
            { id: 'OTHER', name: 'Autre' },
          ]}
        />
        <DateField source="created_at" label="Créé le" showTime />
        <DateField source="updated_at" label="Modifié le" showTime />
        {/* Nom complet du créateur */}
        <FunctionField
          label="Créé par"
          render={(record) => (
            <span>
              {record.created_by?.first_name} {record.created_by?.last_name}
            </span>
          )}
        />

        {/* Nom complet du modificateur */}
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
