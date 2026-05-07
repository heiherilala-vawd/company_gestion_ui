import {
  List,
  Datagrid,
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
        <Datagrid
          rowClick="show"
          sx={{
            '& .RaDatagrid-root': {
              borderRadius: br.lg,
            },
            '& .RaDatagrid-header': {
              backgroundColor: (theme) =>
                theme.palette.mode === 'light' ? 'rgba(0,0,0,0.02)' : 'rgba(255,255,255,0.02)',
            },
            '& .RaDatagrid-row': {
              transition: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                backgroundColor: (theme) =>
                  theme.palette.mode === 'light'
                    ? 'rgba(255, 90, 60, 0.04)'
                    : 'rgba(255, 90, 60, 0.08)',
              },
            },
          }}
        >
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
        </Datagrid>
      </Card>
    </List>
  )
}
