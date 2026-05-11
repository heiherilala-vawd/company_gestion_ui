import { Create, SimpleForm } from 'react-admin'
import TravelPeopleForm from './TravelPeopleForm.tsx'

export default function TravelPeopleCreate() {
  return (
    <Create redirect="list">
      <SimpleForm>
        <TravelPeopleForm isCreate />
      </SimpleForm>
    </Create>
  )
}
