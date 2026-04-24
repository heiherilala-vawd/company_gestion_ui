import { List, Datagrid, TextField, DateField, SearchInput, TextInput } from 'react-admin'

const WarehouseFilters = [
  <SearchInput source="name" alwaysOn />,
  <TextInput source="description" label="Description" />,
  <TextInput source="job_id" label="ID Chantier" />,
]

export default function WarehouseList() {
  return (
    <List filters={WarehouseFilters}>
      <Datagrid rowClick="edit">
        <TextField source="id" />
        <TextField source="name" label="Nom" />
        <TextField source="description" label="Description" />
        <TextField source="job_id" label="ID Chantier" />
        <DateField source="created_at" label="Créé le" showTime />
        <DateField source="updated_at" label="Modifié le" showTime />
        <TextField source="created_by" label="Créé par" />
        <TextField source="updated_by" label="Modifié par" />
      </Datagrid>
    </List>
  )
}
