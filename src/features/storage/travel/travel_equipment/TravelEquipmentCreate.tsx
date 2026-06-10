import { SimpleForm } from 'react-admin'
import FormToolbar from '../../../../generic/FormToolbar'
import TravelEquipmentForm from './TravelEquipmentForm.tsx'
import GenericCreate from '../../../../generic/GenericCreate'

export default function TravelEquipmentCreate() {
  return (
    <GenericCreate>
      <SimpleForm id="travel-equipment-create-form" toolbar={<FormToolbar />}>
        <TravelEquipmentForm isCreate />
      </SimpleForm>
    </GenericCreate>
  )
}
