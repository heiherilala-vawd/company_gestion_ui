import { Edit, SimpleForm, TextInput } from 'react-admin'
import UserForm from './UserForm.tsx'

// ⚠️ Ajouter 'export default'
export default function UserEdit() {
  return (
    <Edit>
      <SimpleForm>
        <TextInput source="id" readOnly />
        <UserForm />
      </SimpleForm>
    </Edit>
  )
}
