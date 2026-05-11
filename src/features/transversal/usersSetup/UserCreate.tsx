import { Create, SimpleForm } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import UserForm from './UserForm.tsx'

// ⚠️ Ajouter 'export default'
export default function UserCreate() {
  return (
    <Create redirect="list">
      <SimpleForm toolbar={<FormToolbar />}>
        <UserForm isCreate />
      </SimpleForm>
    </Create>
  )
}
