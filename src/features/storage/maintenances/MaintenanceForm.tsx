import { TextInput, NumberInput, ReferenceInput, SelectInput } from 'react-admin'
import generateId from '../../../utili/utils.tsx'

export default function MaintenanceForm({ isCreate = false, isCreateForm = false }) {
  const id = generateId()

  return (
    <>
      {isCreate && (
        <TextInput
          source="id"
          readOnly
          defaultValue={id}
          sx={{ display: 'none' }}
          data-testid="input-id"
        />
      )}
      {isCreateForm && <TextInput source="newId" readOnly defaultValue={id} />}
      <ReferenceInput source="equipment_id" reference="equipment" label="Équipement">
        <SelectInput optionText="name" data-testid="input-equipment_id" />
      </ReferenceInput>
      <TextInput
        source="description"
        label="Description"
        multiline
        data-testid="input-description"
      />
      <NumberInput source="expense.amount" label="Montant" data-testid="input-expense.amount" />
      <TextInput source="expense.comment" label="Commentaire" data-testid="input-expense.comment" />
    </>
  )
}
