import {
  List,
  Datagrid,
  TextField,
  EmailField,
  DateField,
  SelectField,
  Filter,
  SearchInput,
  TextInput,
  EditButton,
} from 'react-admin'

// Filtres pour la liste
const UserFilters = [
  <SearchInput source="email" alwaysOn />,
  <TextInput source="first_name" label="Prénom" />,
  <TextInput source="last_name" label="Nom" />,
  <TextInput source="role" label="Rôle" />,
]

// ⚠️ Ajouter 'export default' au lieu de 'export const'
export default function UserList() {
  return (
    <List filters={UserFilters}>
      <Datagrid rowClick="show">
        {' '}
        {/* ← Garde "edit" ou enlève pour pas de clic */}
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
        <EditButton /> {/* ← Bouton d'édition */}
      </Datagrid>
    </List>
  )
}
