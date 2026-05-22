---
name: e2e-testing
description: >
  Cypress E2E testing for React Admin v5 + MUI v7 projects using a Build+Serve
  approach with Istanbul code coverage. Covers CRUD test creation with responsive
  desktop/mobile patterns, cy.intercept() mocking, data-testid selectors, and
  systematic debugging. Use this whenever you need to create new E2E tests, fix
  failing tests, debug CI test failures, set up or diagnose code coverage, write
  API mocks, or understand the intercept-based testing architecture — especially
  when tests pass locally but fail in CI, or coverage reports show unexpected gaps.
---

# E2E Testing (Cypress)

## Why This Approach

This project uses **Cypress E2E only** — no unit tests, no Vitest. Every test runs against a fully built app served on a static port.

**Why Build + Serve instead of the dev server?** Because Cypress intercepts (`cy.intercept()`) mock every API call. The dev server's Vite proxy would interfere, and running against a production-like build catches build-level issues (broken imports, missing env vars, tree-shaking problems) that the dev server masks. The tradeoff: you must `npm run build` before testing, which takes longer but catches more.

**Why no unit tests?** Every UI behavior is tested through the real component tree, the real router, and the real data layer. Mocking at the component level is replaced by mocking at the network level (`cy.intercept()`). This gives higher confidence that interactions work end-to-end, at the cost of slower feedback.

## Quick Start

```bash
# Full cycle: build + serve + run all tests + check coverage (60% threshold)
npm run cypress:coverage

# Run a single test file headless
npx cypress run --config-file src/__tests__/cypress.config.ts --spec "src/__tests__/e2e/auth.cy.ts"

# Open Cypress UI for interactive debugging (requires dev server on 5173)
npm run cypress:open
```

## Test Architecture

```
src/__tests__/
├── e2e/                       # Test files (*.cy.ts)
├── mocks/responses/           # Mock API responses per resource
│   ├── auth-api.ts            # Helpers: mockSuccessResponse, mockErrorResponse
│   └── <resource>-api.ts      # Entity mocks + createOrUpdate* functions
├── support/
│   ├── utils.ts               # interceptGeneralEndpoint, loginInPage, selectors
│   ├── mappers.ts             # Entity → Crupdate type converters
│   └── commands.ts            # Custom Cypress commands
├── cypress.config.ts          # Cypress config (spec pattern, support, video)
└── GUIDE_TESTS.md             # French-language comprehensive testing guide
```

The key insight: **all API calls are intercepted**. The backend never runs. Every `GET`, `PUT`, `DELETE` is matched by a `cy.intercept()` in the test or in `interceptGeneralEndpoint()`. This makes tests fast, deterministic, and self-contained.

## Core Workflow

### Scaffolding a New Test

1. **Create mock file** at `src/__tests__/mocks/responses/<resource>-api.ts` — define entity mocks, a `crupdate*Mock` array (one item with existing ID for update, one with new ID for create), and a `createOrUpdate*()` function that dynamically reconstructs full entities from the request body
2. **Export from index** at `mocks/responses/index.ts`
3. **Add intercepts** for the new resource in `interceptGeneralEndpoint()` in `support/utils.ts`
4. **Create test file** at `src/__tests__/e2e/<resource>.cy.ts`

### Test Structure

Every resource test follows the same pattern:

- `describe('E2E: ResourceName', () => { ... })` with `beforeEach` calling `interceptGeneralEndpoint()`, `insertInToLocalStorage()`, `loginInPage()`
- A **`creatOrUpdate(isCreating)`** function — clicks "Create" button or navigates to edit an existing entity, fills form fields, submits
- **`navigateToDesktop()`** and **`navigateToMobile()`** helpers for responsive testing
- Functions for each scenario: `showList()`, `showDetails()`, `canCreate()`, `canUpdate()`, error scenarios
- Each scenario tested on both desktop (1280x720) and mobile (375x667)

### The Intercept Pattern

