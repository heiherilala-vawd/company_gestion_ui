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

import HomePage from '../features/HomePage'
import SimplePage from '../features/SimplePage'
import PurchaseActivityForm from '../features/money/purchase_operation/PurchaseActivityForm'
import TravelOperationForm from '../features/storage/travel_operation/TravelOperationForm'
import { CompanyProvider } from '../features/transversal/companies/CompanyContext.tsx'
import { JobProvider } from '../features/transversal/jobs/JobContext.tsx'
import { ExpenseProvider } from '../features/money/expenses/ExpenseContext.tsx'
import { Route } from 'react-router-dom'

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
            <Resource name="employee_payments" {...EmployerPaymentResource} />
            <Resource name="travel_people" {...TravelPeopleResource} />
            <Resource name="travel_materials" {...TravelMaterialResource} />
            <Resource name="travel_equipment" {...TravelEquipmentResource} />
            <Resource name="incomes" {...IncomeResource} />
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
