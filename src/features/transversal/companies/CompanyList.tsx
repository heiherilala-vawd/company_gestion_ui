import {
  List,
  TextField,
  SelectField,
  SearchInput,
  TextInput,
  SelectInput,
  EditButton,
} from 'react-admin'
import { Card } from '@mui/material'
import { formStyles } from '../../../style/components'
import { borderRadius as br, getShadow } from '../../../style/themeConfig'
import { CompanyType } from '../../../gen-ts/src/models/CompanyType'
import { ResponsiveDatagrid } from '../../../generic/ResponsiveDatagrid'

const CompanyFilters = [
  <SearchInput source="q" alwaysOn key="q" />,
  <TextInput source="rib" label="RIB" key="rib" />,
  <TextInput source="description" label="Description" key="description" />,
  <SelectInput
    source="company_type"
    label="Type"
    key="company_type"
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
          <EditButton />
        </ResponsiveDatagrid>
      </Card>
    </List>
  )
}
