import { Create, SimpleForm, TextInput, NumberInput } from 'react-admin'
import ReferenceSelectWithCreate from '../../../../generic/ReferenceSelectWithCreate'
import { getMiddleUrl } from '../../../../config/dynamicResources.ts'
import MaterialForm from '../../materials/MaterialForm.tsx'

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
        <ReferenceSelectWithCreate
          source="travel_id"
          reference="travel_expenses"
          label="Voyage"
          optionText="title"
          fields={[
            { source: 'expense_id', label: 'Dépense', type: 'select', required: true },
            { source: 'departure_location', label: 'Lieu de départ' },
            { source: 'arrival_location', label: "Lieu d'arrivée" },
          ]}
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
    </Create>
  )
}
