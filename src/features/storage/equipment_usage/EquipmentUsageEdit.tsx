import { Edit, SimpleForm, TextInput } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import EquipmentUsageForm from './EquipmentUsageForm'

export default function EquipmentUsageEdit() {
  return (
    <Edit redirect="list">
      <SimpleForm id="equipment-usage-edit-form" toolbar={<FormToolbar />}>
        <TextInput source="id" sx={{ display: 'none' }} />
        <EquipmentUsageForm />
      </SimpleForm>
    </Edit>
  )
}
