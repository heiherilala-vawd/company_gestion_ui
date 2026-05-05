import { Edit, SimpleForm, TextInput } from 'react-admin'
import TravelPeopleForm from './TravelPeopleForm.tsx'

export default function TravelPeopleEdit() {
  return (
    <Edit
      transform={(data) => ({
        ...data,
        travel_id: data.travel?.id,
        travel: undefined,
        user_id: data.user?.id,
        user: undefined,
      })}
    >
      <SimpleForm>
        <TextInput source="id" readOnly />
        <TravelPeopleForm />
      </SimpleForm>
    </Edit>
  )
}
