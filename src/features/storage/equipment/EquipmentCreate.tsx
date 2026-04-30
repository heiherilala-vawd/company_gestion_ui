import { Create, SimpleForm } from 'react-admin'
import EquipmentForm from './EquipmentForm'

export default function EquipmentCreate() {
  return (
    <Create>
      <SimpleForm>
        <EquipmentForm isCreate />
      </SimpleForm>
    </Create>
  )
}
