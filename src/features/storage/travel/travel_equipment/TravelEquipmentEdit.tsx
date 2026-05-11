import { Edit, SimpleForm, TextInput } from 'react-admin'
import FormToolbar from '../../../../generic/FormToolbar'
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
      <SimpleForm toolbar={<FormToolbar />}>
        <TextInput source="id" sx={{ display: 'none' }} />
        <TravelEquipmentForm />
      </SimpleForm>
    </Edit>
  )
}
