// companies/CompanyList.tsx
import {
  List,
  Datagrid,
  TextField,
  DateField,
  SelectField,
  SearchInput,
  TextInput,
} from 'react-admin'

const CompanyFilters = [
  <SearchInput source="name" alwaysOn />,
  <TextInput source="rib" label="RIB" />,
  <TextInput source="description" label="Description" />,
  <TextInput source="company_type" label="Type" />,
]

export default function CompanyList() {
  return (
    <List filters={CompanyFilters}>
      <Datagrid rowClick="edit">
        <TextField source="id" />
        <TextField source="name" label="Nom" />
        <TextField source="rib" label="RIB" />
        <TextField source="description" label="Description" />
        <SelectField
          source="company_type"
          label="Type"
          choices={[
            { id: 'BTP', name: 'BTP' },
            { id: 'HOTEL', name: 'Hôtel' },
          ]}
        />
        <DateField source="created_at" label="Créé le" showTime />
        <DateField source="updated_at" label="Modifié le" showTime />
        <TextField source="created_by" label="Créé par" />
        <TextField source="updated_by" label="Modifié par" />
      </Datagrid>
    </List>
  )
}
