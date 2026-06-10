import { SimpleForm } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import EquipmentForm from './EquipmentForm'
import GenericCreate from '../../../generic/GenericCreate'

export default function EquipmentCreate() {
  return (
    <GenericCreate>
      <SimpleForm
        id="equipment-create-form"
        toolbar={<FormToolbar />}
        defaultValues={{ purchase_date: new Date() }}
      >
        <EquipmentForm isCreate />
      </SimpleForm>
    </GenericCreate>
  )
}
