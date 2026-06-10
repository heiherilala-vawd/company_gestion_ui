import { SimpleForm, TextInput } from 'react-admin'
import FormToolbar from '../../../generic/FormToolbar'
import WarehouseForm from './WarehouseForm'
import GenericEdit from '../../../generic/GenericEdit'

export default function WarehouseEdit() {
  return (
    <GenericEdit
      queryOptions={{
        // Intercepter et modifier les données après le fetch
        select: (data) => ({
          ...data,
          job_id: data.job?.id,
        }),
      }}
    >
      <SimpleForm id="warehouse-edit-form" toolbar={<FormToolbar />}>
        <TextInput source="id" sx={{ display: 'none' }} />
        <WarehouseForm />
      </SimpleForm>
    </GenericEdit>
  )
}
