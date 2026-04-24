import { Create, SimpleForm, TextInput, SelectInput, required, email } from 'react-admin'
import generateId from '../../../utili/utils.tsx'

// ⚠️ Ajouter 'export default'
export default function UserCreate() {
  return (
    <Create>
      <SimpleForm>
        <TextInput source="id" readOnly defaultValue={generateId()} />
        <TextInput source="email" validate={[required(), email()]} />
        <TextInput source="first_name" label="Prénom" validate={[required()]} />
        <TextInput source="last_name" label="Nom" validate={[required()]} />
        <SelectInput
          source="sex"
          choices={[
            { id: 'M', name: 'Homme' },
            { id: 'F', name: 'Femme' },
          ]}
          validate={[required()]}
        />
        <SelectInput
          source="role"
          choices={[
            { id: 'ADMIN', name: 'Admin' },
            { id: 'ADMINISTRATION', name: 'Administration' },
            { id: 'WAREHOUSE_WORKER', name: 'Magasinier' },
            { id: 'EMPLOYEE', name: 'Employé' },
          ]}
          validate={[required()]}
        />
        <TextInput source="password" label="Mot de passe" type="password" validate={[required()]} />
      </SimpleForm>
    </Create>
  )
}
