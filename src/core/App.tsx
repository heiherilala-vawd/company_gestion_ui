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
import LoanResource from '../features/money/loans'
import LoanRepaymentResource from '../features/money/loan_repayments'
import ReceiptResource from '../features/money/receipts'
import LeavesResource from '../features/hr/leaves'
import LeaveTypeResource from '../features/hr/leave_types'
import LeaveConfigResource from '../features/hr/leave_configs'
import FixedCostResource from '../features/money/fixed_costs'
import TasksResource from '../features/transversal/tasks'
import TaskScheduleResource from '../features/transversal/task_schedules'
import MaintenanceScheduleResource from '../features/transversal/maintenance_schedules'
import BudgetLineResource from '../features/money/budget_lines'
import CashAccountResource from '../features/money/cash_accounts'
import CashTransactionResource from '../features/money/cash_transactions'
import EquipmentUsageResource from '../features/storage/equipment_usage'
import MaterialConsumptionResource from '../features/storage/material_consumption'
import MaterialWarehouseResource from '../features/storage/material_warehouse'
import MaintenanceResource from '../features/storage/maintenances'
import VoitureResource from '../features/storage/voitures'
import LeaveBalanceResource from '../features/hr/leave_balances'
import SupplierResource from '../features/transversal/suppliers'
import PurchaseOrderResource from '../features/transversal/purchase_orders'
import OrganizationResource from '../features/transversal/organizations'
import DepartmentResource from '../features/transversal/departments'
import TeamResource from '../features/transversal/teams'
import IncomeTypeResource from '../features/money/incomeType'
import OtherExpenseTypeResource from '../features/money/otherExpenseType'
import YearlyReport from '../features/reports'
import HistoryResource from '../features/transversal/histories'
import MaterialDashboard from '../features/reports/MaterialDashboard'
import EquipmentDashboard from '../features/reports/EquipmentDashboard'
import HrDashboard from '../features/reports/HrDashboard'
import MonetaryDashboard from '../features/reports/MonetaryDashboard'

import HomePage from '../features/HomePage'
import EmployerPaymentActivity from '../features/EmployerPaymentActivity'
import IncomesActivity from '../features/IncomesActivity'
import ExpensesActivity from '../features/ExpensesActivity'
import TravelMaterialActivity from '../features/TravelMaterialActivity'
import PurchaseActivityForm from '../features/money/purchase_operation/PurchaseActivityForm'

