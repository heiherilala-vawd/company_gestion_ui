import {
  List,
  Datagrid,
  TextField,
  DateField,
  SearchInput,
  TextInput,
  FunctionField,
} from 'react-admin'

const WarehouseFilters = [
  <SearchInput source="name" alwaysOn />,
  <TextInput source="description" label="Description" />,
  <TextInput source="job_id" label="ID Chantier" />,
]

export default function WarehouseList() {
  return (
    <List filters={WarehouseFilters}>
      <Datagrid rowClick="show">
        <TextField source="name" label="Nom" />
        <TextField source="description" label="Description" />
        <TextField source="job.description" label="ID Chantier" />
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
      </Datagrid>
    </List>
  )
}
