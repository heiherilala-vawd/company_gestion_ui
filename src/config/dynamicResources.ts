const API_URL = import.meta.env.VITE_API_URL ?? ''

const getUserId = (): string | null => {
  const id = localStorage.getItem('user_id')
  return id && id !== '' ? id : null
}

const RESOURCE_URL_OVERRIDES: Record<string, string> = {
  receipts: 'incomes_receipts',
  equipment: 'equipments',
  material_warehouse: 'material_warehouses',
  equipment_usage: 'equipment_usages',
  material_consumption: 'material_consumptions',
  travel_equipment: 'travel_equipments',
  travel_materials_arrival: 'travel_materials/arrival',
  travel_equipments_arrival: 'travel_equipments/arrival',
  equipment_incident: 'equipment_incidents',
}

const getUrlSegment = (resource: string): string => RESOURCE_URL_OVERRIDES[resource] || resource

//---------------------------------------------------COMPANY-------------------------------------------------------------
export const DYNAMIC_COMPANY_RESOURCES = [
  'jobs',
  'warehouses',
  'equipment',
  'material_warehouse',
  'income_types',
  'materials',
  'other_expense_types',
  'teams',
  'fixed_costs',
  'tasks',
  'task_schedules',
  'maintenance_schedules',
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
  'organizations',
  'cars',
  'notifications',
  'travel_materials_arrival',
  'travel_equipments_arrival',
  'equipment_incident',
] as const

export type DynamicCompanyResource = (typeof DYNAMIC_COMPANY_RESOURCES)[number]

export const isDynamicCompanyResource = (resource: string): boolean => {
  return DYNAMIC_COMPANY_RESOURCES.includes(resource as DynamicCompanyResource)
}

export const getCompanyPath = (): string => {
  const userId = getUserId()
  return `/users/${userId}/companies`
}

export const getMiddleUrlDynamicCompanyResource = (resource: string): string => {
  const userId = getUserId()
  const companyId = localStorage.getItem('currentCompanyId')
  if (!userId || !companyId) {
    console.warn(
      `Missing context: userId=${userId}, companyId=${companyId} for resource=${resource}`,
    )
  }
  return `/users/${userId}/companies/${companyId}/${getUrlSegment(resource)}`
}

//---------------------------------------------------CASH_ACCOUNTS-------------------------------------------------------------
export const DYNAMIC_CASH_ACCOUNTS_RESOURCES = ['cash_transactions'] as const

export type DynamicCashAccountsResource = (typeof DYNAMIC_CASH_ACCOUNTS_RESOURCES)[number]

export const isDynamicCashAccountsResource = (resource: string): boolean => {
  return DYNAMIC_CASH_ACCOUNTS_RESOURCES.includes(resource as DynamicCashAccountsResource)
}

export const getMiddleUrlDynamicCashAccountsResource = (): string => {
  const userId = getUserId()
  const companyId = localStorage.getItem('currentCompanyId')
  const cashAccountId = localStorage.getItem('currentCashAccountId')
  if (!userId || !companyId || !cashAccountId) {
    console.warn(
      `Missing context: userId=${userId}, companyId=${companyId}, cashAccountId=${cashAccountId}`,
    )
  }
  return `/users/${userId}/companies/${companyId}/cash_accounts/${cashAccountId}/transactions`
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
  const userId = getUserId()
  const companyId = localStorage.getItem('currentCompanyId')
  const jobId = localStorage.getItem('currentJobId')
  if (!userId || !companyId || !jobId) {
    console.warn(
      `Missing context: userId=${userId}, companyId=${companyId}, jobId=${jobId} for resource=${resource}`,
    )
  }
  return `/users/${userId}/companies/${companyId}/jobs/${jobId}/${getUrlSegment(resource)}`
}

//----------------------------------------------------------------------------------------------------------

export const getMiddleUrl = (resource: string): string => {
  let url = `${API_URL}/${resource}`
  if (resource === 'users') {
    const companyId = localStorage.getItem('currentCompanyId')
    url = `${API_URL}/users`
    if (companyId) url += `?company_id=${companyId}`
  } else if (resource === 'companies') {
    const userId = getUserId()
    url = `${API_URL}/users/${userId}/companies`
  } else if (isDynamicCompanyResource(resource)) {
    url = `${API_URL}${getMiddleUrlDynamicCompanyResource(resource)}`
  } else if (isDynamicJobResource(resource)) {
    url = `${API_URL}${getMiddleUrlDynamicJobResource(resource)}`
  } else if (isDynamicCashAccountsResource(resource)) {
    url = `${API_URL}${getMiddleUrlDynamicCashAccountsResource()}`
  }
  return url
}

export const getMiddleUrlWithId = (resource: string, resourceId: string): string => {
  let url = `${API_URL}/${resource}/${resourceId}`
  if (resource === 'companies') {
    const userId = getUserId()
    url = `${API_URL}/users/${userId}/companies/${resourceId}`
  } else if (isDynamicCompanyResource(resource)) {
    url = `${API_URL}${getMiddleUrlDynamicCompanyResource(resource)}/${resourceId}`
  } else if (isDynamicJobResource(resource)) {
    url = `${API_URL}${getMiddleUrlDynamicJobResource(resource)}/${resourceId}`
  } else if (isDynamicCashAccountsResource(resource)) {
    url = `${API_URL}${getMiddleUrlDynamicCashAccountsResource()}/${resourceId}`
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
  if (resource === 'companies') {
    const userId = getUserId()
    url = `${API_URL}/users/${userId}/companies${queryString ? `?${queryString}` : ''}`
  } else if (isDynamicCompanyResource(resource)) {
    url = `${API_URL}${getMiddleUrlDynamicCompanyResource(resource)}${queryString ? `?${queryString}` : ''}`
  } else if (isDynamicJobResource(resource)) {
    url = `${API_URL}${getMiddleUrlDynamicJobResource(resource)}${queryString ? `?${queryString}` : ''}`
  } else if (isDynamicCashAccountsResource(resource)) {
    url = `${API_URL}${getMiddleUrlDynamicCashAccountsResource()}${queryString ? `?${queryString}` : ''}`
  }
  return url
}
