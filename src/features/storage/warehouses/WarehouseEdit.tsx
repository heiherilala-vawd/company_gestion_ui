import { Edit, SimpleForm, TextInput } from 'react-admin'
import WarehouseForm from './WarehouseForm'

export default function WarehouseEdit() {
  return (
    <Edit
      redirect="list"
      queryOptions={{
        // Intercepter et modifier les données après le fetch
        select: (data) => ({
          ...data,
          job_id: data.job.id,
        }),
      }}
    >
      <SimpleForm>
        <TextInput source="id" sx={{ display: 'none' }} />
        <WarehouseForm />
      </SimpleForm>
    </Edit>
  )
}
