import { Create, SimpleForm } from 'react-admin'
import WarehouseForm from './WarehouseForm'

export default function WarehouseCreate() {
  return (
    <Create>
      <SimpleForm>
        <WarehouseForm isCreate />
      </SimpleForm>
    </Create>
  )
}
