import { SimpleForm, TextInput } from 'react-admin'
import FormToolbar from '../../../../generic/FormToolbar'
import TravelPeopleForm from './TravelPeopleForm.tsx'
import GenericEdit from '../../../../generic/GenericEdit'

export default function TravelPeopleEdit() {
  return (
    <GenericEdit
      transform={(data) => ({
        ...data,
        travel: undefined,
      })}
      queryOptions={{
        // Intercepter et modifier les données après le fetch
        select: (data) => ({
          ...data,
          travel_id: data.travel?.id,
          user_id: data.user?.id,
        }),
      }}
    >
      <SimpleForm id="travel-people-edit-form" toolbar={<FormToolbar />}>
        <TextInput source="id" sx={{ display: 'none' }} />
        <TravelPeopleForm />
      </SimpleForm>
    </GenericEdit>
  )
}
