import { Edit, SimpleForm, TextInput } from 'react-admin'
import FormToolbar from '../../../../generic/FormToolbar'
import TravelEquipmentForm from './TravelEquipmentForm.tsx'

export default function TravelEquipmentEdit() {
  return (
    <Edit
      redirect="list"
      transform={(data) => ({
        ...data,
        travel: undefined,
      })}
      queryOptions={{
        // Intercepter et modifier les données après le fetch
        select: (data) => ({
          ...data,
          travel_id: data.travel?.id,
          equipment: data.equipment?.id,
          arrival_location: data.arrival_location?.id,
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
