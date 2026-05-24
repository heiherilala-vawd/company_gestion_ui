import { Create, SimpleForm } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import EquipmentUsageForm from './EquipmentUsageForm'

export default function EquipmentUsageCreate() {
  return (
    <Create redirect="list">
      <SimpleForm toolbar={<FormToolbar />}>
        <EquipmentUsageForm isCreate />
      </SimpleForm>
    </Create>
  )
}
