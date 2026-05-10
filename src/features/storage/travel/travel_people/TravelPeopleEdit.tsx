import { Edit, SimpleForm, TextInput } from 'react-admin'
import TravelPeopleForm from './TravelPeopleForm.tsx'

export default function TravelPeopleEdit() {
  return (
    <Edit>
      <SimpleForm>
        <TextInput source="id" readOnly />
        <TravelPeopleForm />
      </SimpleForm>
    </Edit>
  )
}
