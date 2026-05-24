const API_URL = import.meta.env.VITE_API_URL ?? ''

const userId: string | null = localStorage.getItem('user_id')
//---------------------------------------------------COMPANY-------------------------------------------------------------
/**
 * Liste des ressources qui nécessitent un companyId dans l'URL
 */
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
  'cash_transactions',
  'equipment_usage',
  'material_consumption',
  'maintenances',
  'leave_types',
  'leave_configs',
  'leaves',
  'leave_balances',
] as const

// Type pour les ressources dynamiques (TypeScript)
export type DynamicCompanyResource = (typeof DYNAMIC_COMPANY_RESOURCES)[number]

/**
 * Vérifie si une ressource est dynamique (nécessite companyId)
 */
export const isDynamicCompanyResource = (resource: string): boolean => {
  return DYNAMIC_COMPANY_RESOURCES.includes(resource as DynamicCompanyResource)
}

export const getMiddleUrlDynamicCompanyResource = (resource: string): string => {
  const companyId = localStorage.getItem('currentCompanyId')
  return '/companies/' + companyId + '/' + resource
}

//---------------------------------------------------JOB-------------------------------------------------------------

/**
 * Liste des ressources qui nécessitent un JOB dans l'URL
 */
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
] as const

// Type pour les ressources dynamiques (TypeScript)
export type DynamicJobResource = (typeof DYNAMIC_JOB_RESOURCES)[number]

/**
 * Vérifie si une ressource est dynamique (nécessite companyId)
 */
export const isDynamicJobResource = (resource: string): boolean => {
  return DYNAMIC_JOB_RESOURCES.includes(resource as DynamicJobResource)
}
export const getMiddleUrlDynamicJobResource = (resource: string): string => {
  const companyId = localStorage.getItem('currentCompanyId')
  const jobId = localStorage.getItem('currentJobId')
  return '/companies/' + companyId + '/job/' + jobId + '/user/' + userId + '/' + resource
}

//---------------------------------------------------EXPENSE-------------------------------------------------------------

/**
 * Liste des ressources qui nécessitent un EXPENSES dans l'URL
 */
export const DYNAMIC_EXPENSES_RESOURCES = [] as const

// Type pour les ressources dynamiques (TypeScript)
export type DynamicExpensesResource = (typeof DYNAMIC_EXPENSES_RESOURCES)[number]

/**
 * Vérifie si une ressource est dynamique (nécessite companyId)
 */
export const isDynamicExpensesResource = (resource: string): boolean => {
  return DYNAMIC_EXPENSES_RESOURCES.includes(resource as DynamicExpensesResource)
}
export const getMiddleUrlDynamicExpensesResource = (resource: string): string => {
  const companyId = localStorage.getItem('currentCompanyId')
  const jobId = localStorage.getItem('currentJobId')
  const expenseId = localStorage.getItem('currentExpenseId')
  return (
    '/companies/' +
    companyId +
    '/job/' +
    jobId +
    '/user/' +
    userId +
    '/expenses/' +
    expenseId +
    '/' +
    resource
  )
}

//---------------------------------------------------TRAVEL_EXPENSE-------------------------------------------------------------
/**
 * Liste des ressources qui nécessitent un EXPENSES dans l'URL
 */
export const DYNAMIC_TRAVEL_EXPENSES_RESOURCES = [
  'travel_people',
  'travel_materials',
  'travel_equipment',
] as const

// Type pour les ressources dynamiques (TypeScript)
export type DynamicTravelExpensesResource = (typeof DYNAMIC_TRAVEL_EXPENSES_RESOURCES)[number]

/**
 * Vérifie si une ressource est dynamique (nécessite companyId)
 */
export const isDynamicTravelExpensesResource = (resource: string): boolean => {
  return DYNAMIC_TRAVEL_EXPENSES_RESOURCES.includes(resource as DynamicTravelExpensesResource)
}
export const getMiddleUrlDynamicTravelExpensesResource = (resource: string): string => {
  const companyId = localStorage.getItem('currentCompanyId')
  const jobId = localStorage.getItem('currentJobId')
  const travelExpenseId = localStorage.getItem('currentTravelExpenseId')
  return (
    '/companies/' +
    companyId +
    '/job/' +
    jobId +
    '/user/' +
    userId +
    '/travel_expenses/' +
    travelExpenseId +
    '/' +
    resource
  )
}

//---------------------------------------------------LOANS-------------------------------------------------------------
/**
 * Liste des ressources qui nécessitent un LOAN dans l'URL
 */
export const DYNAMIC_LOANS_RESOURCES = ['loan_repayments'] as const

// Type pour les ressources dynamiques (TypeScript)
export type DynamicLoansResource = (typeof DYNAMIC_LOANS_RESOURCES)[number]

/**
 * Vérifie si une ressource est dynamique (nécessite loanId)
 */
