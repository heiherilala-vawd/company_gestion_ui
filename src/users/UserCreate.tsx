import { Create, SimpleForm, TextInput, SelectInput, required, email } from 'react-admin'

// ⚠️ Ajouter 'export default'
export default function UserCreate() {
  const generateId = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0
      const v = c === 'x' ? r : (r & 0x3) | 0x8
      return v.toString(16)
    })
  }
  return (
    <Create
      transform={(data) => ({
        ...data,
        id: data.id || generateId(), // Générer un ID si non fourni
      })}
    >
      <SimpleForm>
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
