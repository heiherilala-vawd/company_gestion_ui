import { SimpleForm } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import MaintenanceScheduleForm from './MaintenanceScheduleForm'
import GenericCreate from '../../../generic/GenericCreate'

export default function MaintenanceScheduleCreate() {
  return (
    <GenericCreate>
      <SimpleForm id="maintenance-schedule-create-form" toolbar={<FormToolbar />}>
        <MaintenanceScheduleForm isCreate />
      </SimpleForm>
    </GenericCreate>
  )
}
