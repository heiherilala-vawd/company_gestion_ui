import { Edit, SimpleForm, TextInput } from 'react-admin'
import EquipmentForm from './EquipmentForm'

export default function EquipmentEdit() {
  return (
    <Edit
      transform={(data) => ({
        ...data,
        warehouse_id: data.warehouse?.id,
        warehouse: undefined,
      })}
    >
      <SimpleForm>
        <TextInput source="id" readOnly />
        <EquipmentForm />
      </SimpleForm>
    </Edit>
  )
}
