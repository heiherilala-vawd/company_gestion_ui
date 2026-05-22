# Testing Dynamic Resources

## Testing Layers

### 1. URL Resolver (Unit Tests)

The resolver is a pure function — test it without any DOM or React:

```typescript
describe('URLResolver', () => {
  const schema = {
    'projects': '/orgs/{orgId}/projects',
    'tasks': '/orgs/{orgId}/projects/{projectId}/tasks',
  }

  // Mock context source
  const context = {
    get: (key: string) => {
      if (key === 'orgId') return 'org_123'
      if (key === 'projectId') return 'proj_456'
      return null
    },
  }

  const resolver = createURLResolver(schema, context, 'https://api.example.com')

  test('resolves flat resource', () => {
    expect(resolver.getListUrl('users')).toBe('https://api.example.com/users')
  })

  test('resolves hierarchical resource with placeholders', () => {
    expect(resolver.getListUrl('tasks')).toBe(
      'https://api.example.com/orgs/org_123/projects/proj_456/tasks',
    )
  })

  test('resolves getOne URL with id', () => {
    expect(resolver.getOneUrl('tasks', 'task_789')).toBe(
      'https://api.example.com/orgs/org_123/projects/proj_456/tasks/task_789',
    )
  })

  test('appends query string', () => {
    expect(resolver.getListUrl('tasks', 'page=1&page_size=10')).toBe(
      'https://api.example.com/orgs/org_123/projects/proj_456/tasks?page=1&page_size=10',
    )
  })

  test('throws when placeholder is missing', () => {
    const emptyContext = { get: () => null }
    const badResolver = createURLResolver(schema, emptyContext)
    expect(() => badResolver.getListUrl('projects')).toThrow('Missing context value')
  })

  test('encodes special characters in placeholders', () => {
    const contextWithSpaces = { get: () => 'my org' }
    const r = createURLResolver(schema, contextWithSpaces)
    expect(r.getListUrl('projects')).toContain('/orgs/my%20org/projects')
  })
})
```

### 2. Data Provider (Integration Tests)

Test the data provider with a mock fetch and resolver:

```typescript
describe('HierarchicalDataProvider', () => {
  let fetchMock

  beforeEach(() => {
    fetchMock = vi.fn()
    global.fetch = fetchMock
  })

  const resolver = createURLResolver(schema, mockContext)
  const provider = createHierarchicalProvider(baseProvider, resolver)

  test('getList calls the resolved URL', async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve([{ id: '1', name: 'Task A' }]),
    })

    const result = await provider.getList('tasks', {
      pagination: { page: 1, perPage: 20 },
      sort: { field: 'name', order: 'ASC' },
      filter: {},
    })

    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining('/tasks?'),
      expect.any(Object),
    )
    expect(result.data).toHaveLength(1)
  })

  test('create sends PUT with body', async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve([{ id: 'new_id', name: 'New Task' }]),
    })

    await provider.create('tasks', { data: { name: 'New Task' } })

    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining('/tasks'),
      expect.objectContaining({
        method: 'PUT',
        body: expect.stringContaining('New Task'),
      }),
    )
  })

  test('handles 401 by clearing token', async () => {
    fetchMock.mockResolvedValue({ ok: false, status: 401 })
    localStorage.setItem('token', 'some_token')

    await expect(provider.getList('tasks', {})).rejects.toThrow('Session expired')

    expect(localStorage.getItem('token')).toBeNull()
  })
})
```

### 3. Hierarchy Context (Component Tests)

Test the context with a test wrapper:

