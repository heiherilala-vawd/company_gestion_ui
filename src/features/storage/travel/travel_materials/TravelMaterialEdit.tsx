import { Edit, SimpleForm, TextInput, NumberInput } from 'react-admin'
import ReferenceSelectWithCreate from '../../../../generic/ReferenceSelectWithCreate'
import { getMiddleUrl } from '../../../../config/dynamicResources.ts'
import MaterialForm from '../../materials/MaterialForm.tsx'

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
        <TextInput source="id" disabled />
        <ReferenceSelectWithCreate
          source="travel_id"
          reference="travel_expenses"
          label="Voyage"
          optionText="title"
        />
        <ReferenceSelectWithCreate
          source="material"
          reference="materials"
          label="Matériau"
          optionText="name"
          createUrlEnd={getMiddleUrl('materials')}
          createForm={<MaterialForm isCreateForm />}
        />
        <NumberInput source="quantity" label="Quantité" />
        <NumberInput source="quantity_received" label="Quantité reçue" />
        <TextInput source="comment" label="Commentaire" multiline />
      </SimpleForm>
    </Edit>
  )
}
