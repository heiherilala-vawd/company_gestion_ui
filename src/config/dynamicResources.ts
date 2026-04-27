const userId: string | null = localStorage.getItem('user_id')

/**
 * Liste des ressources qui nécessitent un companyId dans l'URL
 */
export const DYNAMIC_COMPANY_RESOURCES = ['jobs', 'warehouses', 'equipment'] as const

// Type pour les ressources dynamiques (TypeScript)
export type DynamicCompanyResource = (typeof DYNAMIC_COMPANY_RESOURCES)[number]

/**
 * Vérifie si une ressource est dynamique (nécessite companyId)
 */
export const isDynamicCompanyResource = (resource: string): boolean => {
  return DYNAMIC_COMPANY_RESOURCES.includes(resource as DynamicCompanyResource)
}

export const getMiddleUrlDynamicCompanyResource = (resource: string, companyId: string): string => {
  return '/companies/' + companyId + '/' + resource
}

/**
 * Liste des ressources qui nécessitent un JOB dans l'URL
 */
export const DYNAMIC_JOB_RESOURCES = ['expenses', 'incomes', 'equipment'] as const

// Type pour les ressources dynamiques (TypeScript)
export type DynamicJobResource = (typeof DYNAMIC_JOB_RESOURCES)[number]

/**
 * Vérifie si une ressource est dynamique (nécessite companyId)
 */
export const isDynamicJobResource = (resource: string): boolean => {
  return DYNAMIC_JOB_RESOURCES.includes(resource as DynamicJobResource)
}
export const getMiddleUrlDynamicJobResource = (
  resource: string,
  companyId: string,
  jobId: string,
): string => {
  return '/companies/' + companyId + '/job/' + jobId + '/user/' + userId + '/' + resource
}

/**
 * Liste des ressources qui nécessitent un EXPENSES dans l'URL
 */
export const DYNAMIC_EXPENSES_RESOURCES = [
  'travel_expenses',
  'purchases',
  'bank_fees',
  'other_expenses',
  'employee_payments',
] as const

// Type pour les ressources dynamiques (TypeScript)
export type DynamicExpensesResource = (typeof DYNAMIC_EXPENSES_RESOURCES)[number]

/**
 * Vérifie si une ressource est dynamique (nécessite companyId)
 */
export const isDynamicExpensesResource = (resource: string): boolean => {
  return DYNAMIC_EXPENSES_RESOURCES.includes(resource as DynamicExpensesResource)
}
export const getMiddleUrlDynamicExpensesResource = (
  resource: string,
  companyId: string,
  jobId: string,
  expenseId: string,
): string => {
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
export const getMiddleUrlDynamicTravelExpensesResource = (
  resource: string,
  companyId: string,
  jobId: string,
  expenseId: string,
  travelExpenseId: string,
): string => {
  return (
    '/companies/' +
    companyId +
    '/job/' +
    jobId +
    '/user/' +
    userId +
    '/expenses/' +
    expenseId +
    '/travel_expenses/' +
    travelExpenseId +
    '/' +
    resource
  )
}
