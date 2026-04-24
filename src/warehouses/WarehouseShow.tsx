import {
  Show,
  SimpleShowLayout,
  TextField,
  DateField,
  FunctionField,
} from 'react-admin'

export default function WarehouseShow() {
  return (
    <Show>
      <SimpleShowLayout>
        <TextField source="id" />
        <TextField source="name" label="Nom" />
        <TextField source="description" label="Description" />
        <TextField source="job.description" label="ID Chantier" />
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
        <DateField source="created_at" label="Créé le" showTime />
        <DateField source="updated_at" label="Modifié le" showTime />
      </SimpleShowLayout>
    </Show>
  )
}
