import { Create, SimpleForm } from 'react-admin'
import FormToolbar from '../../../../generic/FormToolbar'
import TravelEquipmentForm from './TravelEquipmentForm.tsx'

export default function TravelEquipmentCreate() {
  return (
    <Create redirect="list">
      <SimpleForm id="travel-equipment-create-form" toolbar={<FormToolbar />}>
        <TravelEquipmentForm isCreate />
      </SimpleForm>
    </Create>
  )
}
