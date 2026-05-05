import { Edit, SimpleForm, TextInput } from 'react-admin'
import TravelMaterialForm from './TravelMaterialForm.tsx'

export default function TravelMaterialEdit() {
  return (
    <Edit
      transform={(data) => ({
        ...data,
        travel_id: data.travel?.id,
        travel: undefined,
        material: data.material?.id,
      })}
    >
      <SimpleForm>
        <TextInput source="id" readOnly />
        <TravelMaterialForm />
      </SimpleForm>
    </Edit>
  )
}
