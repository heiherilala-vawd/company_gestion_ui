import { TextInput, NumberInput, SelectInput } from 'react-admin'
import ReferenceSelectWithCreate from '../../../../generic/ReferenceSelectWithCreate'
import generateId from '../../../../utili/utils.tsx'
import { getMiddleUrl } from '../../../../config/dynamicResources.ts'
import EquipmentForm from '../../equipment/EquipmentForm.tsx'

// eslint-disable-next-line react/prop-types
export default function TravelEquipmentForm({ isCreate = false, isCreateForm = false }) {
  return (
    <>
      {isCreate && <TextInput source="id" readOnly defaultValue={generateId()} />}
      {isCreateForm && <TextInput source="newId" readOnly defaultValue={generateId()} />}
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
    </>
  )
}
