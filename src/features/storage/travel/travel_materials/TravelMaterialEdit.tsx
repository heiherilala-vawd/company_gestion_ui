import { Edit, SimpleForm, TextInput } from 'react-admin'
import FormToolbar from '../../../../generic/FormToolbar'
import TravelMaterialForm from './TravelMaterialForm.tsx'

export default function TravelMaterialEdit() {
  return (
    <Edit
      redirect="list"
      queryOptions={{
        // Intercepter et modifier les données après le fetch
        select: (data) => ({
          ...data,
          travel_id: data.travel.id,
          material: data.material.id,
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
