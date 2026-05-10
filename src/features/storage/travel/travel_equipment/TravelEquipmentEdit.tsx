import { Edit, SimpleForm, TextInput } from 'react-admin'
import TravelEquipmentForm from './TravelEquipmentForm.tsx'

export default function TravelEquipmentEdit() {
  return (
    <Edit transform={(data) => ({ ...data, equipment: data.equipment_id })}>
      <SimpleForm>
        <TextInput source="id" readOnly />
        <TravelEquipmentForm />
      </SimpleForm>
    </Edit>
  )
}
