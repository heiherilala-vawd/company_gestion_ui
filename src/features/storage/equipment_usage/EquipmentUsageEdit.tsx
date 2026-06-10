import { SimpleForm, TextInput } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import EquipmentUsageForm from './EquipmentUsageForm'
import GenericEdit from '../../../generic/GenericEdit'

export default function EquipmentUsageEdit() {
  return (
    <GenericEdit>
      <SimpleForm id="equipment-usage-edit-form" toolbar={<FormToolbar />}>
        <TextInput source="id" sx={{ display: 'none' }} />
        <EquipmentUsageForm />
      </SimpleForm>
    </GenericEdit>
  )
}
