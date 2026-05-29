const API_URL = import.meta.env.VITE_API_URL ?? ''

const userId: string | null = localStorage.getItem('user_id')

const RESOURCE_URL_OVERRIDES: Record<string, string> = {
  receipts: 'incomes_receipts',
  loan_repayments: 'loans_repayment',
}

//---------------------------------------------------COMPANY-------------------------------------------------------------
export const DYNAMIC_COMPANY_RESOURCES = [
  'jobs',
  'warehouses',
  'equipment',
  'material_warehouse',
  'income_types',
  'materials',
  'users',
  'other_expense_types',
  'teams',
  'fixed_costs',
  'tasks',
  'task_schedules',
  'departments',
  'budget_lines',
  'cash_accounts',
  'equipment_usage',
  'material_consumption',
  'maintenances',
  'leave_types',
  'leave_configs',
  'leaves',
  'leave_balances',
  'suppliers',
  'purchase_orders',
] as const

export type DynamicCompanyResource = (typeof DYNAMIC_COMPANY_RESOURCES)[number]

export const isDynamicCompanyResource = (resource: string): boolean => {
  return DYNAMIC_COMPANY_RESOURCES.includes(resource as DynamicCompanyResource)
}

export const getMiddleUrlDynamicCompanyResource = (resource: string): string => {
  const companyId = localStorage.getItem('currentCompanyId')
  return '/companies/' + companyId + '/' + resource
}

//---------------------------------------------------CASH_ACCOUNTS-------------------------------------------------------------
export const DYNAMIC_CASH_ACCOUNTS_RESOURCES = ['cash_transactions'] as const

export type DynamicCashAccountsResource = (typeof DYNAMIC_CASH_ACCOUNTS_RESOURCES)[number]

export const isDynamicCashAccountsResource = (resource: string): boolean => {
  return DYNAMIC_CASH_ACCOUNTS_RESOURCES.includes(resource as DynamicCashAccountsResource)
}

export const getMiddleUrlDynamicCashAccountsResource = (resource: string): string => {
  void resource
  const companyId = localStorage.getItem('currentCompanyId')
  const cashAccountId = localStorage.getItem('currentCashAccountId')
  return '/companies/' + companyId + '/cash_accounts/' + cashAccountId + '/transactions'
}

//---------------------------------------------------JOB-------------------------------------------------------------
export const DYNAMIC_JOB_RESOURCES = [
  'expenses',
  'incomes',
  'purchase_operations',
  'travel_operations',
  'travel_expenses',
  'purchases',
  'bank_fees',
  'other_expenses',
  'employee_payments',
  'loans',
  'receipts',
  'loan_repayments',
  'travel_people',
  'travel_materials',
  'travel_equipment',
] as const

export type DynamicJobResource = (typeof DYNAMIC_JOB_RESOURCES)[number]

export const isDynamicJobResource = (resource: string): boolean => {
  return DYNAMIC_JOB_RESOURCES.includes(resource as DynamicJobResource)
}

export const getMiddleUrlDynamicJobResource = (resource: string): string => {
  const companyId = localStorage.getItem('currentCompanyId')
  const jobId = localStorage.getItem('currentJobId')
  const urlSegment = RESOURCE_URL_OVERRIDES[resource] || resource
  return '/companies/' + companyId + '/job/' + jobId + '/user/' + userId + '/' + urlSegment
}

//----------------------------------------------------------------------------------------------------------

export const getMiddleUrl = (resource: string): string => {
  let url = `${API_URL}/${resource}`
  if (isDynamicCompanyResource(resource)) {
    url = `${API_URL}${getMiddleUrlDynamicCompanyResource(resource)}`
  } else if (isDynamicJobResource(resource)) {
    url = `${API_URL}${getMiddleUrlDynamicJobResource(resource)}`
  } else if (isDynamicCashAccountsResource(resource)) {
    url = `${API_URL}${getMiddleUrlDynamicCashAccountsResource(resource)}`
  }
  return url
}

export const getMiddleUrlWithId = (resource: string, resourceId: string): string => {
  let url = `${API_URL}/${resource}/${resourceId}`
  if (isDynamicCompanyResource(resource)) {
    url = `${API_URL}${getMiddleUrlDynamicCompanyResource(resource)}/${resourceId}`
  } else if (isDynamicJobResource(resource)) {
    url = `${API_URL}${getMiddleUrlDynamicJobResource(resource)}/${resourceId}`
  } else if (isDynamicCashAccountsResource(resource)) {
    url = `${API_URL}${getMiddleUrlDynamicCashAccountsResource(resource)}/${resourceId}`
  }
  return url
}

export const getMiddleUrlWithQuery = (
  resource: string,
  queryString,
  filterDefaultValues: any,
): string => {
  void filterDefaultValues
  let url = `${API_URL}/${resource}${queryString ? `?${queryString}` : ''}`
  if (isDynamicCompanyResource(resource)) {
    url = `${API_URL}${getMiddleUrlDynamicCompanyResource(resource)}${queryString ? `?${queryString}` : ''}`
  } else if (isDynamicJobResource(resource)) {
    url = `${API_URL}${getMiddleUrlDynamicJobResource(resource)}${queryString ? `?${queryString}` : ''}`
  } else if (isDynamicCashAccountsResource(resource)) {
    url = `${API_URL}${getMiddleUrlDynamicCashAccountsResource(resource)}${queryString ? `?${queryString}` : ''}`
  }
  return url
}
