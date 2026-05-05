import { Create, SimpleForm } from 'react-admin'
import EquipmentForm from './EquipmentForm'

export default function EquipmentCreate() {
  return (
    <Create
      transform={(data) => ({
        ...data,
        warehouse_id: data.warehouse?.id,
        warehouse: undefined,
      })}
    >
      <SimpleForm>
        <EquipmentForm isCreate />
      </SimpleForm>
    </Create>
  )
}
