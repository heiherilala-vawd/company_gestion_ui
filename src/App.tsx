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
import ExpenseResource from './expenses'
import TravelExpenseResource from './travel_expenses'
import PurchaseResource from './purchases'
import BankFeeResource from './bank_fees'
import OtherExpenseResource from './other_expenses'
import EmployerPaymentResource from './employer_payments'
import TravelPeopleResource from './travel_people'
import TravelMaterialResource from './travel_materials'
import TravelEquipmentResource from './travel_equipment'

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
      <Resource name="expenses" {...ExpenseResource} />
      <Resource name="travel_expenses" {...TravelExpenseResource} />
      <Resource name="purchases" {...PurchaseResource} />
      <Resource name="bank_fees" {...BankFeeResource} />
      <Resource name="other_expenses" {...OtherExpenseResource} />
      <Resource name="employer_payments" {...EmployerPaymentResource} />
      <Resource name="travel_people" {...TravelPeopleResource} />
      <Resource name="travel_materials" {...TravelMaterialResource} />
      <Resource name="travel_equipment" {...TravelEquipmentResource} />
    </Admin>
  </CompanyProvider>
)
