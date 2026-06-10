import { SimpleForm } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import MaterialWarehouseForm from './MaterialWarehouseForm'
import GenericCreate from '../../../generic/GenericCreate'

export default function MaterialWarehouseCreate() {
  return (
    <GenericCreate>
      <SimpleForm id="material-warehouse-create-form" toolbar={<FormToolbar />}>
        <MaterialWarehouseForm isCreate />
      </SimpleForm>
    </GenericCreate>
  )
}
