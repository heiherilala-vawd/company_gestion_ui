import React from 'react'
import { Admin, Resource, CustomRoutes } from 'react-admin'
import { Layout } from './Layout'
import { dataProvider } from '../auth/dataProvider'
import authProvider from '../auth/authProvider'
import { lightTheme, darkTheme } from '../style/theme'
import { ThemeProvider, useThemeMode } from '../style/ThemeContext'

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
import EmployerPaymentResource from '../features/money/employee_payments'
import IncomeResource from '../features/money/incomes'
import LeavesResource from '../features/hr/leaves'

import HomePage from '../features/HomePage'
import EmployerPaymentActivity from '../features/EmployerPaymentActivity'
import IncomesActivity from '../features/IncomesActivity'
import ExpensesActivity from '../features/ExpensesActivity'
import TravelMaterialActivity from '../features/TravelMaterialActivity'
import PurchaseActivityForm from '../features/money/purchase_operation/PurchaseActivityForm'
import TravelOperationForm from '../features/storage/travel_operation/TravelOperationForm'
import RHPage from '../features/sections/RHPage'
import StockPage from '../features/sections/StockPage'
import EquipmentPage from '../features/sections/EquipmentPage'
import MonetaryPage from '../features/sections/MonetaryPage'
import { CompanyProvider } from '../features/transversal/companies/CompanyContext.tsx'
import { JobProvider } from '../features/transversal/jobs/JobContext.tsx'
import { ExpenseProvider } from '../features/money/expenses/ExpenseContext.tsx'
import { Route } from 'react-router-dom'
import { CustomLogin } from '../auth/CustomLogin'
import { RegisterPage } from '../auth/RegisterPage'

const ThemedAdmin = () => {
  const { mode } = useThemeMode()
  const theme = mode === 'light' ? lightTheme : darkTheme

  return (
    <CompanyProvider>
      <JobProvider>
        <ExpenseProvider>
          <Admin
            theme={theme}
            dashboard={HomePage}
            layout={Layout}
            loginPage={CustomLogin}
            dataProvider={dataProvider}
            authProvider={authProvider}
          >
            <CustomRoutes noLayout>
              <Route path="/register" element={<RegisterPage />} />
            </CustomRoutes>
            <CustomRoutes>
              <Route path="/purchases_activity" element={<PurchaseActivityForm />} />
              <Route path="/travel_equipment_activity" element={<TravelOperationForm />} />
              <Route path="/expenses_activity" element={<ExpensesActivity />} />
              <Route path="/employer_payments_activity" element={<EmployerPaymentActivity />} />
              <Route path="/incomes_activity" element={<IncomesActivity />} />
              <Route path="/travel_materials_activity" element={<TravelMaterialActivity />} />
              <Route path="/rh" element={<RHPage />} />
              <Route path="/stock" element={<StockPage />} />
              <Route path="/equipment-hub" element={<EquipmentPage />} />
              <Route path="/monetary" element={<MonetaryPage />} />
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
            <Resource name="employee_payments" {...EmployerPaymentResource} />
            <Resource name="travel_people" {...TravelPeopleResource} />
            <Resource name="travel_materials" {...TravelMaterialResource} />
            <Resource name="travel_equipment" {...TravelEquipmentResource} />
            <Resource name="incomes" {...IncomeResource} />
            <Resource name="leave_types" />
            <Resource name="leave_configs" />
            <Resource name="leaves" {...LeavesResource} />
          </Admin>
        </ExpenseProvider>
      </JobProvider>
    </CompanyProvider>
  )
}

export const App = () => (
  <ThemeProvider>
    <ThemedAdmin />
  </ThemeProvider>
)

export default App
