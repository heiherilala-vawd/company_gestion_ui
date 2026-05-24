import { data } from 'react-router'
import ReferenceSelectWithCreate from './ReferenceSelectWithCreate.tsx'
import { getMiddleUrl } from '../config/dynamicResources.ts'
import TravelExpenseForm from '../features/money/travel_expenses/TravelExpenseForm.tsx'
import MaterialForm from '../features/storage/materials/MaterialForm.tsx'
import EquipmentForm from '../features/storage/equipment/EquipmentForm.tsx'
import ExpenseForm from '../features/money/expenses/ExpenseForm.tsx'
import JobForm from '../features/transversal/jobs/JobForm.tsx'
import WarehouseForm from '../features/storage/warehouses/WarehouseForm.tsx'
import CompanyForm from '../features/transversal/companies/CompanyForm.tsx'
import UserForm from '../features/transversal/usersSetup/UserForm.tsx'
import IncomeTypeForm from '../features/money/incomeType/IncomeTypeForm.tsx'
import OtherExpenseTypeForm from '../features/money/otherExpenseType/OtherExpenseTypeForm.tsx'
import LeaveTypeForm from '../features/hr/leave_types/LeaveTypeForm.tsx'
import LeaveConfigForm from '../features/hr/leave_configs/LeaveConfigForm.tsx'

export const renderTravelExpenseSelect = (source: any, label: any) => (
  <ReferenceSelectWithCreate
    source={source ? source : 'travel_id'}
    reference="travel_expenses"
    label={label ? label : 'Voyage'}
    optionText={(record: any) => 'Déplacement: ' + (record?.expense?.description || '')}
    createUrlEnd={getMiddleUrl('travel_expenses')}
    createForm={<TravelExpenseForm isCreateForm />}
  />
)

export const renderUserSelect = (source: any, label: any) => (
  <ReferenceSelectWithCreate
    source={source ? source : 'user_id'}
    reference="users"
    label={label ? label : 'Nom de la personne'}
    optionText={(record: any) => record.first_name + ' ' + record.last_name}
    createUrlEnd={getMiddleUrl('users')}
    createForm={<UserForm isCreateForm />}
  />
)

export const renderMaterialSelect = (source: any, label: any) => (
  <ReferenceSelectWithCreate
    source={source ? source : 'material_id'}
    reference="materials"
    label={label ? label : 'Matériau'}
    optionText="name"
    createUrlEnd={getMiddleUrl('materials')}
    createForm={<MaterialForm isCreateForm />}
  />
)

export const renderEquipmentSelect = (source: any, label: any) => (
  <ReferenceSelectWithCreate
    source={source ? source : 'equipment_id'}
    reference="equipment"
    label={label ? label : 'Équipement'}
    optionText="name"
    createUrlEnd={getMiddleUrl('equipment')}
    createForm={<EquipmentForm isCreateForm />}
  />
)

export const renderExpenseSelect = (source: any, label: any) => (
  <ReferenceSelectWithCreate
    source={source ? source : 'expense_id'}
    reference="expenses"
    label={label ? label : 'Dépense'}
    optionText="description"
    createUrlEnd={getMiddleUrl('equipment')}
    createForm={<ExpenseForm isCreateForm />}
  />
)

export const renderCompanySelect = (source: any, label: any) => (
  <ReferenceSelectWithCreate
    source={source ? source : 'company_id'}
    reference="companies"
    label={label ? label : 'Entreprise'}
    optionText="name"
    createUrlEnd={getMiddleUrl('companies')}
    createForm={<CompanyForm isCreateForm />}
  />
)

export const renderJobSelect = (source: any, label: any) => (
  <ReferenceSelectWithCreate
    source={source ? source : 'job_id'}
    reference="jobs"
    label={label ? label : 'Travail'}
    optionText="description"
    createUrlEnd={getMiddleUrl('jobs')}
    createForm={<JobForm isCreateForm />}
  />
)

export const renderIncomeTypeSelect = (source: any, label: any) => (
  <ReferenceSelectWithCreate
    source={source ? source : 'income_type_id'}
    reference="income_types"
    label={label ? label : 'Type de revenu'}
    optionText="name"
    createUrlEnd={getMiddleUrl('income_types')}
    createForm={<IncomeTypeForm isCreateForm />}
  />
)

export const renderWarehouseSelect = (source: any, label: any) => (
  <ReferenceSelectWithCreate
    source={source ? source : 'warehouse_id'}
    reference="warehouses"
    label={label ? label : 'Entrepôt'}
    optionText="name"
    createUrlEnd={getMiddleUrl('warehouses')}
    createForm={<WarehouseForm isCreateForm />}
  />
)

export const renderOtherExpenseTypeSelect = (source: any, label: any) => (
  <ReferenceSelectWithCreate
    source={source ? source : 'other_expense_type_id'}
    reference="other_expense_types"
    label={label ? label : "Type d'autre dépense"}
    optionText="name"
    createUrlEnd={getMiddleUrl('other_expense_types')}
    createForm={<OtherExpenseTypeForm isCreateForm />}
  />
)

export const renderLeaveTypesSelect = (source: any, label: any) => (
  <ReferenceSelectWithCreate
    source={source ? source : 'leave_type_id'}
    reference="leave_types"
    label={label ? label : 'Type de congé'}
    optionText="name"
    createUrlEnd={getMiddleUrl('leave_types')}
    createForm={<LeaveTypeForm isCreateForm />}
  />
)

export const renderLeaveConfigSelect = (source: any, label: any) => (
  <ReferenceSelectWithCreate
    source={source ? source : 'leave_config_id'}
    reference="leave_configs"
    label={label ? label : 'Configuration congés'}
    optionText={(record: any) =>
      (record?.contract_type || '') +
      ' - ' +
      (record?.vacation_days_per_month || '') +
      ' jours/mois'
    }
    createUrlEnd={getMiddleUrl('leave_configs')}
    createForm={<LeaveConfigForm isCreateForm />}
  />
)

export const renderEquipeSelect = (source: any, label: any) => (
  <ReferenceSelectWithCreate
    source={source ? source : 'team_id'}
    reference="teams"
    label={label ? label : 'Équipe'}
    optionText="name"
  />
)
