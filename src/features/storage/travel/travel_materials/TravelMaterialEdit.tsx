import { Edit, SimpleForm, TextInput } from 'react-admin'
import TravelMaterialForm from './TravelMaterialForm.tsx'

export default function TravelMaterialEdit() {
  return (
    <Edit transform={(data) => ({ ...data, material: data.material_id })}>
      <SimpleForm>
        <TextInput source="id" readOnly />
        <TravelMaterialForm />
      </SimpleForm>
    </Edit>
  )
}
