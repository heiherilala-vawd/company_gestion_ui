import { Edit, SimpleForm, TextInput } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import MaterialWarehouseForm from './MaterialWarehouseForm'

export default function MaterialWarehouseEdit() {
  return (
    <Edit redirect="list">
      <SimpleForm toolbar={<FormToolbar />}>
        <TextInput source="id" sx={{ display: 'none' }} />
        <MaterialWarehouseForm />
      </SimpleForm>
    </Edit>
  )
}
