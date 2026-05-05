import { Edit, SimpleForm, TextInput } from 'react-admin'
import TravelEquipmentForm from './TravelEquipmentForm.tsx'

export default function TravelEquipmentEdit() {
  return (
    <Edit
      transform={(data) => ({
        ...data,
        travel_id: data.travel?.id,
        travel: undefined,
        equipment: data.equipment?.id,
      })}
    >
      <SimpleForm>
        <TextInput source="id" readOnly />
        <TravelEquipmentForm />
      </SimpleForm>
    </Edit>
  )
}
