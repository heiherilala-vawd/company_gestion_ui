---
name: e2e-testing
description: >
  Testing strategy for React Admin v5 + MUI v7 projects using Cypress E2E (primary)
  and Vitest unit tests (secondary). Covers CRUD E2E test creation with cy.intercept()
  mocking, data-testid selectors, responsive patterns, and Vitest unit test patterns
  for dataProvider, authProvider, and utility logic. Use whenever you need to create
  new tests, fix failing tests, debug CI failures, write API mocks, or handle coverage.
---

# Testing (Cypress E2E + Vitest Unit)

## Overview

This project uses **two testing layers**:

| Layer | Tool | Scope | Speed |
|-------|------|-------|-------|
| **E2E** | Cypress 15 | Full UI flows through real browser | Slow (build + serve) |
| **Unit** | Vitest 4 | Logic: dataProvider, auth, utils, config | Fast (no browser) |

**E2E is the primary testing strategy.** Unit tests cover pure logic that's faster and more reliable to test without a browser.

---

## Part 1: Unit Tests (Vitest)

### When to Write Unit Tests

- Pure functions and utilities (`src/utili/`)
- Data provider logic (`src/auth/dataProvider.ts`)
- Auth provider logic (`src/auth/authProvider.ts`)
- URL resolution logic (`src/config/dynamicResources.ts`)
- Style tokens and config (`src/style/`)
- Generic components with little DOM interaction

### Configuration

```
vitest.config.ts
src/__tests__/unit/setup.ts    # localStorage mock, crypto mock, console mock
```

Test files follow the pattern `src/**/*.test.{ts,tsx}`.

### Running

```bash
# All unit tests
npx vitest run

# Watch mode
npx vitest

# Single file
npx vitest run src/__tests__/unit/dataProvider.test.ts
```

### Patterns

#### Mocking import dependencies

```typescript
// Mock URL helpers that use localStorage
vi.mock('../../config/dynamicResources', () => ({
  getMiddleUrl: vi.fn((resource: string) => `/api/${resource}`),
  getMiddleUrlWithId: vi.fn((resource: string, id: string) => `/api/${resource}/${id}`),
  getMiddleUrlWithQuery: vi.fn((resource: string, query: string) => `/api/${resource}?${query}`),
}))

// Mock fetch in dataProvider tests
globalThis.fetch = vi.fn()
;(globalThis.fetch as any).mockResolvedValueOnce(createMockResponse(mockData))
```

#### localStorage setup

```typescript
beforeEach(() => {
  localStorage.clear()
  localStorage.setItem('user_id', 'user1')
  localStorage.setItem('currentCompanyId', 'comp1')
  localStorage.setItem('currentJobId', 'job1')
  localStorage.setItem('token', 'test-token')
  vi.restoreAllMocks()
})
```

The global `setup.ts` already mocks `localStorage`, `crypto.randomUUID()`, and `console` methods — no extra setup needed.

#### Testing data provider

```typescript
it('sends pagination parameters', async () => {
  ;(globalThis.fetch as any).mockResolvedValueOnce(
    createMockResponse([{ id: '1', name: 'Company A' }]),
  )
  const result = await dataProvider.getList('companies', {
    pagination: { page: 1, perPage: 10 },
    sort: { field: 'name', order: 'ASC' },
    filter: {},
  })
  expect(result.data).toHaveLength(1)
  expect(result.total).toBe(1)
})
```

---

## Part 2: E2E Tests (Cypress)

### Why Build + Serve

Cypress intercepts (`cy.intercept()`) mock every API call. The dev server's Vite proxy would interfere, and running against a production-like build catches build-level issues (broken imports, missing env vars, tree-shaking problems) that the dev server masks.

### Quick Start

```bash
# Full cycle: build + serve + run all tests + check coverage
npm run cypress:coverage

# Single test file headless
npx cypress run --config-file src/__tests__/cypress.config.ts --spec "src/__tests__/e2e/auth.cy.ts"

# Interactive debug (requires dev server on 5173)
npm run cypress:open
```

### Test Architecture

```
src/__tests__/
├── e2e/                       # Test files (*.cy.ts) — 44 files
├── mocks/responses/           # Mock API responses per resource (42 files)
│   ├── auth-api.ts            # Helpers: mockSuccessResponse, mockErrorResponse
│   └── <resource>-api.ts      # Entity mocks + createOrUpdate* functions
├── support/
│   ├── utils.ts               # interceptGeneralEndpoint, loginInPage, selectors
│   ├── commands.ts            # Custom Cypress commands (cy.login, etc.)
│   └── e2e.ts                 # Support file (imports commands + coverage)
├── unit/                      # Vitest unit tests (10 files)
├── cypress.config.ts          # Cypress config
└── GUIDE_TESTS.md             # French comprehensive testing guide
```

**All API calls are intercepted.** The backend never runs.

### Scaffolding a New E2E Test

