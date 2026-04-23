import { Admin, AppBar, Resource } from 'react-admin'
import { Layout } from './Layout'
import { dataProvider } from './dataProvider'
import authProvider from './authProvider.tsx'
import UserResource from './users'
import CompanyResource from './companies'
import JobResource from './jobs'

import { CompanyProvider } from './companies/CompanyContext.tsx'
import { CompanySelector } from './companies/CompanySelector.tsx'

const MyAppBar = (props: any) => (
  <AppBar {...props}>
    <div style={{ flex: 1 }} />
    <CompanySelector />
  </AppBar>
)
const MyLayout = (props: any) => <Layout {...props} appBar={MyAppBar} />

export const App = () => (
  <CompanyProvider>
    <Admin layout={MyLayout} dataProvider={dataProvider} authProvider={authProvider}>
      <Resource name="users" {...UserResource} />
      <Resource name="jobs" {...JobResource} />
      <Resource name="companies" {...CompanyResource} />
    </Admin>
  </CompanyProvider>
)
