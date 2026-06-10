import { SimpleForm, TextInput } from 'react-admin'
import FormToolbar from '../../../../generic/FormToolbar'
import TravelMaterialForm from './TravelMaterialForm.tsx'
import GenericEdit from '../../../../generic/GenericEdit'

export default function TravelMaterialEdit() {
  return (
    <GenericEdit
      transform={(data) => ({
        ...data,
        travel: undefined,
      })}
      queryOptions={{
        select: (data) => ({
          ...data,
          travel_id: data.travel?.id,
          material: data.material?.id,
          arrival_location: data.arrival_location?.id,
        }),
      }}
    >
      <SimpleForm id="travel-material-edit-form" toolbar={<FormToolbar />}>
        <TextInput source="id" sx={{ display: 'none' }} />
        <TravelMaterialForm />
      </SimpleForm>
    </GenericEdit>
  )
}
