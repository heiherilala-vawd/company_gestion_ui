import {
  Show,
  SimpleShowLayout,
  TextField,
  NumberField,
  SelectField,
  DateField,
  BooleanField,
  FunctionField,
} from 'react-admin'

export default function EmployeePaymentShow() {
  return (
    <Show title="Détails paiement employé">
      <SimpleShowLayout>
        <TextField source="id" />
        <NumberField
          source="expense.amount"
          label="Pris dépense"
          options={{ style: 'currency', currency: 'MGA' }}
        />
        <TextField source="expense.comment" label="Commentaire" />
        <TextField source="expense.job.description" label="Travail" />
        <BooleanField source="is_for_team" label="Paiement pour équipe" />
        <FunctionField
          label="Employés"
          render={(record: any) =>
            record.users?.map((u: any) => `${u.first_name} ${u.last_name}`).join(', ') || ''
          }
        />
        <TextField source="team.name" label="Équipe" />
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
