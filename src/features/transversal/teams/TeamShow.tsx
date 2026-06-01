import {
  DateField,
  FunctionField,
  Show,
  SimpleShowLayout,
  TextField,
  ArrayField,
  Datagrid,
} from 'react-admin'

export default function TeamShow() {
  return (
    <Show title="Détails équipe">
      <SimpleShowLayout>
        <TextField source="id" />
        <TextField source="name" label="Nom" />
        <TextField source="leader.first_name" label="Responsable prénom" />
        <TextField source="leader.last_name" label="Responsable nom" />
        <ArrayField source="members" label="Membres">
          <Datagrid bulkActionButtons={false}>
            <TextField source="first_name" label="Prénom" />
            <TextField source="last_name" label="Nom" />
            <TextField source="email" label="Email" />
          </Datagrid>
        </ArrayField>
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
