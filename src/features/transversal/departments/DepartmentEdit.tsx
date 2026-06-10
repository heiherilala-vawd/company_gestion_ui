import { SimpleForm, TextInput } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import DepartmentForm from './DepartmentForm'
import GenericEdit from '../../../generic/GenericEdit'

export default function DepartmentEdit() {
  return (
    <GenericEdit>
      <SimpleForm id="department-edit-form" toolbar={<FormToolbar />}>
        <TextInput source="id" sx={{ display: 'none' }} />
        <DepartmentForm />
      </SimpleForm>
    </GenericEdit>
  )
}
