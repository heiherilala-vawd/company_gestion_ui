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
import { Box, Card, Typography, Chip, alpha } from '@mui/material'
import { useTheme } from '@mui/material/styles'

const CompanyFilters = [
  <SearchInput source="name" alwaysOn />,
  <TextInput source="rib" label="RIB" />,
  <TextInput source="description" label="Description" />,
  <TextInput source="company_type" label="Type" />,
]

export default function CompanyList() {
  const theme = useTheme()
  const isDark = theme.palette.mode === 'dark'

  return (
    <List
      filters={CompanyFilters}
      sx={{
        '& .RaList-main': {
          backgroundColor: 'transparent',
          boxShadow: 'none',
        },
      }}
    >
      <Card
        sx={{
          borderRadius: 4,
          boxShadow: isDark
            ? '0 1px 3px rgba(0,0,0,0.2), 0 4px 12px rgba(0,0,0,0.1)'
            : '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.02)',
          border: isDark ? '1px solid rgba(255,255,255,0.04)' : '1px solid rgba(0,0,0,0.04)',
          overflow: 'hidden',
        }}
      >
        <Datagrid
          rowClick="show"
          sx={{
            '& .RaDatagrid-root': {
              borderRadius: 4,
            },
            '& .RaDatagrid-header': {
              backgroundColor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
            },
            '& .RaDatagrid-row': {
              transition: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                backgroundColor: isDark ? 'rgba(255, 90, 60, 0.08)' : 'rgba(255, 90, 60, 0.04)',
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
