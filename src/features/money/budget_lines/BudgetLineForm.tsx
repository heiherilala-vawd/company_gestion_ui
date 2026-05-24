import { TextInput, NumberInput, DateInput } from 'react-admin'
import generateId from '../../../utili/utils.tsx'

export default function BudgetLineForm({ isCreate = false, isCreateForm = false }) {
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
      <TextInput source="category" label="Catégorie" data-testid="input-category" />
      <NumberInput
        source="planned_amount"
        label="Montant prévu"
        data-testid="input-planned_amount"
      />
      <NumberInput source="actual_amount" label="Montant réel" data-testid="input-actual_amount" />
      <DateInput source="period_start" label="Début période" data-testid="input-period_start" />
      <DateInput source="period_end" label="Fin période" data-testid="input-period_end" />
      <TextInput
        source="description"
        label="Description"
        multiline
        data-testid="input-description"
      />
    </>
  )
}
