import {
  DateField,
  FunctionField,
  Show,
  SimpleShowLayout,
  TextField,
  NumberField,
} from 'react-admin'

export default function MaterialConsumptionShow() {
  return (
    <Show title="Détails consommation matériau">
      <SimpleShowLayout>
        <TextField source="id" />
        <TextField source="material_id" label="Matériau" />
        <TextField source="warehouse_id" label="Entrepôt" />
        <NumberField source="quantity" label="Quantité" />
        <TextField source="consumption_date" label="Date consommation" />
        <TextField source="job_id" label="Travail" />
        <TextField source="reason" label="Raison" />
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
