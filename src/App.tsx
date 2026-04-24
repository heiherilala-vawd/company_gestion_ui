import { Admin, Resource } from 'react-admin'
import { Layout } from './Layout'
import { dataProvider } from './dataProvider'
import authProvider from './authProvider.tsx'
import UserResource from './users'
import CompanyResource from './companies'
import JobResource from './jobs'

import { CompanyProvider } from './companies/CompanyContext.tsx'
import { CompanySelector } from './companies/CompanySelector'
import { AppBar as RAppBar, TitlePortal, Menu } from 'react-admin'
import { Box, Typography } from '@mui/material'
import { useState } from 'react'

const MyAppBar = () => (
  <RAppBar>
    <TitlePortal />
    <Box sx={{ flex: 1 }} />
    <Typography variant="h6" sx={{ mr: 2 }}>🏢</Typography>
    <CompanySelector />
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
    <Admin
      layout={myLayout}
      dataProvider={dataProvider}
      authProvider={authProvider}
    >
      <Resource name="users" {...UserResource} />
      <Resource name="jobs" {...JobResource} />
      <Resource name="companies" {...CompanyResource} />
    </Admin>
  </CompanyProvider>
)
