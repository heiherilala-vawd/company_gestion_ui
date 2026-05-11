import { Create, SimpleForm } from 'react-admin'
import TravelEquipmentForm from './TravelEquipmentForm.tsx'

export default function TravelEquipmentCreate() {
  return (
    <Create redirect="list" transform={(data) => ({ ...data, equipment: data.equipment_id })}>
      <SimpleForm>
        <TravelEquipmentForm isCreate />
      </SimpleForm>
    </Create>
  )
}
