import {
  DateField,
  FunctionField,
  Show,
  SimpleShowLayout,
  TextField,
  NumberField,
} from 'react-admin'

export default function CashAccountShow() {
  return (
    <Show title="Détails compte caisse">
      <SimpleShowLayout>
        <TextField source="id" />
        <TextField source="name" label="Nom" />
        <NumberField source="balance" label="Solde" />
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
