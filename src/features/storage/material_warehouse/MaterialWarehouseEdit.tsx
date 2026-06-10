import { SimpleForm, TextInput } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import MaterialWarehouseForm from './MaterialWarehouseForm'
import GenericEdit from '../../../generic/GenericEdit'

export default function MaterialWarehouseEdit() {
  return (
    <GenericEdit
      queryOptions={{
        select: (data) => ({
          ...data,
          warehouse_id: data.warehouse?.id,
        }),
      }}
    >
      <SimpleForm id="material-warehouse-edit-form" toolbar={<FormToolbar />}>
        <TextInput source="id" sx={{ display: 'none' }} />
        <MaterialWarehouseForm />
      </SimpleForm>
    </GenericEdit>
  )
}
