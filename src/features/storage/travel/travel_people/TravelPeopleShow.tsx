import { Show, SimpleShowLayout, TextField, DateField, FunctionField } from 'react-admin'

export default function TravelPeopleShow() {
  return (
    <Show title="Détails personne de déplacement">
      <SimpleShowLayout>
        <TextField source="id" />

        <TextField source="arrival_location.name" label="Lieu d'arivé" />
        <DateField source="arrival_date" label="Date d'arivé" />
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
        <TextField source="user.id" label="Id de la personne" />
        <FunctionField
          label="Nom de la personne"
          render={(record) => (
            <span>
              {record.user?.first_name} {record.user?.last_name}
            </span>
          )}
        />

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