export const isDynamicLoansResource = (resource: string): boolean => {
  return DYNAMIC_LOANS_RESOURCES.includes(resource as DynamicLoansResource)
}
export const getMiddleUrlDynamicLoansResource = (resource: string): string => {
  const companyId = localStorage.getItem('currentCompanyId')
  const jobId = localStorage.getItem('currentJobId')
  const loanId = localStorage.getItem('currentLoanId')
  return (
    '/companies/' +
    companyId +
    '/job/' +
    jobId +
    '/user/' +
    userId +
    '/loans/' +
    loanId +
    '/' +
    resource
  )
}

//---------------------------------------------------INCOMES-------------------------------------------------------------
/**
 * Liste des ressources qui nécessitent un INCOME dans l'URL
 */
export const DYNAMIC_INCOMES_RESOURCES = ['receipts'] as const

// Type pour les ressources dynamiques (TypeScript)
export type DynamicIncomesResource = (typeof DYNAMIC_INCOMES_RESOURCES)[number]

/**
 * Vérifie si une ressource est dynamique (nécessite incomeId)
 */
export const isDynamicIncomesResource = (resource: string): boolean => {
  return DYNAMIC_INCOMES_RESOURCES.includes(resource as DynamicIncomesResource)
}
export const getMiddleUrlDynamicIncomesResource = (resource: string): string => {
  const companyId = localStorage.getItem('currentCompanyId')
  const jobId = localStorage.getItem('currentJobId')
  const incomeId = localStorage.getItem('currentIncomeId')
  return (
    '/companies/' +
    companyId +
    '/job/' +
    jobId +
    '/user/' +
    userId +
    '/incomes/' +
    incomeId +
    '/' +
    resource
  )
}

//----------------------------------------------------------------------------------------------------------

export const getMiddleUrl = (resource: string): string => {
  let url = `${API_URL}/${resource}`
  if (isDynamicCompanyResource(resource)) {
    url = `${API_URL}${getMiddleUrlDynamicCompanyResource(resource)}`
  } else if (isDynamicJobResource(resource)) {
    url = `${API_URL}${getMiddleUrlDynamicJobResource(resource)}`
  } else if (isDynamicExpensesResource(resource)) {
    url = `${API_URL}${getMiddleUrlDynamicExpensesResource(resource)}`
  } else if (isDynamicTravelExpensesResource(resource)) {
    url = `${API_URL}${getMiddleUrlDynamicTravelExpensesResource(resource)}`
  } else if (isDynamicLoansResource(resource)) {
    url = `${API_URL}${getMiddleUrlDynamicLoansResource(resource)}`
  } else if (isDynamicIncomesResource(resource)) {
    url = `${API_URL}${getMiddleUrlDynamicIncomesResource(resource)}`
  }
  return url
}

export const getMiddleUrlWithId = (resource: string, resourceId: string): string => {
  let url = `${API_URL}/${resource}/${resourceId}`
  if (isDynamicCompanyResource(resource)) {
    url = `${API_URL}${getMiddleUrlDynamicCompanyResource(resource)}/${resourceId}`
  } else if (isDynamicJobResource(resource)) {
    url = `${API_URL}${getMiddleUrlDynamicJobResource(resource)}/${resourceId}`
  } else if (isDynamicExpensesResource(resource)) {
    url = `${API_URL}${getMiddleUrlDynamicExpensesResource(resource)}/${resourceId}`
  } else if (isDynamicTravelExpensesResource(resource)) {
    url = `${API_URL}${getMiddleUrlDynamicTravelExpensesResource(resource)}/${resourceId}`
  } else if (isDynamicLoansResource(resource)) {
    url = `${API_URL}${getMiddleUrlDynamicLoansResource(resource)}/${resourceId}`
  } else if (isDynamicIncomesResource(resource)) {
    url = `${API_URL}${getMiddleUrlDynamicIncomesResource(resource)}/${resourceId}`
  }
  return url
}

export const getMiddleUrlWithQuery = (
  resource: string,
  queryString,
  filterDefaultValues: any,
): string => {
  let url = `${API_URL}/${resource}${queryString ? `?${queryString}` : ''}`
  if (isDynamicCompanyResource(resource)) {
    url = `${API_URL}${getMiddleUrlDynamicCompanyResource(resource)}${queryString ? `?${queryString}` : ''}`
  } else if (isDynamicJobResource(resource)) {
    url = `${API_URL}${getMiddleUrlDynamicJobResource(resource)}${queryString ? `?${queryString}` : ''}`
  } else if (isDynamicExpensesResource(resource)) {
    url = `${API_URL}${getMiddleUrlDynamicExpensesResource(resource)}${queryString ? `?${queryString}` : ''}`
  } else if (isDynamicTravelExpensesResource(resource)) {
    url = `${API_URL}${getMiddleUrlDynamicTravelExpensesResource(resource)}${queryString ? `?${queryString}` : ''}`
  } else if (isDynamicLoansResource(resource)) {
    url = `${API_URL}${getMiddleUrlDynamicLoansResource(resource)}${queryString ? `?${queryString}` : ''}`
  } else if (isDynamicIncomesResource(resource)) {
    url = `${API_URL}${getMiddleUrlDynamicIncomesResource(resource)}${queryString ? `?${queryString}` : ''}`
  }
  return url
}
