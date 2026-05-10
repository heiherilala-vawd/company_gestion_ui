import { Create, SimpleForm } from 'react-admin'
import TravelMaterialForm from './TravelMaterialForm.tsx'

export default function TravelMaterialCreate() {
  return (
    <Create transform={(data) => ({ ...data, material: data.material_id })}>
      <SimpleForm>
        <TravelMaterialForm isCreate />
      </SimpleForm>
    </Create>
  )
}
