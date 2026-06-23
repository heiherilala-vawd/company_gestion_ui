import { required, TextInput, NumberInput, BooleanInput, DateInput } from 'react-admin'
import generateId from '../../../utili/utils.tsx'
import { renderWarehouseSelect } from '../../../generic/SelectWithCreateProvider.tsx'
import CollapsibleOptionalFields from '../../../generic/CollapsibleOptionalFields'

export default function EquipmentForm({ isCreate = false, isCreateForm = false }) {
  return (
    <>
      {isCreate && (
        <TextInput
          source="id"
          sx={{ display: 'none' }}
          defaultValue={generateId()}
          data-testid="input-id"
        />
      )}{' '}
      {isCreateForm && (
        <TextInput source="newId" sx={{ display: 'none' }} defaultValue={generateId()} />
      )}
      <TextInput source="name" label="Nom" validate={[required()]} data-testid="input-name" />
      {renderWarehouseSelect('warehouse_id', 'Entrepôt')}
      <NumberInput
        source="purchase_price"
        label="Prix d'achat"
        data-testid="input-purchase_price"
      />
      <TextInput
        source="category"
        label="Catégorie"
        validate={[required()]}
        defaultValue="Général"
        data-testid="input-category"
      />
      <CollapsibleOptionalFields>
        <TextInput
          source="description"
          label="Description"
          multiline
          rows={3}
          data-testid="input-description"
        />
        <div data-testid="input-floor_number" style={{ width: '100%' }}>
          <NumberInput source="floor_number" label="Étage" />
        </div>
        <NumberInput
          source="storage_number"
          label="Emplacement"
          data-testid="input-storage_number"
        />
        <DateInput source="purchase_date" label="Date d'achat" data-testid="input-purchase_date" />
        <BooleanInput
          source="is_damaged"
          label="Endommagé"
          defaultValue={false}
          data-testid="input-is_damaged"
        />
        <BooleanInput
          source="is_lost"
          label="Perdu"
          defaultValue={false}
          data-testid="input-is_lost"
        />
        <TextInput source="comment" label="Commentaire" multiline data-testid="input-comment" />
      </CollapsibleOptionalFields>
    </>
  )
}
