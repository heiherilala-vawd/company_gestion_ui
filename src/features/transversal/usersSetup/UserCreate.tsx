import { Create, SimpleForm } from 'react-admin'
import UserForm from './UserForm.tsx'

// ⚠️ Ajouter 'export default'
export default function UserCreate() {
  return (
    <Create>
      <SimpleForm>
        <UserForm isCreate />
      </SimpleForm>
    </Create>
  )
}
