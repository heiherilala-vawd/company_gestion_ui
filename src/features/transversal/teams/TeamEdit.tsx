import { Edit, SimpleForm, TextInput } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import TeamForm from './TeamForm'

export default function TeamEdit() {
  return (
    <Edit redirect="list">
      <SimpleForm id="team-edit-form" toolbar={<FormToolbar />}>
        <TextInput source="id" sx={{ display: 'none' }} />
        <TeamForm />
      </SimpleForm>
    </Edit>
  )
}
