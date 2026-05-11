import { Create, SimpleForm } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import WarehouseForm from './WarehouseForm'

export default function WarehouseCreate() {
  return (
    <Create
      redirect="list"
      transform={(data) => ({
        ...data,
        job_id: localStorage.getItem('currentJobId'),
      })}
    >
      <SimpleForm toolbar={<FormToolbar />}>
        <WarehouseForm isCreate />
      </SimpleForm>
    </Create>
  )
}
