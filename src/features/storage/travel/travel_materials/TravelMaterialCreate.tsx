import { Create, SimpleForm } from 'react-admin'
import TravelMaterialForm from './TravelMaterialForm.tsx'

export default function TravelMaterialCreate() {
  return (
    <Create
      transform={(data) => ({
        ...data,
        travel_id: data.travel?.id,
        travel: undefined,
        material: data.material?.id,
      })}
    >
      <SimpleForm>
        <TravelMaterialForm isCreate />
      </SimpleForm>
    </Create>
  )
}
