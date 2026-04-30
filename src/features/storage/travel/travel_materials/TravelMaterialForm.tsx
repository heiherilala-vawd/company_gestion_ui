import { TextInput, NumberInput } from 'react-admin'
import ReferenceSelectWithCreate from '../../../../generic/ReferenceSelectWithCreate'
import generateId from '../../../../utili/utils.tsx'
import { getMiddleUrl } from '../../../../config/dynamicResources.ts'
import MaterialForm from '../../materials/MaterialForm.tsx'

// eslint-disable-next-line react/prop-types
export default function TravelMaterialForm({ isCreate = false, isCreateForm = false }) {
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
    </>
  )
}
