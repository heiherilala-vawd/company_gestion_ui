import {
  DateField,
  FunctionField,
  Show,
  SimpleShowLayout,
  TextField,
  NumberField,
} from 'react-admin'

export default function MaterialWarehouseShow() {
  return (
    <Show title="Détails stock matériau">
      <SimpleShowLayout>
        <TextField source="id" />
        <FunctionField label="Matériau" render={(record) => record.material?.name || ''} />
        <FunctionField label="Entrepôt" render={(record) => record.warehouse?.name || ''} />
        <NumberField source="quantity" label="Quantité" />
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
