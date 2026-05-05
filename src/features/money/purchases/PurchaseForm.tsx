import { TextInput, NumberInput, BooleanInput } from 'react-admin'
import generateId from '../../../utili/utils.tsx'
import {
  renderEquipmentSelect,
  renderExpenseSelect,
  renderMaterialSelect,
  renderWarehouseSelect,
} from '../../../generic/SelectWithCreateProvider.tsx'

// eslint-disable-next-line react/prop-types
export default function PurchaseForm({ isCreate = false, isCreateForm = false }) {
  return (
    <>
      {isCreate && (
        <TextInput source="id" readOnly defaultValue={generateId()} data-testid="input-id" />
      )}{' '}
      {isCreateForm && <TextInput source="newId" readOnly defaultValue={generateId()} />}
      {renderExpenseSelect('expense_id', 'Dépense')}
      {renderWarehouseSelect('supplier_id', 'Fournisseur')}
      {renderEquipmentSelect('equipment_id', 'Équipement')}
      {renderMaterialSelect('material_id', 'Matériau')}
      <NumberInput source="quantity" label="Quantité" data-testid="input-quantity" />
      <BooleanInput
        source="is_equipment"
        label="Est un équipement"
        data-testid="input-is_equipment"
      />
    </>
  )
}
