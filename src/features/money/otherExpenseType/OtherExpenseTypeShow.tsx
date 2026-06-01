import { DateField, FunctionField, Show, SimpleShowLayout, TextField } from 'react-admin'

export default function OtherExpenseTypeShow() {
  return (
    <Show title="Détails type d'autre dépense">
      <SimpleShowLayout>
        <TextField source="id" />
        <TextField source="name" label="Nom" />
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
