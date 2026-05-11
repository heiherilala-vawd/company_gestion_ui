import { Edit, SimpleForm, TextInput } from 'react-admin'
import EquipmentForm from './EquipmentForm'

export default function EquipmentEdit() {
  return (
    <Edit
      redirect="list"
      queryOptions={{
        // Intercepter et modifier les données après le fetch
        select: (data) => ({
          ...data,
          warehouse_id: data.warehouse.id,
        }),
      }}
    >
      <SimpleForm>
        <TextInput source="id" sx={{ display: 'none' }} />
        <EquipmentForm />
      </SimpleForm>
    </Edit>
  )
}
