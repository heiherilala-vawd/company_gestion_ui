import { Create, SimpleForm, TextInput, NumberInput, SelectInput } from 'react-admin'
import ReferenceSelectWithCreate from '../../../../generic/ReferenceSelectWithCreate'
import { getMiddleUrl } from '../../../../config/dynamicResources.ts'
import EquipmentForm from '../../equipment/EquipmentForm.tsx'

export default function TravelEquipmentCreate() {
  return (
    <Create>
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
    </Create>
  )
}
