import { Edit, SimpleForm, TextInput } from 'react-admin'
import FormToolbar from '../../../../generic/FormToolbar'
import TravelMaterialForm from './TravelMaterialForm.tsx'

export default function TravelMaterialEdit() {
  return (
    <Edit
      redirect="list"
      transform={(data) => ({
        ...data,
        travel: undefined,
      })}
      queryOptions={{
        select: (data) => ({
          ...data,
          travel_id: data.travel?.id,
          material: data.material?.id,
          arrival_location: data.arrival_location?.id,
        }),
      }}
    >
      <SimpleForm toolbar={<FormToolbar />}>
        <TextInput source="id" sx={{ display: 'none' }} />
        <TravelMaterialForm />
      </SimpleForm>
    </Edit>
  )
}
