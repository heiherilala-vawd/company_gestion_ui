import { Show, SimpleShowLayout, TextField, DateField, FunctionField } from 'react-admin'

export default function TravelPeopleShow() {
  return (
    <Show>
      <SimpleShowLayout>
        <TextField source="id" />
        <TextField source="travel.departure_location" label="Lieu de départ" />
        <TextField source="travel.arrival_location" label="Lieu d'arivé" />
        <DateField source="travel.departure_date" label="Date de départ" />
        <DateField source="travel.arrival_date" label="Date d'arivé" />
        <TextField source="person_name" label="Nom" />
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
