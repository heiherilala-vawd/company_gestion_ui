import { Edit, SimpleForm, TextInput } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import DepartmentForm from './DepartmentForm'

export default function DepartmentEdit() {
  return (
    <Edit redirect="list">
      <SimpleForm id="department-edit-form" toolbar={<FormToolbar />}>
        <TextInput source="id" sx={{ display: 'none' }} />
        <DepartmentForm />
      </SimpleForm>
    </Edit>
  )
}
