import { Create, SimpleForm } from 'react-admin'
import TravelPeopleForm from './TravelPeopleForm.tsx'

export default function TravelPeopleCreate() {
  return (
    <Create
      transform={(data) => ({
        ...data,
        travel_id: data.travel?.id,
        travel: undefined,
        user_id: data.user?.id,
        user: undefined,
      })}
    >
      <SimpleForm>
        <TravelPeopleForm isCreate />
      </SimpleForm>
    </Create>
  )
}
