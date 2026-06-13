import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
  isDynamicCompanyResource,
  isDynamicJobResource,
  isDynamicCashAccountsResource,
  getMiddleUrl,
  getMiddleUrlWithId,
  getMiddleUrlWithQuery,
  DYNAMIC_COMPANY_RESOURCES,
  DYNAMIC_JOB_RESOURCES,
  DYNAMIC_CASH_ACCOUNTS_RESOURCES,
} from '../../config/dynamicResources'

beforeEach(() => {
  localStorage.clear()
  localStorage.setItem('user_id', 'user1')
  localStorage.setItem('currentCompanyId', 'comp1')
  localStorage.setItem('currentJobId', 'job1')
  localStorage.setItem('currentCashAccountId', 'ca1')
})

describe('DYNAMIC_COMPANY_RESOURCES', () => {
  it('includes jobs', () => {
    expect(DYNAMIC_COMPANY_RESOURCES.includes('jobs')).toBe(true)
  })

  it('includes warehouses', () => {
    expect(DYNAMIC_COMPANY_RESOURCES.includes('warehouses')).toBe(true)
  })

  it('does not include companies', () => {
    expect(DYNAMIC_COMPANY_RESOURCES.includes('companies')).toBe(false)
  })

  it('does not include users', () => {
    expect(DYNAMIC_COMPANY_RESOURCES.includes('users')).toBe(false)
  })
})

describe('DYNAMIC_JOB_RESOURCES', () => {
  it('includes expenses', () => {
    expect(DYNAMIC_JOB_RESOURCES.includes('expenses')).toBe(true)
  })

  it('includes incomes', () => {
    expect(DYNAMIC_JOB_RESOURCES.includes('incomes')).toBe(true)
  })
})

describe('DYNAMIC_CASH_ACCOUNTS_RESOURCES', () => {
  it('includes cash_transactions', () => {
    expect(DYNAMIC_CASH_ACCOUNTS_RESOURCES.includes('cash_transactions')).toBe(true)
  })
})

describe('isDynamicCompanyResource', () => {
  it('returns true for jobs', () => {
    expect(isDynamicCompanyResource('jobs')).toBe(true)
  })

  it('returns true for warehouses', () => {
    expect(isDynamicCompanyResource('warehouses')).toBe(true)
  })

  it('returns false for companies', () => {
    expect(isDynamicCompanyResource('companies')).toBe(false)
  })

  it('returns false for users', () => {
    expect(isDynamicCompanyResource('users')).toBe(false)
  })
})

describe('isDynamicJobResource', () => {
  it('returns true for expenses', () => {
    expect(isDynamicJobResource('expenses')).toBe(true)
  })

  it('returns true for incomes', () => {
    expect(isDynamicJobResource('incomes')).toBe(true)
  })

  it('returns false for jobs', () => {
    expect(isDynamicJobResource('jobs')).toBe(false)
  })
})

describe('isDynamicCashAccountsResource', () => {
  it('returns true for cash_transactions', () => {
    expect(isDynamicCashAccountsResource('cash_transactions')).toBe(true)
  })

  it('returns false for expenses', () => {
    expect(isDynamicCashAccountsResource('expenses')).toBe(false)
  })
})

describe('getMiddleUrl', () => {
  it('returns flat URL with company_id for users', () => {
    expect(getMiddleUrl('users')).toBe('/users?company_id=comp1')
  })

  it('returns user-scoped URL for companies', () => {
    expect(getMiddleUrl('companies')).toBe('/users/user1/companies')
  })

  it('returns company-scoped URL for jobs', () => {
    expect(getMiddleUrl('jobs')).toBe('/users/user1/companies/comp1/jobs')
  })

  it('returns job-scoped URL for expenses', () => {
    expect(getMiddleUrl('expenses')).toBe('/users/user1/companies/comp1/jobs/job1/expenses')
  })

  it('returns cash_accounts-scoped URL for cash_transactions', () => {
    expect(getMiddleUrl('cash_transactions')).toBe(
      '/users/user1/companies/comp1/cash_accounts/ca1/transactions',
    )
  })

  it('uses URL override for equipment -> equipments', () => {
    expect(getMiddleUrl('equipment')).toContain('equipments')
  })

  it('uses URL override for receipts -> incomes_receipts', () => {
    const url = getMiddleUrl('receipts')
    expect(url).toContain('incomes_receipts')
  })

  it('uses URL override for material_warehouse -> material_warehouses', () => {
    const url = getMiddleUrl('material_warehouse')
    expect(url).toContain('material_warehouses')
  })

  it('uses URL override for equipment_usage -> equipment_usages', () => {
    const url = getMiddleUrl('equipment_usage')
    expect(url).toContain('equipment_usages')
  })

  it('includes null in URL when companyId is missing', () => {
    localStorage.removeItem('currentCompanyId')
    expect(getMiddleUrl('jobs')).toContain('/null/')
  })

  it('includes null in URL when user_id is missing', () => {
    localStorage.removeItem('user_id')
    expect(getMiddleUrl('jobs')).toContain('/null/')
  })
})

describe('getMiddleUrlWithId', () => {
  it('returns flat URL with id for users', () => {
    expect(getMiddleUrlWithId('users', 'user456')).toBe('/users/user456')
  })

  it('returns flat resource URL with id for companies', () => {
    expect(getMiddleUrlWithId('companies', 'comp123')).toBe('/users/user1/companies/comp123')
  })

  it('returns company-scoped URL with id for jobs', () => {
    expect(getMiddleUrlWithId('jobs', 'job456')).toBe('/users/user1/companies/comp1/jobs/job456')
  })

  it('returns job-scoped URL with id for expenses', () => {
    expect(getMiddleUrlWithId('expenses', 'exp789')).toBe(
      '/users/user1/companies/comp1/jobs/job1/expenses/exp789',
    )
  })

  it('returns cash_accounts-scoped URL with id for cash_transactions', () => {
    expect(getMiddleUrlWithId('cash_transactions', 'ct1')).toBe(
      '/users/user1/companies/comp1/cash_accounts/ca1/transactions/ct1',
    )
  })
})

describe('getMiddleUrlWithQuery', () => {
  it('returns user-scoped URL with query string for companies', () => {
    expect(getMiddleUrlWithQuery('companies', 'page=1&page_size=10')).toBe(
      '/users/user1/companies?page=1&page_size=10',
    )
  })

  it('returns company-scoped URL with query string for jobs', () => {
    expect(getMiddleUrlWithQuery('jobs', 'page=1')).toBe('/users/user1/companies/comp1/jobs?page=1')
  })

  it('returns cash_accounts-scoped URL with query string for cash_transactions', () => {
    const url = getMiddleUrlWithQuery('cash_transactions', 'page=1')
    expect(url).toContain('transactions?page=1')
  })
})
