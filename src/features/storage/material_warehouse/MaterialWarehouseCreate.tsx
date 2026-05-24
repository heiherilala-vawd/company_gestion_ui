import { Create, SimpleForm } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import MaterialWarehouseForm from './MaterialWarehouseForm'

export default function MaterialWarehouseCreate() {
  return (
    <Create redirect="list">
      <SimpleForm toolbar={<FormToolbar />}>
        <MaterialWarehouseForm isCreate />
      </SimpleForm>
    </Create>
  )
}
