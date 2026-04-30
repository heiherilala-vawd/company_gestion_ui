import { Edit, SimpleForm, TextInput, NumberInput, SelectInput } from 'react-admin'
import ReferenceSelectWithCreate from '../../../../generic/ReferenceSelectWithCreate'
import { getMiddleUrl } from '../../../../config/dynamicResources.ts'
import EquipmentForm from '../../equipment/EquipmentForm.tsx'

export default function TravelEquipmentEdit() {
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
          source="equipment"
          reference="equipment"
          label="Équipement"
          optionText="name"
          createUrlEnd={getMiddleUrl('equipment')}
          createForm={<EquipmentForm isCreateForm />}
        />
        <NumberInput source="quantity" label="Quantité" />
        <SelectInput
          source="status"
          label="Statut"
          choices={[
            { id: 'IN_PROGRESS', name: 'En cours' },
            { id: 'LOST', name: 'Perdu' },
            { id: 'ARRIVED', name: 'Arrivé' },
          ]}
        />
        <TextInput source="comment" label="Commentaire" multiline />
      </SimpleForm>
    </Edit>
  )
}
