import {
  List,
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
import { ResponsiveDatagrid } from '../../../generic/ResponsiveDatagrid'

const formatEnumLabel = (key: string) =>
  key
    .split('_')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ')

const UserFilters = [
  <SearchInput source="q" alwaysOn key="q" />,
  <TextInput source="first_name" label="Prénom" key="first_name" />,
  <TextInput source="last_name" label="Nom" key="last_name" />,
  <SelectInput
    source="role"
    label="Rôle"
    key="role"
    choices={Object.entries(Role).map(([k, v]) => ({ id: v, name: formatEnumLabel(k) }))}
  />,
]

export default function UserList() {
  return (
    <List filters={UserFilters}>
      <ResponsiveDatagrid priorityFields={['first_name', 'last_name', 'email', 'role']}>
        <TextField source="first_name" label="Prénom" />
        <TextField source="last_name" label="Nom" />
        <EmailField source="email" />
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
        <EditButton />
      </ResponsiveDatagrid>
    </List>
  )
}
