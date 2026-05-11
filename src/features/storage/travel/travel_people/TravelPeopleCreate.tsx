import { Create, SimpleForm } from 'react-admin'
import FormToolbar from '../../../../generic/FormToolbar'
import TravelPeopleForm from './TravelPeopleForm.tsx'

export default function TravelPeopleCreate() {
  return (
    <Create redirect="list">
      <SimpleForm toolbar={<FormToolbar />}>
        <TravelPeopleForm isCreate />
      </SimpleForm>
    </Create>
  )
}
