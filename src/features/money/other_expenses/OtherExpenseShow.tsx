import { DateField, FunctionField, Show, SimpleShowLayout, TextField } from 'react-admin'

export default function OtherExpenseShow() {
  return (
    <Show title="Détails autre dépense">
      <SimpleShowLayout>
        <TextField source="id" />
        <TextField source="expense.amount" label="Montant" />
        <TextField source="expense.comment" label="Commentaire" />
        <TextField source="expense.job_id" label="Id travail" />
        <TextField source="description" label="Description" />
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
