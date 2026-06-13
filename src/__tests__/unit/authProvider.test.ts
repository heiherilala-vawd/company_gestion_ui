import authProvider, {
  canAccessResource,
  getAuthHeaders,
  getFetchWithAuth,
} from '../../auth/authProvider'

beforeEach(() => {
  localStorage.clear()
  vi.clearAllMocks()
})

describe('canAccessResource', () => {
  describe('role null', () => {
    it('returns false for any resource/action when no role is set', () => {
      expect(canAccessResource('companies', 'list')).toBe(false)
    })

    it('returns false for get action when no role is set', () => {
      expect(canAccessResource('anything', 'get')).toBe(false)
    })
  })

  describe('role ADMIN', () => {
    beforeEach(() => {
      localStorage.setItem('user_role', 'ADMIN')
    })

    it('allows delete on companies', () => {
      expect(canAccessResource('companies', 'delete')).toBe(true)
    })

    it('allows list on users', () => {
      expect(canAccessResource('users', 'list')).toBe(true)
    })

    it('allows any action on any resource', () => {
      expect(canAccessResource('anything', 'anything')).toBe(true)
    })
  })

  describe('role ADMINISTRATION', () => {
    beforeEach(() => {
      localStorage.setItem('user_role', 'ADMINISTRATION')
    })

    const fullCRUDResources = [
      'expenses',
      'companies',
      'jobs',
      'warehouses',
      'equipment',
      'materials',
      'users',
      'incomes',
      'bank_fees',
      'travel_expenses',
      'purchases',
      'leaves',
      'suppliers',
      'departments',
      'teams',
    ]

    it.each(fullCRUDResources)('allows create on %s', (resource) => {
      expect(canAccessResource(resource, 'create')).toBe(true)
    })

    it.each(fullCRUDResources)('allows list on %s', (resource) => {
      expect(canAccessResource(resource, 'list')).toBe(true)
    })

    it.each(fullCRUDResources)('denies delete on %s', (resource) => {
      expect(canAccessResource(resource, 'delete')).toBe(false)
    })

    it('allows get on histories', () => {
      expect(canAccessResource('histories', 'get')).toBe(true)
    })

    it('denies create on histories', () => {
      expect(canAccessResource('histories', 'create')).toBe(false)
    })

    it('allows list on yearly_report', () => {
      expect(canAccessResource('yearly_report', 'list')).toBe(true)
    })

    it('denies create on yearly_report', () => {
      expect(canAccessResource('yearly_report', 'create')).toBe(false)
    })

    it('allows create on purchase_operations', () => {
      expect(canAccessResource('purchase_operations', 'create')).toBe(true)
    })

    it('allows create on travel_operations', () => {
      expect(canAccessResource('travel_operations', 'create')).toBe(true)
    })

    it('denies list on purchase_operations', () => {
      expect(canAccessResource('purchase_operations', 'list')).toBe(false)
    })

    it('allows create on job_users', () => {
      expect(canAccessResource('job_users', 'create')).toBe(true)
    })

    it('denies delete on job_users (early delete guard blocks before role rules)', () => {
      expect(canAccessResource('job_users', 'delete')).toBe(false)
    })

    it('denies list on job_users', () => {
      expect(canAccessResource('job_users', 'list')).toBe(false)
    })

    it('allows create on loan_repayments', () => {
      expect(canAccessResource('loan_repayments', 'create')).toBe(true)
    })

    it('allows update on loan_repayments', () => {
      expect(canAccessResource('loan_repayments', 'update')).toBe(true)
    })

    it('denies access to unknown resource', () => {
      expect(canAccessResource('unknown_resource', 'list')).toBe(false)
    })
  })

  describe('role WAREHOUSE_WORKER', () => {
    beforeEach(() => {
      localStorage.setItem('user_role', 'WAREHOUSE_WORKER')
    })

    const stockResources = [
      'warehouses',
      'materials',
      'material_warehouse',
      'equipment',
      'purchases',
    ]

    it.each(stockResources)('allows create on stock resource %s', (resource) => {
      expect(canAccessResource(resource, 'create')).toBe(true)
    })

    it.each(stockResources)('allows update on stock resource %s', (resource) => {
      expect(canAccessResource(resource, 'update')).toBe(true)
    })

    it.each(stockResources)('allows get on stock resource %s', (resource) => {
      expect(canAccessResource(resource, 'get')).toBe(true)
    })

    it.each(stockResources)('allows list on stock resource %s', (resource) => {
      expect(canAccessResource(resource, 'list')).toBe(true)
    })

    it.each(stockResources)('denies delete on stock resource %s', (resource) => {
      expect(canAccessResource(resource, 'delete')).toBe(false)
    })

    it('allows list on companies', () => {
      expect(canAccessResource('companies', 'list')).toBe(true)
    })

    it('allows list on users', () => {
      expect(canAccessResource('users', 'list')).toBe(true)
    })

    it('denies create on companies', () => {
      expect(canAccessResource('companies', 'create')).toBe(false)
    })

    it('denies list on expenses', () => {
      expect(canAccessResource('expenses', 'list')).toBe(false)
    })

    it('allows list on jobs', () => {
      expect(canAccessResource('jobs', 'list')).toBe(true)
    })

    it('allows create on purchase_operations', () => {
      expect(canAccessResource('purchase_operations', 'create')).toBe(true)
    })

    it('allows delete on travel_expenses (special exception)', () => {
      expect(canAccessResource('travel_expenses', 'delete')).toBe(true)
    })
  })

  describe('role EMPLOYEE', () => {
    beforeEach(() => {
      localStorage.setItem('user_role', 'EMPLOYEE')
    })

    it('allows get on companies', () => {
      expect(canAccessResource('companies', 'get')).toBe(true)
    })

    it('denies list on companies', () => {
      expect(canAccessResource('companies', 'list')).toBe(false)
    })

    it('allows get on jobs', () => {
      expect(canAccessResource('jobs', 'get')).toBe(true)
    })

    it('denies list on jobs', () => {
      expect(canAccessResource('jobs', 'list')).toBe(false)
    })

    it('allows list on job_users', () => {
      expect(canAccessResource('job_users', 'list')).toBe(true)
    })

    it('allows list on equipment', () => {
      expect(canAccessResource('equipment', 'list')).toBe(true)
    })

    it('allows get on equipment', () => {
      expect(canAccessResource('equipment', 'get')).toBe(true)
    })

    it('denies create on equipment', () => {
      expect(canAccessResource('equipment', 'create')).toBe(false)
    })

    const personalResources = [
      'travel_expenses',
      'other_expenses',
      'employee_payments',
      'travel_people',
      'travel_materials',
      'travel_equipment',
    ]

    it.each(personalResources)('allows create on personal resource %s', (resource) => {
      expect(canAccessResource(resource, 'create')).toBe(true)
    })

    it.each(personalResources)('allows update on personal resource %s', (resource) => {
      expect(canAccessResource(resource, 'update')).toBe(true)
    })

    it.each(personalResources)('allows get on personal resource %s', (resource) => {
      expect(canAccessResource(resource, 'get')).toBe(true)
    })

    it.each(personalResources)('allows list on personal resource %s', (resource) => {
      expect(canAccessResource(resource, 'list')).toBe(true)
    })
  })
})

