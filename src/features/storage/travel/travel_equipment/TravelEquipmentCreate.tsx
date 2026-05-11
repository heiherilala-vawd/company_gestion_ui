import { Create, SimpleForm } from 'react-admin'
import FormToolbar from '../../../../generic/FormToolbar'
import TravelEquipmentForm from './TravelEquipmentForm.tsx'

export default function TravelEquipmentCreate() {
  return (
    <Create redirect="list" transform={(data) => ({ ...data, equipment: data.equipment_id })}>
      <SimpleForm toolbar={<FormToolbar />}>
        <TravelEquipmentForm isCreate />
      </SimpleForm>
    </Create>
  )
}
