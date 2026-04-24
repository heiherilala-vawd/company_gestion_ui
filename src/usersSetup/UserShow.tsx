// users/UserShow.tsx
import { Show, SimpleShowLayout, TextField, EmailField, DateField, SelectField } from 'react-admin'

// ⚠️ Ajouter 'export default'
export default function UserShow() {
  return (
    <Show>
      <SimpleShowLayout>
        <TextField source="id" />
        <EmailField source="email" />
        <TextField source="first_name" label="Prénom" />
        <TextField source="last_name" label="Nom" />
        <SelectField
          source="role"
          choices={[
            { id: 'ADMIN', name: 'Admin' },
            { id: 'ADMINISTRATION', name: 'Administration' },
            { id: 'WAREHOUSE_WORKER', name: 'Magasinier' },
            { id: 'EMPLOYEE', name: 'Employé' },
          ]}
        />
        <SelectField
          source="sex"
          choices={[
            { id: 'M', name: 'Homme' },
            { id: 'F', name: 'Femme' },
          ]}
        />
        <DateField source="created_at" label="Créé le" showTime />
        <DateField source="updated_at" label="Modifié le" showTime />
      </SimpleShowLayout>
    </Show>
  )
}