describe('getAuthHeaders', () => {
  it('returns Authorization header when token exists', () => {
    localStorage.setItem('token', 'token123')
    expect(getAuthHeaders()).toEqual({ Authorization: 'Bearer token123' })
  })

  it('returns empty object when no token', () => {
    expect(getAuthHeaders()).toEqual({})
  })

  it('returns consistent result when called multiple times', () => {
    localStorage.setItem('token', 'token123')
    expect(getAuthHeaders()).toEqual({ Authorization: 'Bearer token123' })
    expect(getAuthHeaders()).toEqual({ Authorization: 'Bearer token123' })
  })
})

describe('getFetchWithAuth', () => {
  it('returns a function', () => {
    expect(typeof getFetchWithAuth()).toBe('function')
  })

  it('makes a fetch call with Authorization header', async () => {
    localStorage.setItem('token', 'test-token')
    const mockFetch = vi.fn().mockResolvedValue(new Response())
    vi.stubGlobal('fetch', mockFetch)

    const fetchWithAuth = getFetchWithAuth()
    await fetchWithAuth('/api/test')

    expect(mockFetch).toHaveBeenCalledWith(
      '/api/test',
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: 'Bearer test-token',
        }),
      }),
    )

    vi.unstubAllGlobals()
  })

  it('makes a fetch call without Authorization when no token', async () => {
    const mockFetch = vi.fn().mockResolvedValue(new Response())
    vi.stubGlobal('fetch', mockFetch)

    const fetchWithAuth = getFetchWithAuth()
    await fetchWithAuth('/api/test')

    expect(mockFetch).toHaveBeenCalledWith(
      '/api/test',
      expect.objectContaining({
        headers: expect.objectContaining({
          'Content-Type': 'application/json',
        }),
      }),
    )

    vi.unstubAllGlobals()
  })
})

