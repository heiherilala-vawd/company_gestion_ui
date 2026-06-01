import { Create, SimpleForm } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import MaintenanceForm from './MaintenanceForm'

export default function MaintenanceCreate() {
  return (
    <Create redirect="list">
      <SimpleForm id="maintenance-create-form" toolbar={<FormToolbar />}>
        <MaintenanceForm isCreate />
      </SimpleForm>
    </Create>
  )
}