1. **Create mock file** at `src/__tests__/mocks/responses/<resource>-api.ts` — entity mocks, `crupdate*Mock` array, `createOrUpdate*()` function
2. **Export from index** at `mocks/responses/index.ts`
3. **Add intercepts** for the new resource in `interceptGeneralEndpoint()` in `support/utils.ts`
4. **Create test file** at `src/__tests__/e2e/<resource>.cy.ts`

### The Intercept Pattern

```typescript
// For listing: use wildcard paths
cy.intercept('GET', '**/jobs*', mockSuccessResponse(jobsMock)).as('getJobs')

// For create/update: callback responds with form data
cy.intercept('PUT', '**/jobs', (req) => {
  req.reply(mockSuccessResponse(createOrUpdateJobs(req.body)))
}).as('createJob')

// For error scenarios: override before action
cy.intercept('PUT', '**/jobs', mockErrorResponse('BadRequestException', 'Invalid data', 400)).as('createJobFail')
```

### Test Structure

Every resource test follows the same pattern:

- `describe('E2E: ResourceName', () => { ... })` with `beforeEach` calling `interceptGeneralEndpoint()`, `insertInToLocalStorage()`, `loginInPage()`
- A **`creatOrUpdate(isCreating)`** function — clicks "Create" or navigates to edit, fills form, submits
- **`navigateToDesktop()`** and **`navigateToMobile()`** for responsive testing
- Each scenario tested on both desktop (1280x720) and mobile (375x667)

---

## Running Tests

| Command | Description |
|---------|-------------|
| `npm run cypress:coverage` | **Full cycle**: build → serve → E2E → coverage |
| `npm run cypress:coverage -- --skip-build` | Reuse existing `dist/` |
| `npx vitest run` | Unit tests only (fast) |
| `npx cypress run --config-file src/__tests__/cypress.config.ts` | E2E headless, no coverage |
| `npx cypress open --config-file src/__tests__/cypress.config.ts` | Interactive E2E (dev server needed) |
| `npm run cypress:docker` | Docker-based E2E |
| `npm run lint && npm run type-check` | Always before commit |

## Environment Variables for Tests

| Variable | Purpose |
|----------|---------|
| `VITE_API_URL` | Must be **empty** — all requests intercepted |
| `VITE_COVERAGE` | `true` enables Istanbul build instrumentation |
| `VITE_MUTATION_MODE` | `pessimistic` disables undoable (5s wait) mutations |
| `NYC_CAFEOBJECT_COVERAGE` | `true` enables coverage task in Cypress |

## Critical Rule: NEVER Use Hardcoded `cy.wait()`

**NEVER use `cy.wait(<number>)` with a hardcoded millisecond value.** This creates flaky tests that fail under load or in CI.

### ❌ Bad
```typescript
cy.wait(2000)           // fragile, fails in CI
cy.wait(3000)           // slow, pointless
```

### ✅ Good — use one of these instead

| Instead of | Use |
|-----------|-----|
| `cy.wait(200)` after page load | `cy.contains('Title').should('exist')` or `cy.get('[data-testid="x"]').should('be.visible')` |
| `cy.wait(3000)` after form submit | `cy.wait('@createAlias')` to wait for the actual API response |
| `cy.wait(1000)` between two form fields | Just type directly — Cypress auto-retries each command |
| `cy.wait(500)` in `navigateTo` helper | Remove — the URL assertion already ensures the page loaded |

### Why it matters
- Hardcoded waits are **brittle**: they pass locally but fail in CI (different CPU/network)
- They **slow down** tests unnecessarily
- Cypress already retries commands until the DOM matches the assertion — trust the framework

### Exception (rare)
When you truly need to wait for an animation to complete, use:
```typescript
cy.get('@some-animation').should('not.exist')
// or
cy.get('[data-testid="animation-target"]').should('have.class', 'ready')
```

## Common Pitfalls

| Symptom | Likely Cause | Fix |
|---------|-------------|-----|
| `cy.wait('@alias')` times out | Intercept URL doesn't match real API call | Check Cypress Network tab |
| E2E test passes locally but fails in CI | Docker env differs or timing | Check Dockerfile, CI env vars |
| Coverage is 0% | `VITE_COVERAGE` not set | Must be `true` at build time |
| Unit test `localStorage` fails | Setup mocks before test | `localStorage.clear()` in beforeEach |
| Unit test `fetch` fails | fetch not mocked | Mock via `globalThis.fetch = vi.fn()` |
| Mobile E2E test fails | Sidebar modal covers element | Close sidebar: `cy.get('body').click(0, 0)` |
| Test uses `cy.wait(3000)` | Flaky, not a real wait | Replace with `cy.wait('@alias')` or a DOM assertion |

## Reference Files

- `references/test-pattern.md` — Complete CRUD E2E test template
- `references/mock-pattern.md` — Mock file structure
- `references/selectors.md` — MUI v7 / React Admin selector quirks
- `references/env-vars.md` — All environment variables