import EmployeePaymentActivity from '../features/EmployeePaymentActivity'
import TeamActivity from '../features/TeamActivity'
import JobAssignmentActivity from '../features/JobAssignmentActivity'
import TravelPeopleActivity from '../features/TravelPeopleActivity'
import PurchaseMaterialActivity from '../features/PurchaseMaterialActivity'
import MaterialConsumptionActivity from '../features/MaterialConsumptionActivity'
import MaterialReturnActivity from '../features/MaterialReturnActivity'
import TravelMaterialActivityForm from '../features/TravelMaterialActivityForm'
import PurchaseEquipmentActivity from '../features/PurchaseEquipmentActivity'
import EquipmentUsageActivity from '../features/EquipmentUsageActivity'
import EquipmentReturnActivity from '../features/EquipmentReturnActivity'
import TravelEquipmentActivityForm from '../features/TravelEquipmentActivityForm'
import MaintenanceActivity from '../features/MaintenanceActivity'
import ScheduledMaintenanceActivity from '../features/ScheduledMaintenanceActivity'
import CompanyPage from '../features/sections/CompanyPage'
import RHPage from '../features/sections/RHPage'
import StockPage from '../features/sections/StockPage'
import EquipmentPage from '../features/sections/EquipmentPage'
import MonetaryPage from '../features/sections/MonetaryPage'
import NotificationsList from '../features/notifications/NotificationsList'
import { CompanyProvider } from '../features/transversal/companies/CompanyContext.tsx'
import { JobProvider } from '../features/transversal/jobs/JobContext.tsx'
import { ExpenseProvider } from '../features/money/expenses/ExpenseContext.tsx'
import { LoanProvider } from '../features/money/loans/LoanContext.tsx'
import { IncomeProvider } from '../features/money/incomes/IncomeContext.tsx'
import { CashAccountProvider } from '../features/money/cash_accounts/CashAccountContext.tsx'
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
          <LoanProvider>
            <IncomeProvider>
              <CashAccountProvider>
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
                    <Route
                      path="/travel_equipment_activity"
                      element={<TravelEquipmentActivityForm />}
                    />
                    <Route path="/expenses_activity" element={<ExpensesActivity />} />
                    <Route
                      path="/employer_payments_activity"
                      element={<EmployerPaymentActivity />}
                    />
                    <Route path="/incomes_activity" element={<IncomesActivity />} />
                    <Route path="/travel_materials_activity" element={<TravelMaterialActivity />} />
                    <Route
                      path="/employee_payment_activity"
                      element={<EmployeePaymentActivity />}
                    />
                    <Route path="/team_activity" element={<TeamActivity />} />
                    <Route path="/job_assignment_activity" element={<JobAssignmentActivity />} />
                    <Route path="/travel_people_activity" element={<TravelPeopleActivity />} />
                    <Route
                      path="/purchases_material_activity"
                      element={<PurchaseMaterialActivity />}
                    />
                    <Route
                      path="/material_consumption_activity"
                      element={<MaterialConsumptionActivity />}
                    />
                    <Route path="/material_return_activity" element={<MaterialReturnActivity />} />
                    <Route
                      path="/travel_material_activity"
                      element={<TravelMaterialActivityForm />}
                    />
                    <Route
                      path="/purchases_equipment_activity"
                      element={<PurchaseEquipmentActivity />}
                    />
                    <Route path="/equipment_usage_activity" element={<EquipmentUsageActivity />} />
                    <Route
                      path="/equipment_return_activity"
                      element={<EquipmentReturnActivity />}
                    />
                    <Route path="/maintenance_activity" element={<MaintenanceActivity />} />
                    <Route
                      path="/scheduled_maintenance_activity"
                      element={<ScheduledMaintenanceActivity />}
                    />
                    <Route path="/company" element={<CompanyPage />} />
                    <Route path="/rh" element={<RHPage />} />
                    <Route path="/stock" element={<StockPage />} />
                    <Route path="/equipment-hub" element={<EquipmentPage />} />
                    <Route path="/monetary" element={<MonetaryPage />} />
                    <Route path="/yearly-report" element={<YearlyReport />} />
                    <Route path="/leave_balances" element={<LeaveBalanceResource.list />} />
                    <Route path="/material-dashboard" element={<MaterialDashboard />} />
                    <Route path="/equipment-dashboard" element={<EquipmentDashboard />} />
                    <Route path="/hr-dashboard" element={<HrDashboard />} />
                    <Route path="/monetary-dashboard" element={<MonetaryDashboard />} />
                    <Route path="/notifications" element={<NotificationsList />} />
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
                  <Resource name="loans" {...LoanResource} />
                  <Resource name="loan_repayments" {...LoanRepaymentResource} />
                  <Resource name="receipts" {...ReceiptResource} />
                  <Resource name="suppliers" {...SupplierResource} />
                  <Resource name="purchase_orders" {...PurchaseOrderResource} />
                  <Resource name="organizations" {...OrganizationResource} />
                  <Resource name="teams" {...TeamResource} />
                  <Resource name="departments" {...DepartmentResource} />
                  <Resource name="income_types" {...IncomeTypeResource} />
                  <Resource name="other_expense_types" {...OtherExpenseTypeResource} />
                  <Resource name="leave_types" {...LeaveTypeResource} />
                  <Resource name="leave_configs" {...LeaveConfigResource} />
                  <Resource name="fixed_costs" {...FixedCostResource} />
                  <Resource name="tasks" {...TasksResource} />
                  <Resource name="task_schedules" {...TaskScheduleResource} />
                  <Resource name="maintenance_schedules" {...MaintenanceScheduleResource} />
                  <Resource name="budget_lines" {...BudgetLineResource} />
                  <Resource name="cash_accounts" {...CashAccountResource} />
                  <Resource name="cash_transactions" {...CashTransactionResource} />
                  <Resource name="equipment_usage" {...EquipmentUsageResource} />
                  <Resource name="material_consumption" {...MaterialConsumptionResource} />
                  <Resource name="material_warehouse" {...MaterialWarehouseResource} />
                  <Resource name="maintenances" {...MaintenanceResource} />
                  <Resource name="voitures" {...VoitureResource} />
                  <Resource name="histories" {...HistoryResource} />
                  <Resource name="leaves" {...LeavesResource} />
                </Admin>
              </CashAccountProvider>
            </IncomeProvider>
          </LoanProvider>
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
