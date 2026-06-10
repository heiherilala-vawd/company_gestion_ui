import { SimpleForm } from 'react-admin'
import FormToolbar from '../../../../generic/FormToolbar'
import TravelPeopleForm from './TravelPeopleForm.tsx'
import GenericCreate from '../../../../generic/GenericCreate'

export default function TravelPeopleCreate() {
  return (
    <GenericCreate>
      <SimpleForm id="travel-people-create-form" toolbar={<FormToolbar />}>
        <TravelPeopleForm isCreate />
      </SimpleForm>
    </GenericCreate>
  )
}
