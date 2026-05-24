import { TextInput, NumberInput, DateInput } from 'react-admin'
import generateId from '../../../utili/utils.tsx'

export default function FixedCostForm({ isCreate = false, isCreateForm = false }) {
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
      <TextInput source="name" label="Nom" data-testid="input-name" />
      <NumberInput source="amount" label="Montant" data-testid="input-amount" />
      <TextInput
        source="description"
        label="Description"
        multiline
        data-testid="input-description"
      />
      <DateInput source="start_date" label="Date début" data-testid="input-start_date" />
      <DateInput source="end_date" label="Date fin" data-testid="input-end_date" />
    </>
  )
}
