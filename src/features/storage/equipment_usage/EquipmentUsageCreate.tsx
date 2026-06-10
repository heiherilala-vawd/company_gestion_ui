import { SimpleForm } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import EquipmentUsageForm from './EquipmentUsageForm'
import GenericCreate from '../../../generic/GenericCreate'

export default function EquipmentUsageCreate() {
  return (
    <GenericCreate>
      <SimpleForm
        id="equipment-usage-create-form"
        toolbar={<FormToolbar />}
        defaultValues={{ start_time: new Date(), usage_status: 'IN_USE' }}
      >
        <EquipmentUsageForm isCreate />
      </SimpleForm>
    </GenericCreate>
  )
}
