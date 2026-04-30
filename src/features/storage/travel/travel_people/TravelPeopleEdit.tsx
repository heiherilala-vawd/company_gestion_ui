import { Edit, SimpleForm, TextInput, SelectInput } from 'react-admin'
import ReferenceSelectWithCreate from '../../../../generic/ReferenceSelectWithCreate'

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
        <ReferenceSelectWithCreate
          source="travel_id"
          reference="travel_expenses"
          label="Voyage"
          optionText="title"
        />
        <TextInput source="person_name" label="Nom de la personne" />
        <TextInput source="comment" label="Commentaire" multiline />
      </SimpleForm>
    </Edit>
  )
}
