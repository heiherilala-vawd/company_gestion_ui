import {
  List,
  TextField,
  NumberField,
  DateField,
  SearchInput,
  TextInput,
  BooleanInput,
  ReferenceInput,
  SelectInput,
  FunctionField,
  EditButton,
  DeleteButton,
} from 'react-admin'
import { ResponsiveDatagrid } from '../../../generic/ResponsiveDatagrid'

const EquipmentFilters = [
  <SearchInput source="name" alwaysOn />,
  <TextInput source="description" label="Description" />,
  <ReferenceInput source="warehouse_id" reference="warehouses" perPage={100}>
    <SelectInput optionText="name" label="Entrepôt" />
  </ReferenceInput>,
  <TextInput source="floor_number" label="N° étage" />,
  <TextInput source="storage_number" label="N° rangement" />,
  <BooleanInput source="not_arrived" label="Non arrivé" />,
]

export default function EquipmentList() {
  return (
    <List filters={EquipmentFilters}>
      <ResponsiveDatagrid
        priorityFields={['name', 'description', 'warehouse.name', 'floor_number']}
      >
        <TextField source="name" label="Nom" />
        <TextField source="description" label="Description" />
        <TextField source="warehouse.name" label="Entrepôt" />
        <NumberField source="floor_number" label="Étage" />
        <NumberField source="storage_number" label="Emplacement" />
        <DateField source="created_at" label="Créé le" showTime />
        <DateField source="updated_at" label="Modifié le" showTime />
        <FunctionField
          label="Créé par"
          render={(record) => (
            <span>
              {record.created_by?.first_name} {record.created_by?.last_name}
            </span>
          )}
        />
        <FunctionField
          label="Modifié par"
          render={(record) => (
            <span>
              {record.updated_by?.first_name} {record.updated_by?.last_name}
            </span>
          )}
        />
        <EditButton />
        <DeleteButton />
      </ResponsiveDatagrid>
    </List>
  )
}
