import { Create, SimpleForm } from 'react-admin'
import WarehouseForm from './WarehouseForm'

export default function WarehouseCreate() {
  return (
    <Create
      transform={(data) => ({
        ...data,
        job_id: localStorage.getItem('currentJobId'),
      })}
    >
      <SimpleForm>
        <WarehouseForm isCreate />
      </SimpleForm>
    </Create>
  )
}
