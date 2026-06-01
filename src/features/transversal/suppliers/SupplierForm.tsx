import { TextInput, required } from 'react-admin'
import generateId from '../../../utili/utils.tsx'

export default function SupplierForm({ isCreate = false, isCreateForm = false }) {
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
      <TextInput source="name" label="Nom" validate={[required()]} data-testid="input-name" />
      <TextInput source="siret" label="SIRET" validate={[required()]} data-testid="input-siret" />
      <TextInput source="email" label="Email" validate={[required()]} data-testid="input-email" />
      <TextInput source="address" label="Adresse" multiline data-testid="input-address" />
      <TextInput source="phone" label="Téléphone" data-testid="input-phone" />
      <TextInput source="contact_name" label="Nom du contact" data-testid="input-contact_name" />
    </>
  )
}
