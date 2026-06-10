import { SimpleForm } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import WarehouseForm from './WarehouseForm'
import GenericCreate from '../../../generic/GenericCreate'

export default function WarehouseCreate() {
  return (
    <GenericCreate
      transform={(data) => ({
        ...data,
        job_id: localStorage.getItem('currentJobId'),
      })}
    >
      <SimpleForm id="warehouse-create-form" toolbar={<FormToolbar />}>
        <WarehouseForm isCreate />
      </SimpleForm>
    </GenericCreate>
  )
}
