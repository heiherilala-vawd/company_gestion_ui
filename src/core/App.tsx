import { Admin, Resource } from 'react-admin'
import { Layout } from './Layout'
import { dataProvider } from '../auth/dataProvider.ts'
import authProvider from '../auth/authProvider.tsx'

import WarehousesResource from '../features/storage/warehouses'
import EquipmentResource from '../features/storage/equipment'
import MaterialsResource from '../features/storage/materials'
import TravelPeopleResource from '../features/storage/travel/travel_people'
import TravelMaterialResource from '../features/storage/travel/travel_materials'
import TravelEquipmentResource from '../features/storage/travel/travel_equipment'

import UserResource from '../features/transversal/usersSetup'
import CompanyResource from '../features/transversal/companies'
import JobResource from '../features/transversal/jobs'

import ExpenseResource from '../features/money/expenses'
import TravelExpenseResource from '../features/money/travel_expenses'
import PurchaseResource from '../features/money/purchases'
import BankFeeResource from '../features/money/bank_fees'
import OtherExpenseResource from '../features/money/other_expenses'
import EmployerPaymentResource from '../features/money/employer_payments'
import IncomeResource from '../features/money/incomes'

import { CompanyProvider } from '../features/transversal/companies/CompanyContext.tsx'
import { CompanySelector } from '../features/transversal/companies/CompanySelector'
import { AppBar as RAppBar, TitlePortal, CustomRoutes } from 'react-admin'
import { Route } from 'react-router-dom'
import MyMenuComponent from './Menu'
import { Box } from '@mui/material'
import { JobSelector } from '../features/transversal/jobs/JobSelector.tsx'
import { JobProvider } from '../features/transversal/jobs/JobContext.tsx'
import { appBarStyles } from '../style/components'
import HomePage from '../features/HomePage'
import SimplePage from '../features/SimplePage'
import { ExpenseSelector } from '../features/money/expenses/ExpenseSelector.tsx'
import { ExpenseProvider } from '../features/money/expenses/ExpenseContext.tsx'

const MyAppBar = () => (
  <RAppBar>
    <TitlePortal />
    <Box sx={{ flex: 1 }} />
    <Box sx={appBarStyles.container}>
      <CompanySelector />
      <JobSelector />
      <ExpenseSelector />
    </Box>
  </RAppBar>
)

const MyMenu = () => <MyMenuComponent />

const myLayout = ({ children }: { children?: React.ReactNode }) => (
  <Layout appBar={MyAppBar} menu={MyMenu}>
    {children}
  </Layout>
)

export const App = () => (
  <ExpenseProvider>
    <CompanyProvider>
      <JobProvider>
        <Admin
          dashboard={HomePage}
          layout={myLayout}
          dataProvider={dataProvider}
          authProvider={authProvider}
        >
          <CustomRoutes>
            <Route path="/purchases_activity" element={<SimplePage title="Achats" />} />
            <Route
              path="/travel_equipment_activity"
              element={<SimplePage title="Déplacements" />}
            />
            <Route path="/incomes_activity" element={<SimplePage title="Revenus" />} />
            <Route path="/expenses_activity" element={<SimplePage title="Dépenses" />} />
            <Route
              path="/employer_payments_activity"
              element={<SimplePage title="Valider Payment" />}
            />
            <Route
              path="/travel_materials_activity"
              element={<SimplePage title="Valider Réception" />}
            />
          </CustomRoutes>
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
          <Resource name="incomes" {...IncomeResource} />
        </Admin>
      </JobProvider>
    </CompanyProvider>
  </ExpenseProvider>
)
