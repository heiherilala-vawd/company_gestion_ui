import { Edit, SimpleForm, TextInput, ReferenceInput, SelectInput } from 'react-admin'

export default function TravelPeopleEdit() {
  return (
    <Edit
      transform={(data) => ({
        ...data,
        travel_id: data.travel?.id,
        travel: undefined,
      })}
    >
      <SimpleForm>
        <TextInput source="id" disabled />
        <ReferenceInput source="travel_id" reference="travel_expenses">
          <SelectInput optionText="title" />
        </ReferenceInput>
        <TextInput source="person_name" label="Nom de la personne" />
        <TextInput source="comment" label="Commentaire" multiline />
      </SimpleForm>
    </Edit>
  )
}
