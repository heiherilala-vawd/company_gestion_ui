import { Edit, SimpleForm, TextInput } from 'react-admin'
import WarehouseForm from './WarehouseForm'

export default function WarehouseEdit() {
  return (
    <Edit
      transform={(data) => ({
        ...data,
        job_id: data.job?.id,
        job: undefined,
      })}
    >
      <SimpleForm>
        <TextInput source="id" readOnly />
        <WarehouseForm />
      </SimpleForm>
    </Edit>
  )
}
