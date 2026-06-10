import { TextInput, required } from 'react-admin'
import generateId from '../../../utili/utils.tsx'
import CollapsibleOptionalFields from '../../../generic/CollapsibleOptionalFields'

export default function OrganizationForm({ isCreate = false, isCreateForm = false }) {
  const id = generateId()

  return (
    <>
      {isCreate && (
        <TextInput source="id" sx={{ display: 'none' }} defaultValue={id} data-testid="input-id" />
      )}
      {isCreateForm && <TextInput source="newId" readOnly defaultValue={id} />}
      <TextInput source="name" label="Nom" validate={[required()]} data-testid="input-name" />
      <TextInput
        source="company_id"
        label="ID Entreprise"
        defaultValue={localStorage.getItem('currentCompanyId')}
        sx={{ display: 'none' }}
      />
      <CollapsibleOptionalFields>
        <TextInput source="address" label="Adresse" multiline data-testid="input-address" />
        <TextInput source="email" label="Email" data-testid="input-email" />
        <TextInput source="phone" label="Téléphone" data-testid="input-phone" />
        <TextInput source="contact_name" label="Nom du contact" data-testid="input-contact_name" />
        <TextInput source="comment" label="Commentaire" multiline data-testid="input-comment" />
      </CollapsibleOptionalFields>
    </>
  )
}
