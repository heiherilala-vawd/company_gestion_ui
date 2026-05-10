import {
  Show,
  SimpleShowLayout,
  TextField,
  NumberField,
  DateField,
  FunctionField,
} from 'react-admin'

export default function EquipmentShow() {
  return (
    <Show title="Détails équipement">
      <SimpleShowLayout>
        <TextField source="id" />
        <TextField source="name" label="Nom" />
        <TextField source="description" label="Description" />
        <TextField source="warehouse.name" label="ID Entrepôt" />
        <NumberField source="floor_number" label="Étage" />
        <NumberField source="storage_number" label="Emplacement" />
        <TextField source="comment" label="Commentaire" />
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
