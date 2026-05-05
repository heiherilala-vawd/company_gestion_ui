import { TextInput, SelectInput, required, email } from 'react-admin'
import generateId from '../../../utili/utils.tsx'

// eslint-disable-next-line react/prop-types
export default function UserForm({ isCreate = false, isCreateForm = false }) {
  return (
    <>
      {isCreate && (
        <TextInput source="id" readOnly defaultValue={generateId()} data-testid="input-id" />
      )}{' '}
      {isCreateForm && <TextInput source="newId" readOnly defaultValue={generateId()} />}
      <TextInput
        source="email"
        label="Email"
        validate={[required(), email()]}
        data-testid="input-email"
      />
      <TextInput
        source="first_name"
        label="Prénom"
        validate={[required()]}
        data-testid="input-first_name"
      />
      <TextInput
        source="last_name"
        label="Nom"
        validate={[required()]}
        data-testid="input-last_name"
      />
      <SelectInput
        source="sex"
        label="Sexe"
        choices={[
          { id: 'M', name: 'Homme' },
          { id: 'F', name: 'Femme' },
        ]}
        validate={[required()]}
        data-testid="input-sex"
      />
      <SelectInput
        source="role"
        label="Rôle"
        choices={[
          { id: 'ADMIN', name: 'Admin' },
          { id: 'ADMINISTRATION', name: 'Administration' },
          { id: 'WAREHOUSE_WORKER', name: 'Magasinier' },
          { id: 'EMPLOYEE', name: 'Employé' },
        ]}
        validate={[required()]}
        data-testid="input-role"
      />
      <TextInput
        source="password"
        label="Mot de passe"
        type="password"
        data-testid="input-password"
      />
    </>
  )
}
