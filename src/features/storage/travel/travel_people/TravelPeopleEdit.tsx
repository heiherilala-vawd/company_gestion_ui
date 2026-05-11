import { Edit, SimpleForm, TextInput } from 'react-admin'
import FormToolbar from '../../../../generic/FormToolbar'
import TravelPeopleForm from './TravelPeopleForm.tsx'

export default function TravelPeopleEdit() {
  return (
    <Edit
      redirect="list"
      queryOptions={{
        // Intercepter et modifier les données après le fetch
        select: (data) => ({
          ...data,
          travel_id: data.travel.id,
          user_id: data.user.id,
        }),
      }}
    >
      <SimpleForm toolbar={<FormToolbar />}>
        <TextInput source="id" sx={{ display: 'none' }} />
        <TravelPeopleForm />
      </SimpleForm>
    </Edit>
  )
}
