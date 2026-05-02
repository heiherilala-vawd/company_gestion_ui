import { Admin, Resource, Sidebar } from 'react-admin'
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
import { Box, createTheme } from '@mui/material'
import { JobSelector } from '../features/transversal/jobs/JobSelector.tsx'
import { JobProvider } from '../features/transversal/jobs/JobContext.tsx'
import { appBarStyles } from '../style/components'
import HomePage from '../features/HomePage'
import SimplePage from '../features/SimplePage'
import { ExpenseSelector } from '../features/money/expenses/ExpenseSelector.tsx'
import { ExpenseProvider } from '../features/money/expenses/ExpenseContext.tsx'
import PurchaseActivityForm from '../features/money/purchase_operation/PurchaseActivityForm.tsx'
import TravelOperationForm from '../features/storage/travel_operation/TravelOperationForm.tsx'

const MyAppBar = () => (
  <RAppBar>
    <TitlePortal />
    <Box sx={{ flex: 1 }} />
    <Box sx={appBarStyles.container} data-testid="menu-item-selector-home">
      <CompanySelector />
      <JobSelector />
      <ExpenseSelector />
    </Box>
  </RAppBar>
)

const MyMenu = () => <MyMenuComponent />

const MySidebar = (props) => (
  <Sidebar
    {...props}
    DrawerProps={{
      keepMounted: false, // 🔥 IMPORTANT
    }}
    sx={{
      '& .MuiModal-root': {
        pointerEvents: 'none',
      },
    }}
  />
)

const myLayout = ({ children }: { children?: React.ReactNode }) => (
  <Layout appBar={MyAppBar} menu={MyMenu} sidebar={MySidebar}>
    {children}
  </Layout>
)

export const myTheme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          marginBottom: '16px',
          backgroundColor: '#f9f9f9',
          borderRadius: '8px',
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontWeight: 'bold',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '10px',
          textTransform: 'none',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          margin: '16px',
          '@media (max-width:600px)': {
            margin: '8px',
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        h6: {
          '@media (max-width:600px)': {
            fontSize: '1.1rem',
          },
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
})

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
            <Route path="/purchases_activity" element={<PurchaseActivityForm />} />
            <Route path="/travel_equipment_activity" element={<TravelOperationForm />} />
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
