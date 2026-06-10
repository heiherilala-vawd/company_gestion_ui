import { SimpleForm, TextInput } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import MaintenanceScheduleForm from './MaintenanceScheduleForm'
import GenericEdit from '../../../generic/GenericEdit'

export default function MaintenanceScheduleEdit() {
  return (
    <GenericEdit>
      <SimpleForm id="maintenance-schedule-edit-form" toolbar={<FormToolbar />}>
        <TextInput source="id" sx={{ display: 'none' }} />
        <MaintenanceScheduleForm />
      </SimpleForm>
    </GenericEdit>
  )
}
