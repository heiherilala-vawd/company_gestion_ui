import {
  List,
  Datagrid,
  TextField,
  EmailField,
  DateField,
  SelectField,
  SearchInput,
  TextInput,
  SelectInput,
  EditButton,
} from 'react-admin'
import { Role } from '../../../gen-ts/src/models/Role'

const formatEnumLabel = (key: string) =>
  key
    .split('_')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ')

// Filtres pour la liste
const UserFilters = [
  <SearchInput source="email" alwaysOn />,
  <TextInput source="first_name" label="Prénom" />,
  <TextInput source="last_name" label="Nom" />,
  <SelectInput
    source="role"
    label="Rôle"
    choices={Object.entries(Role).map(([k, v]) => ({ id: v, name: formatEnumLabel(k) }))}
  />,
]

// ⚠️ Ajouter 'export default' au lieu de 'export const'
export default function UserList() {
  return (
    <List filters={UserFilters}>
      <Datagrid rowClick="show">
        {/* ← Garde "edit" ou enlève pour pas de clic */}
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
