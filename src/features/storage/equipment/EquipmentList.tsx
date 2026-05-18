import {
  List,
  TextField,
  NumberField,
  DateField,
  SearchInput,
  TextInput,
  BooleanInput,
  BooleanField,
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
  <BooleanInput source="est_en_panne" label="Hors d'usage" />,
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
        <BooleanField source="est_en_panne" label="Hors d'usage" />
        <EditButton />
      </ResponsiveDatagrid>
    </List>
  )
}
