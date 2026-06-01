import { Edit, SimpleForm, TextInput } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import MaintenanceForm from './MaintenanceForm'

export default function MaintenanceEdit() {
  return (
    <Edit redirect="list">
      <SimpleForm id="maintenance-edit-form" toolbar={<FormToolbar />}>
        <TextInput source="id" sx={{ display: 'none' }} />
        <MaintenanceForm />
      </SimpleForm>
    </Edit>
  )
}
