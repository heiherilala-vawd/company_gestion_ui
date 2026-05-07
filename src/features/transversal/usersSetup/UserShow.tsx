// users/UserShow.tsx
import {
  SimpleShowLayout,
  TextField,
  EmailField,
  DateField,
  SelectField,
  FunctionField,
} from 'react-admin'
import { Show } from 'react-admin'

// ⚠️ Ajouter 'export default'
export default function UserShow() {
  return (
    <Show title="Détails utilisateur">
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
        {/* Nom complet du créateur */}
        <FunctionField
          label="Créé par"
          render={(record) => (
            <span>
              {record.created_by?.first_name} {record.created_by?.last_name}
            </span>
          )}
        />

        {/* Nom complet du modificateur */}
        <FunctionField
          label="Modifié par"
          render={(record) => (
            <span>
              {record.updated_by?.first_name} {record.updated_by?.last_name}
            </span>
          )}
        />
        <DateField source="created_at" label="Créé le" showTime />
        <DateField source="updated_at" label="Modifié le" showTime />
      </SimpleShowLayout>
    </Show>
  )
}
