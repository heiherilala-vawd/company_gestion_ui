import { Create, SimpleForm } from 'react-admin'
import EquipmentForm from './EquipmentForm'

export default function EquipmentCreate() {
  return (
    <Create redirect="list">
      <SimpleForm>
        <EquipmentForm isCreate />
      </SimpleForm>
    </Create>
  )
}
