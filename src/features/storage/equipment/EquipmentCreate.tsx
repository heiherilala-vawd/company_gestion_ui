import { Create, SimpleForm } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import EquipmentForm from './EquipmentForm'

export default function EquipmentCreate() {
  return (
    <Create redirect="list">
      <SimpleForm id="equipment-create-form" toolbar={<FormToolbar />}>
        <EquipmentForm isCreate />
      </SimpleForm>
    </Create>
  )
}
