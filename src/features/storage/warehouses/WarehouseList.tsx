import {
  List,
  TextField,
  SearchInput,
  TextInput,
  ReferenceInput,
  SelectInput,
  EditButton,
} from 'react-admin'
import { ResponsiveDatagrid } from '../../../generic/ResponsiveDatagrid'

const WarehouseFilters = [
  <SearchInput source="q" alwaysOn key="q" />,
  <TextInput source="description" label="Description" key="description" />,
  <ReferenceInput source="job_id" reference="jobs" perPage={100} key="job_id">
    <SelectInput optionText="description" label="Travail" />
  </ReferenceInput>,
]

export default function WarehouseList() {
  return (
    <List filters={WarehouseFilters}>
      <ResponsiveDatagrid priorityFields={['name', 'description', 'job.description']}>
        <TextField source="name" label="Nom" />
        <TextField source="description" label="Description" />
        <TextField source="job.description" label="ID Travail" />
        <EditButton />
      </ResponsiveDatagrid>
    </List>
  )
}
