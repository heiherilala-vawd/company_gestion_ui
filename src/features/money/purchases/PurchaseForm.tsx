import { TextInput, NumberInput, BooleanInput } from 'react-admin'
import ReferenceSelectWithCreate from '../../../generic/ReferenceSelectWithCreate'
import generateId from '../../../utili/utils.tsx'
import { getMiddleUrl } from '../../../config/dynamicResources.ts'
import MaterialForm from '../../storage/materials/MaterialForm.tsx'
import EquipmentForm from '../../storage/equipment/EquipmentForm.tsx'

// eslint-disable-next-line react/prop-types
export default function PurchaseForm({ isCreate = false, isCreateForm = false }) {
  return (
    <>
      {isCreate && <TextInput source="id" readOnly defaultValue={generateId()} />}
      {isCreateForm && <TextInput source="newId" readOnly defaultValue={generateId()} />}
      <ReferenceSelectWithCreate
        source="expense_id"
        reference="expenses"
        label="Dépense"
        optionText="description"
      />
      <TextInput source="supplier" label="Fournisseur" />
      <ReferenceSelectWithCreate
        source="equipment"
        reference="equipment"
        label="Équipement"
        optionText="name"
        createUrlEnd={getMiddleUrl('equipment')}
        createForm={<EquipmentForm isCreateForm />}
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
      <BooleanInput source="is_equipment" label="Est un équipement" />
    </>
  )
}
