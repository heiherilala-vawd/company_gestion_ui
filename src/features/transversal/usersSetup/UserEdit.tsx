import { Edit, SimpleForm, TextInput } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import UserForm from './UserForm.tsx'

// ⚠️ Ajouter 'export default'
export default function UserEdit() {
  return (
    <Edit redirect="list">
      <SimpleForm id="user-edit-form" toolbar={<FormToolbar />}>
        <TextInput source="id" sx={{ display: 'none' }} />
        <UserForm />
      </SimpleForm>
    </Edit>
  )
}
