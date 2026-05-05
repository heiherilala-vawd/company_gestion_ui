import {
  Show,
  SimpleShowLayout,
  TextField,
  NumberField,
  SelectField,
  DateField,
  FunctionField,
} from 'react-admin'

export default function TravelEquipmentShow() {
  return (
    <Show>
      <SimpleShowLayout>
        <TextField source="id" />
        <TextField source="equipment.name" label="Équipement" />
        <NumberField source="quantity" label="Quantité" />
        <TextField source="arrival_location.name" label="Lieu d'arivé" />
        <DateField source="arrival_date" label="Date d'arivé" />
        <SelectField
          source="status"
          label="Statut"
          choices={[
            { id: 'IN_PROGRESS', name: 'En cours' },
            { id: 'LOST', name: 'Perdu' },
            { id: 'ARRIVED', name: 'Arrivé' },
          ]}
        />
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
