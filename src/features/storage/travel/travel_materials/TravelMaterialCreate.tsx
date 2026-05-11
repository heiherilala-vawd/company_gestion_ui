import { Create, SimpleForm } from 'react-admin'
import TravelMaterialForm from './TravelMaterialForm.tsx'

export default function TravelMaterialCreate() {
  return (
    <Create redirect="list">
      <SimpleForm>
        <TravelMaterialForm isCreate />
      </SimpleForm>
    </Create>
  )
}
