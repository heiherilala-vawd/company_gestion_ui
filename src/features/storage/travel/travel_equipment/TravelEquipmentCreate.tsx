import { Create, SimpleForm } from 'react-admin'
import TravelEquipmentForm from './TravelEquipmentForm.tsx'

export default function TravelEquipmentCreate() {
  return (
    <Create>
      <SimpleForm>
        <TravelEquipmentForm isCreate />
      </SimpleForm>
    </Create>
  )
}
