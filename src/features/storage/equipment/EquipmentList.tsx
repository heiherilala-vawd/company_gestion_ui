import {
  List,
  TextField,
  NumberField,
  SearchInput,
  TextInput,
  BooleanInput,
  BooleanField,
  ReferenceInput,
  SelectInput,
  EditButton,
} from 'react-admin'
import { ResponsiveDatagrid } from '../../../generic/ResponsiveDatagrid'

const EquipmentFilters = [
  <SearchInput source="q" alwaysOn key="q" />,
  <TextInput source="description" label="Description" key="description" />,
  <ReferenceInput source="warehouse_id" reference="warehouses" perPage={100} key="warehouse_id">
    <SelectInput optionText="name" label="Entrepôt" />
  </ReferenceInput>,
  <TextInput source="floor_number" label="N° étage" key="floor_number" />,
  <TextInput source="storage_number" label="N° rangement" key="storage_number" />,
  <BooleanInput source="not_arrived" label="Non arrivé" key="not_arrived" />,
  <BooleanInput source="is_damaged" label="Endommagé" key="is_damaged" />,
  <BooleanInput source="is_lost" label="Perdu" key="is_lost" />,
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
        <BooleanField source="is_damaged" label="Endommagé" />
        <BooleanField source="is_lost" label="Perdu" />
        <EditButton />
      </ResponsiveDatagrid>
    </List>
  )
}