```typescript
// For listing: use wildcard paths
cy.intercept('GET', '**/jobs*', mockSuccessResponse(jobsMock)).as('getJobs')

// For create/update: use a callback so the mock responds with the actual form data
cy.intercept('PUT', '**/jobs', (req) => {
  req.reply(mockSuccessResponse(createOrUpdateJobs(req.body)))
}).as('createJob')

// For error scenarios: override before the action
cy.intercept('PUT', '**/jobs', mockErrorResponse('BadRequestException', 'Invalid data', 400)).as('createJobFail')
```

**Why the callback pattern for create/update?** React Admin sends the form data in the request body. The `createOrUpdate*()` function reconstructs what the real backend would return (including computed fields like `created_at`, nested relations like `company`). This gives the test realistic data to assert against after creation.

## Running Tests

| Command | Description |
|---------|-------------|
| `npm run cypress:coverage` | Build → serve → run all tests → check coverage |
| `npm run cypress:open` | Interactive Cypress UI (dev server must run on 5173) |
| `npx cypress run --config-file src/__tests__/cypress.config.ts` | Headless, no coverage |
| `npx cypress run --config-file src/__tests__/cypress.config.ts --spec "src/__tests__/e2e/foo.cy.ts"` | Single test file |
| `npm run cypress:docker` | Docker-based (no host Cypress) |
| `npm run lint && npm run type-check` | Always run before committing |

**Important:** `npm run cypress:run` requires a running dev server on 5173 and does NOT collect coverage. Always prefer `npm run cypress:coverage` for CI or final validation.

## Debugging (Systematic)

When a test fails, follow this diagnostic tree:

### 1. Does the test time out waiting for an intercept?
```
→ Check that the cy.intercept() URL pattern matches the actual API call
  → Check your browser's Network tab in Cypress to see the actual request URL
  → Does it use the right HTTP method? (PUT vs POST vs GET)
  → Does the path contain the correct hierarchy prefixes?
  → Wildcard **/jobs vs specific /companies/*/jobs — which matches?
```

### 2. Does the selector fail?
```
→ Is the data-testid correct in both component and test?
→ For textarea: add :visible suffix (hidden duplicates exist)
→ For overlapped elements: add { force: true } to click()
→ For dropdowns: wait for the menu to appear before selecting
→ For the login form: use input[name="username"] (not email)
```

### 3. Does the test pass locally but fail in CI?
```
→ CI uses Docker — check Dockerfile for missing system dependencies
→ CI runs headless (Electron) — screenshots may reveal different rendering
→ CI uses different env vars — is VITE_API_URL empty in CI?
→ CI video artifacts: download and watch for visual clues
```

### 4. Are coverage numbers lower than expected?
```
→ Is VITE_API_URL empty? If it's set, requests go to real backend and aren't intercepted
→ Is NYC_CAFEOBJECT_COVERAGE=true set at build time?
→ Are new files covered by .nycrc includes/excludes?
→ Run with --browser chrome for accurate source maps
```

## Common Pitfalls

| Symptom | Likely Cause | Fix |
|---------|-------------|-----|
| `cy.wait('@alias')` times out | Intercept URL pattern doesn't match | Check Network tab, widen wildcard |
| Test randomly fails/flakes | No `cy.wait(3000)` before asserting after create/update | Add wait for React Admin to process response |
| `cy.contains(text)` matches wrong element | Multiple elements with same text | Scope with `.first()` or use `data-testid` |
| `cy.intercept` never fires | URL mismatch or wrong HTTP method | Verify actual request in Cypress Network tab |
| Login always fails | `input[name="username"]` not used | Login form uses `username` field (not email) |
| Coverage is 0% | `NYC_CAFEOBJECT_COVERAGE` not set | Set before build, must be `true` |
| Mobile test fails | Sidebar modal covers the element | Close sidebar: `cy.get('body').click(0, 0)` |

## CI/CD

Docker-based in CI: `npm run cypress:docker:ci`. The workflow builds inside Docker, runs tests, uploads coverage artifacts, and captures video on failure.

The `lint-and-typecheck` workflow runs separately (not in Docker) to give faster feedback on type errors.

## Reference Files

- `references/test-pattern.md` — Complete CRUD test template with responsive support
- `references/mock-pattern.md` — Mock file structure, entity creation, `createOrUpdate*` functions
- `references/selectors.md` — MUI v7 / React Admin selector quirks
- `references/env-vars.md` — All environment variables for E2E testing
