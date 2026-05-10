import {
  List,
  TextField,
  DateField,
  SelectField,
  SearchInput,
  TextInput,
  SelectInput,
  FunctionField,
  EditButton,
  DeleteButton,
} from 'react-admin'
import { Card } from '@mui/material'
import { formStyles } from '../../../style/components'
import { borderRadius as br, getShadow } from '../../../style/themeConfig'
import { CompanyType } from '../../../gen-ts/src/models/CompanyType'
import { ResponsiveDatagrid } from '../../../generic/ResponsiveDatagrid'

const CompanyFilters = [
  <SearchInput source="name" alwaysOn />,
  <TextInput source="rib" label="RIB" />,
  <TextInput source="description" label="Description" />,
  <SelectInput
    source="company_type"
    label="Type"
    choices={Object.entries(CompanyType).map(([k, v]) => ({ id: v, name: k }))}
  />,
]

export default function CompanyList() {
  return (
    <List filters={CompanyFilters} sx={formStyles.page}>
      <Card
        sx={{
          borderRadius: br.lg,
          boxShadow: (theme) => getShadow(theme.palette.mode as 'light' | 'dark', 'sm'),
          border: (theme) =>
            `1px solid ${theme.palette.mode === 'light' ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.04)'}`,
          overflow: 'hidden',
        }}
      >
        <ResponsiveDatagrid priorityFields={['name', 'description', 'rib', 'company_type']}>
          <TextField source="name" label="Nom" />
          <TextField source="description" label="Description" />
          <TextField source="rib" label="RIB" />
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
      </Card>
    </List>
  )
}
