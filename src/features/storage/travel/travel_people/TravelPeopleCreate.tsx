import { Create, SimpleForm, TextInput, SelectInput } from 'react-admin'
import ReferenceSelectWithCreate from '../../../../generic/ReferenceSelectWithCreate'

export default function TravelPeopleCreate() {
  return (
    <Create>
      <SimpleForm>
        <ReferenceSelectWithCreate
          source="travel_id"
          reference="travel_expenses"
          label="Voyage"
          optionText="title"
          fields={[
            { source: 'expense_id', label: 'Dépense', type: 'select', required: true },
            { source: 'departure_location', label: 'Lieu de départ' },
            { source: 'arrival_location', label: "Lieu d'arrivée" },
          ]}
        />
        <TextInput source="person_name" label="Nom de la personne" />
        <TextInput source="comment" label="Commentaire" multiline />
      </SimpleForm>
    </Create>
  )
}
