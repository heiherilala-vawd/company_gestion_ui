import { Edit, SimpleForm, TextInput } from 'react-admin'
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
      <SimpleForm>
        <TextInput source="id" sx={{ display: 'none' }} />
        <TravelMaterialForm />
      </SimpleForm>
    </Edit>
  )
}
