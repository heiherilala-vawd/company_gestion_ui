import { Create, SimpleForm } from 'react-admin'
import FormToolbar from '../../../../generic/FormToolbar'
import TravelMaterialForm from './TravelMaterialForm.tsx'

export default function TravelMaterialCreate() {
  return (
    <Create redirect="list">
      <SimpleForm id="travel-material-create-form" toolbar={<FormToolbar />}>
        <TravelMaterialForm isCreate />
      </SimpleForm>
    </Create>
  )
}
