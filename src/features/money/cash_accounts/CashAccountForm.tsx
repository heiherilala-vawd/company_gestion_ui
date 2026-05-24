import { TextInput, NumberInput } from 'react-admin'
import generateId from '../../../utili/utils.tsx'

export default function CashAccountForm({ isCreate = false, isCreateForm = false }) {
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
      <NumberInput source="balance" label="Solde" data-testid="input-balance" />
      <TextInput
        source="description"
        label="Description"
        multiline
        data-testid="input-description"
      />
    </>
  )
}
