import { SimpleForm } from 'react-admin'
import FormToolbar from '../../../../generic/FormToolbar'
import TravelMaterialForm from './TravelMaterialForm.tsx'
import GenericCreate from '../../../../generic/GenericCreate'

export default function TravelMaterialCreate() {
  return (
    <GenericCreate>
      <SimpleForm id="travel-material-create-form" toolbar={<FormToolbar />}>
        <TravelMaterialForm isCreate />
      </SimpleForm>
    </GenericCreate>
  )
}
