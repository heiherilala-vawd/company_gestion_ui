import { SimpleForm, TextInput } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import EquipmentForm from './EquipmentForm'
import GenericEdit from '../../../generic/GenericEdit'

export default function EquipmentEdit() {
  return (
    <GenericEdit
      queryOptions={{
        // Intercepter et modifier les données après le fetch
        select: (data) => ({
          ...data,
          warehouse_id: data.warehouse?.id,
        }),
      }}
    >
      <SimpleForm id="equipment-edit-form" toolbar={<FormToolbar />}>
        <TextInput source="id" sx={{ display: 'none' }} />
        <EquipmentForm />
      </SimpleForm>
    </GenericEdit>
  )
}