```typescript
describe('HierarchyContext', () => {
  const { Provider, useEntity } = createHierarchyContext({
    storageKey: 'testCurrentId',
    entityName: 'TestEntity',
  })

  beforeEach(() => localStorage.clear())

  function TestComponent() {
    const { currentId, selectEntity, clearEntity } = useEntity()
    return (
      <div>
        <span data-testid="currentId">{currentId}</span>
        <button onClick={() => selectEntity('abc')}>Select</button>
        <button onClick={clearEntity}>Clear</button>
      </div>
    )
  }

  test('initializes from localStorage', () => {
    localStorage.setItem('testCurrentId', 'stored_id')
    render(<Provider><TestComponent /></Provider>)
    expect(screen.getByTestId('currentId')).toHaveTextContent('stored_id')
  })

  test('selectEntity updates state and localStorage', () => {
    render(<Provider><TestComponent /></Provider>)
    fireEvent.click(screen.getByText('Select'))
    expect(screen.getByTestId('currentId')).toHaveTextContent('abc')
    expect(localStorage.getItem('testCurrentId')).toBe('abc')
  })

  test('clearEntity removes from localStorage', () => {
    localStorage.setItem('testCurrentId', 'abc')
    render(<Provider><TestComponent /></Provider>)
    fireEvent.click(screen.getByText('Clear'))
    expect(screen.getByTestId('currentId')).toHaveTextContent('')
    expect(localStorage.getItem('testCurrentId')).toBeNull()
  })
})
```

### 4. Selector Cascade (E2E Tests)

Test the full cascade flow in Cypress:

```typescript
describe('Hierarchy Selectors', () => {
  beforeEach(() => {
    cy.intercept('GET', '/organizations', { fixture: 'organizations.json' }).as('getOrgs')
    cy.intercept('GET', '/organizations/org_123/projects', { fixture: 'projects.json' }).as(
      'getProjects',
    )
    cy.intercept('GET', '/organizations/org_123/projects/proj_456/tasks', {
      fixture: 'tasks.json',
    }).as('getTasks')

    cy.visit('/')
    cy.wait('@getOrgs')
  })

  it('auto-selects first organization', () => {
    cy.contains('Organization').should('exist')
    cy.get('[role="combobox"]').first().should('contain', 'Org A')
  })

  it('loads projects after organization is selected', () => {
    cy.wait('@getProjects')
    cy.get('[role="combobox"]').eq(1).should('contain', 'Project X')
  })

  it('changes projects when organization changes', () => {
    cy.get('[role="combobox"]').first().click()
    cy.contains('Org B').click()
    cy.wait('@getProjects')
    // Projects should now be scoped to Org B
    cy.get('[role="combobox"]').eq(1).should('contain', 'Project Y')
  })
})
```

### 5. Full CRUD Flow (E2E Tests)

```typescript
describe('Task CRUD with hierarchy', () => {
  it('creates a task under the current project', () => {
    cy.intercept('PUT', '/organizations/org_123/projects/proj_456/tasks', {
      statusCode: 200,
      body: [{ id: 'task_new', title: 'New Task' }],
    }).as('createTask')

    cy.get('[data-testid="menu-tasks"]').click()
    cy.get('[class*="RaCreateButton"]').click()
    cy.get('[data-testid="input-title"] input').type('New Task')
    cy.get('button[type="submit"]').click()
    cy.wait('@createTask')
    cy.url().should('include', '/tasks')
  })
})
```

## Test Configuration

For E2E tests with dynamic resources, set the context values before each test:

```typescript
beforeEach(() => {
  // Set the hierarchy context in localStorage
  cy.window().then((win) => {
    win.localStorage.setItem('currentOrgId', 'org_123')
    win.localStorage.setItem('currentProjectId', 'proj_456')
  })
})
```

## Verification Checklist

- [ ] URL resolver is tested with all resource types (flat, 1-level, multi-level)
- [ ] Edge cases are covered: missing placeholders, encoding, trailing slashes
- [ ] Data provider is tested with create, update, delete, getList, getOne
- [ ] Error cases are covered: 401 redirect, 4xx notification, 5xx fallback
- [ ] Context persistence is tested (localStorage read/write/clear)
- [ ] Selector cascade is tested (parent change triggers child refresh)
- [ ] E2E tests set context in localStorage before test runs
