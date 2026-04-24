// companies/CompanyList.tsx
import {
  List,
  Datagrid,
  TextField,
  DateField,
  SelectField,
  SearchInput,
  TextInput,
  FunctionField,
  EditButton,
  DeleteButton,
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
      <Datagrid rowClick="show">
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
        <EditButton />
        <DeleteButton />
      </Datagrid>
    </List>
  )
}
