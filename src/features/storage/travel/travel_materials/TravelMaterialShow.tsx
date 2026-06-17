import {
  Show,
  SimpleShowLayout,
  TextField,
  NumberField,
  DateField,
  FunctionField,
  ArrayField,
  Datagrid,
} from 'react-admin'

export default function TravelMaterialShow() {
  return (
    <Show title="Détails matériau de déplacement">
      <SimpleShowLayout>
        <TextField source="id" />

        <TextField source="material.name" label="Matériau" />
        <NumberField source="quantity" label="Quantité" />
        <NumberField source="quantity_received" label="Quantité reçue" />
        <ArrayField source="arrival_logs" label="Historique des réceptions">
          <Datagrid bulkActionButtons={false}>
            <DateField source="arrival_date" label="Date d'arrivée" />
            <TextField source="arrival_location.name" label="Lieu d'arrivée" />
            <NumberField source="quantity_received" label="Qté reçue" />
            <NumberField source="quantity_lost" label="Qté perdue" />
          </Datagrid>
        </ArrayField>
        <SimpleShowLayout>
          <FunctionField label="Déplacement id" render={(record) => `${record.travel?.id || ''}`} />
          <FunctionField
            label="Déplacement"
            render={(record) =>
              `${record.travel?.departure_location.name || ''} → ${record.travel?.arrival_location.name || ''}`
            }
          />
          <DateField source="travel.departure_date" label="Date de départ transport" />
          <DateField source="travel.arrival_date" label="Date d'arivé transport" />
        </SimpleShowLayout>
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
        <TextField source="comment" label="Commentaire" />
      </SimpleShowLayout>
    </Show>
  )
}