describe('authProvider', () => {
  describe('checkAuth', () => {
    it('resolves when token exists', async () => {
      localStorage.setItem('token', 'some-token')
      await expect(authProvider.checkAuth()).resolves.toBeUndefined()
    })

    it('resolves when not_authenticated is set (even without token)', async () => {
      localStorage.setItem('not_authenticated', 'true')
      await expect(authProvider.checkAuth()).resolves.toBeUndefined()
    })

    it('rejects when neither token nor not_authenticated is set', async () => {
      await expect(authProvider.checkAuth()).rejects.toBeUndefined()
    })
  })

  describe('logout', () => {
    beforeEach(() => {
      localStorage.setItem('token', 'some-token')
      localStorage.setItem('user_id', '123')
      localStorage.setItem('user_email', 'test@test.com')
      localStorage.setItem('user_role', 'EMPLOYEE')
    })

    it('clears auth data from localStorage', async () => {
      await authProvider.logout()
      expect(localStorage.getItem('token')).toBeNull()
      expect(localStorage.getItem('user_id')).toBeNull()
      expect(localStorage.getItem('user_email')).toBeNull()
      expect(localStorage.getItem('user_role')).toBeNull()
    })

    it('sets not_authenticated flag', async () => {
      await authProvider.logout()
      expect(localStorage.getItem('not_authenticated')).toBe('true')
    })
  })

  describe('checkError', () => {
    it('resolves on status 200', async () => {
      await expect(authProvider.checkError({ status: 200 })).resolves.toBeUndefined()
    })

    it('rejects on status 401', async () => {
      await expect(authProvider.checkError({ status: 401 })).rejects.toBeUndefined()
    })

    it('resolves on status 500', async () => {
      await expect(authProvider.checkError({ status: 500 })).resolves.toBeUndefined()
    })
  })

  describe('getToken', () => {
    it('returns the token from localStorage', () => {
      localStorage.setItem('token', 'my-token')
      expect(authProvider.getToken()).toBe('my-token')
    })

    it('returns null when no token', () => {
      expect(authProvider.getToken()).toBeNull()
    })
  })

  describe('canAccess', () => {
    it('returns true for ADMIN regardless of resource/action/record', async () => {
      localStorage.setItem('user_role', 'ADMIN')
      const result = await authProvider.canAccess({
        resource: 'anything',
        action: 'delete',
        record: {},
      })
      expect(result).toBe(true)
    })

    it('returns true for ADMINISTRATION on personal resource with record.user_id', async () => {
      localStorage.setItem('user_role', 'ADMINISTRATION')
      const result = await authProvider.canAccess({
        resource: 'travel_expenses',
        action: 'create',
        record: { user_id: 'some-user' },
      })
      expect(result).toBe(true)
    })

    it('returns true for ADMIN on personal resource with different user_id', async () => {
      localStorage.setItem('user_role', 'ADMIN')
      localStorage.setItem('user_id', 'user-1')
      const result = await authProvider.canAccess({
        resource: 'travel_expenses',
        action: 'create',
        record: { user_id: 'user-2' },
      })
      expect(result).toBe(true)
    })

    it('returns true for EMPLOYEE on personal resource with matching user_id', async () => {
      localStorage.setItem('user_role', 'EMPLOYEE')
      localStorage.setItem('user_id', 'user-123')
      const result = await authProvider.canAccess({
        resource: 'travel_expenses',
        action: 'create',
        record: { user_id: 'user-123' },
      })
      expect(result).toBe(true)
    })

    it('returns false for EMPLOYEE on personal resource with non-matching user_id', async () => {
      localStorage.setItem('user_role', 'EMPLOYEE')
      localStorage.setItem('user_id', 'user-123')
      const result = await authProvider.canAccess({
        resource: 'travel_expenses',
        action: 'create',
        record: { user_id: 'different-user' },
      })
      expect(result).toBe(false)
    })
  })
})
