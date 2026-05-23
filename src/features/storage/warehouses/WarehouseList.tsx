import {
  List,
  TextField,
  DateField,
  SearchInput,
  TextInput,
  ReferenceInput,
  SelectInput,
  FunctionField,
  EditButton,
} from 'react-admin'
import { ResponsiveDatagrid } from '../../../generic/ResponsiveDatagrid'

const WarehouseFilters = [
  <SearchInput source="q" alwaysOn />,
  <TextInput source="description" label="Description" />,
  <ReferenceInput source="job_id" reference="jobs" perPage={100}>
    <SelectInput optionText="description" label="Chantier" />
  </ReferenceInput>,
]

export default function WarehouseList() {
  return (
    <List filters={WarehouseFilters}>
      <ResponsiveDatagrid priorityFields={['name', 'description', 'job.description']}>
        <TextField source="name" label="Nom" />
        <TextField source="description" label="Description" />
        <TextField source="job.description" label="ID Chantier" />
        <EditButton />
      </ResponsiveDatagrid>
    </List>
  )
}
