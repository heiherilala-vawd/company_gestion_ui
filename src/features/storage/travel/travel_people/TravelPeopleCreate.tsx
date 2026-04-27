import { Create, SimpleForm, TextInput, ReferenceInput, SelectInput } from 'react-admin'

export default function TravelPeopleCreate() {
  return (
    <Create>
      <SimpleForm>
        <ReferenceInput source="travel_id" label="Voyage" reference="travel_expenses">
          <SelectInput optionText="title" />
        </ReferenceInput>
        <TextInput source="person_name" label="Nom de la personne" />
        <TextInput source="comment" label="Commentaire" multiline />
      </SimpleForm>
    </Create>
  )
}
