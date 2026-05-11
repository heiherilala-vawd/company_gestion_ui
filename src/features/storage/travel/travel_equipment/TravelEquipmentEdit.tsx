import { Edit, SimpleForm, TextInput } from 'react-admin'
import TravelEquipmentForm from './TravelEquipmentForm.tsx'

export default function TravelEquipmentEdit() {
  return (
    <Edit
      redirect="list"
      queryOptions={{
        // Intercepter et modifier les données après le fetch
        select: (data) => ({
          ...data,
          travel_id: data.travel.id,
          equipment: data.equipment.id,
        }),
      }}
    >
      <SimpleForm>
        <TextInput source="id" sx={{ display: 'none' }} />
        <TravelEquipmentForm />
      </SimpleForm>
    </Edit>
  )
}
