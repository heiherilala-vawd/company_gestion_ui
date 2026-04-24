import {
  List,
  Datagrid,
  TextField,
  NumberField,
  DateField,
  SearchInput,
  TextInput,
  useRecordConte,
} from 'react-admin'

const EquipmentFilters = [
  <SearchInput source="name" alwaysOn />,
  <TextInput source="description" label="Description" />,
  <TextInput source="warehouse_id" label="ID Entrepôt" />,
]

export default function EquipmentList() {
  return (
    <List filters={EquipmentFilters}>
      <Datagrid rowClick="edit">
        <TextField source="id" />
        <TextField source="name" label="Nom" />
        <TextField source="description" label="Description" />
        <TextField source="warehouse_id" label="ID Entrepôt" />
        <NumberField source="floor_number" label="Étage" />
        <NumberField source="storage_number" label="Emplacement" />
        <DateField source="created_at" label="Créé le" showTime />
        <DateField source="updated_at" label="Modifié le" showTime />
        <TextField source="created_by" label="Créé par" />
        <TextField source="updated_by" label="Modifié par" />
      </Datagrid>
    </List>
  )
}
