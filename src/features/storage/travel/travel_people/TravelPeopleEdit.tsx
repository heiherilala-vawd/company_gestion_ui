import { Edit, SimpleForm, TextInput } from 'react-admin'

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
        <TextInput source="travel.id" label="id deplacement" />
        <TextInput source="person_name" label="Nom de la personne" />
        <TextInput source="comment" label="Commentaire" multiline />
      </SimpleForm>
    </Edit>
  )
}
