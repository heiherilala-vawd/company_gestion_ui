import { Admin, Resource } from 'react-admin'
import { Layout } from './Layout'
import { dataProvider } from './auth/dataProvider.ts'
import authProvider from './auth/authProvider.tsx'
import WarehousesResource from './warehouses'
import EquipmentResource from './equipment'
import UserResource from './usersSetup'
import CompanyResource from './companies'
import JobResource from './jobs'
import MaterialsResource from './materials'

import { CompanyProvider } from './companies/CompanyContext.tsx'
import { CompanySelector } from './companies/CompanySelector'
import { AppBar as RAppBar, TitlePortal, Menu } from 'react-admin'
import { Box, Typography } from '@mui/material'

const MyAppBar = () => (
  <RAppBar>
    <TitlePortal />
    <Box sx={{ flex: 1 }} />
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Typography variant="caption" sx={{ color: 'white' }}>
        🏢
      </Typography>
      <CompanySelector />
    </Box>
  </RAppBar>
)

const MyMenu = () => <Menu />

const myLayout = ({ children }: { children?: React.ReactNode }) => (
  <Layout appBar={MyAppBar} menu={MyMenu}>
    {children}
  </Layout>
)

export const App = () => (
  <CompanyProvider>
    <Admin layout={myLayout} dataProvider={dataProvider} authProvider={authProvider}>
      <Resource name="jobs" {...JobResource} />
      <Resource name="companies" {...CompanyResource} />
      <Resource name="users" {...UserResource} />
      <Resource name="warehouses" {...WarehousesResource} />
      <Resource name="equipment" {...EquipmentResource} />
      <Resource name="materials" {...MaterialsResource} />
    </Admin>
  </CompanyProvider>
)
