# AGENTS.md - Quick Reference

## Commands

- `npm run dev` - Start dev server (port 5173) with Vite proxy to backend
- `npm run build` - Build for production (required for static serve tests)
- `npm run serve` - Preview production build with Vite
- `npm run gen:api` - Generate TypeScript client from `api.yml` to `src/gen-ts/` using OpenAPI Generator
- `npm run cypress:open` - Open Cypress UI for visual E2E testing
- `npm run cypress:run` - Run Cypress tests headless
- `npm run cypress:coverage` - **Run Cypress tests with coverage (Build + Static Serve)** - NO dev server needed
- `npm run type-check` - TypeScript check (`tsc --noEmit`)
- `npm run lint` - ESLint with auto-fix
- `npm run format` - Prettier format src/

## Architecture

- **React Admin v5** with React 19
- **Auth**: Custom `authProvider` in `src/auth/authProvider.tsx`, uses `/auth/login`, `/auth/whoami` endpoints
  - Uses `import.meta.env.VITE_API_URL ?? ''` for API base URL (currently empty = relative URLs)
- **API client**: Generated code in `src/gen-ts/` from `api.yml` (regenerate with `gen:api`)
- **Data provider**: `src/auth/dataProvider.ts` - uses helper functions from `src/config/dynamicResources.ts`
  - All API URLs are relative (no hardcoded backend URL)
  - **NO** external REST client (`ra-data-simple-rest` removed)
- **Environment**: `.env` file contains `VITE_SIMPLE_REST_URL=http://localhost:8080` (not used in code)

## Testing

### Overview

- **E2E tests ONLY**: `src/__tests__/e2e/*.cy.ts` (Cypress)
- **No unit tests**: This project uses only E2E tests (no Vitest/Jest unit tests)
- **Coverage**: NYC/Istanbul via Cypress (`npm run cypress:coverage`)
- **Test mocks**: `src/__tests__/mocks/responses/*.ts`
- **Cypress config**: `src/__tests__/cypress.config.ts`
- **Support utils**: `src/__tests__/support/utils.ts`

### Test Execution (IMPORTANT: No dev server needed)

- **Prerequisite**: NO dev server needed! Tests use **Build + Static Serve** approach
- **E2E + Coverage**: `npm run cypress:coverage` (builds app, serves statically, runs E2E tests with NYC coverage at 60%)
- **Run single test**: `npx cypress run --config-file src/__tests__/cypress.config.ts --spec "src/__tests__/e2e/auth.cy.ts"`
- **Local dev testing**: `npx cypress open --config-file src/__tests__/cypress.config.ts`

### Coverage Configuration (E2E only)

- **Tool**: NYC (Istanbul) with `vite-plugin-istanbul` for instrumentation during build
- **Threshold**: 60% minimum (lines, functions, branches, statements)
- **Exclusions** (`.nycrc`):
  - `node_modules/**`
  - `src/gen-ts/**` (generated API code)
  - `src/__tests__/**`
  - `cypress/**`
- **Reports**: `coverage/` directory (text, html, lcov)
- **Command**: `npm run cypress:coverage` (builds with `NYC_CAFEOBJECT_COVERAGE=true`, serves statically, runs Cypress, generates report)

### Test Creation Methodology

1. **Always use generated API client types** for mock typing:

   ```typescript
   import { AuthResponse, LoginRequest } from '../../../gen-ts/src'
   ```

2. **Create mocks for all request/response objects** in `src/__tests__/mocks/responses/`:

   ```typescript
   // Use generated types
   export const authResponseMock: AuthResponse = { ... }
   export const loginRequestMock: LoginRequest = { ... }

   // Helpers to avoid repetition
   export const mockSuccessResponse = (body: any) => ({
     statusCode: 200,
     body,
   })

   export const mockErrorResponse = (type: string, message: string, statusCode: number = 401) => ({
     statusCode,
     body: { type, message },
   })
   ```

3. **Use utility functions** from `src/__tests__/support/utils.ts` for common setup:
   - `insertInToLocalStorage()` - Sets localStorage items (currentCompanyId, etc.)
   - `interceptGeneralEndpoint()` - Intercepts all common API endpoints (users, jobs, warehouses, materials, etc.)
   - `loginInPage()` - Performs login with valid credentials
   - `selectReferenceWithCreate(testId, menuId, entitySelection, waitAlias)` - Generic helper for ReferenceSelectWithCreate
   - `selectJob()` - Selects a job in ReferenceSelectWithCreate
   - `selectCompany()` - Selects a company in ReferenceSelectWithCreate
   - `selectExpense()` - Selects an expense in ReferenceSelectWithCreate
   - `selectUser()` - Selects a user in ReferenceSelectWithCreate
   - `selectWarehouse()` - Selects a warehouse in ReferenceSelectWithCreate
   - `selectMaterial()` - Selects a material in ReferenceSelectWithCreate
   - `selectEquipment()` - Selects equipment in ReferenceSelectWithCreate
   - `selectTravelExpense()` - Selects a travel expense in ReferenceSelectWithCreate

4. **Add interceptors in `utils.ts`** for new resources:

   ```typescript
   // In interceptGeneralEndpoint()
   cy.intercept('GET', '**/travel_equipments*', mockSuccessResponse(travelEquipmentsMock)).as(
     'getTravelEquipments',
   )
   cy.intercept(
     'GET',
     '**/travel_equipments/teq1_id*',
     mockSuccessResponse(travelEquipment1Mock),
   ).as('getTravelEquipment')
   ```

5. **Write E2E tests in `src/__tests__/e2e/`** with the pattern:
   - Create `creatOrUpdate(isCreating: boolean)` function for create/update logic
   - Use `beforeEach` with utility functions for setup
   - Include create, update, and error scenarios
   - **Menu testId format**: `menu-{resource-name}` (e.g., `menu-travel-equipments`)

   ```typescript
   import { mockSuccessResponse, mockErrorResponse } from '../mocks/responses/auth-api'
   import {
     entity1Mock,
     entity2Mock,
     crupdateEntitiesMock,
     createOrUpdateEntities,
   } from '../mocks/responses/entities-api'
   import {
     insertInToLocalStorage,
     interceptGeneralEndpoint,
     loginInPage,
     selectHelper,
   } from '../support/utils.ts'

   describe('E2E: Entity', () => {
     function creatOrUpdate(isCreating: boolean) {
       const crupdatedData = crupdateEntitiesMock[0]
       if (isCreating) {
         cy.contains('Create').click()
       } else {
         cy.contains(<string>entity1Mock.name).click()
         cy.wait('@getEntity')
         cy.contains('Edit').click()
       }
       // Fill form fields
       selectHelper()
       cy.get('button[type="submit"]').click()
     }

     beforeEach(() => {
       cy.clearLocalStorage()
       cy.clearCookies()
       insertInToLocalStorage()
       interceptGeneralEndpoint()
       loginInPage()
       cy.get('[data-testid="menu-entities"]').click()
       cy.wait('@getEntities')
     })

     it('should display entities list', () => {
       cy.contains(<string>entity1Mock.name).should('be.visible')
     })

     it('should create a new entity', () => {
       cy.intercept('PUT', '**/entities', (req) => {
         req.reply(mockSuccessResponse(createOrUpdateEntities(req.body)))
       }).as('createEntity')
       creatOrUpdate(true)
       cy.wait('@createEntity')
       cy.url().should('include', '/entities')
     })

     it('should update an existing entity', () => {
       cy.intercept('PUT', '**/entities', (req) => {
         req.reply(mockSuccessResponse(createOrUpdateEntities(req.body)))
       }).as('updateEntity')
       creatOrUpdate(false)
       cy.wait('@updateEntity')
       cy.url().should('include', '/entities')
     })

     it('should show error on create failure', () => {
       cy.intercept(
         'PUT',
         '**/entities',
         mockErrorResponse('BadRequestException', 'Invalid data', 400),
       ).as('createEntityFail')
       creatOrUpdate(true)
       cy.wait('@createEntityFail')
       cy.get('.RaNotification-error').should('be.visible')
     })
   })
   ```

### Existing Test Files

- `auth.cy.ts` - Authentication (login, logout, whoami)
- `bank-fees.cy.ts` - Bank fees CRUD
- `companies.cy.ts` - Companies CRUD
- `employee-payments.cy.ts` - Employee payments CRUD
- `equipment.cy.ts` - Equipment CRUD
- `expenses.cy.ts` - Expenses CRUD
- `incomes.cy.ts` - Incomes CRUD
- `jobs.cy.ts` - Jobs CRUD
- `main-menu.cy.ts` - Main menu navigation
- `materials.cy.ts` - Materials CRUD
- `other-expenses.cy.ts` - Other expenses CRUD
- `purchases.cy.ts` - Purchases CRUD
- `travel-equipments.cy.ts` - **NEW** Travel equipments CRUD
- `travel-expenses.cy.ts` - Travel expenses CRUD
- `travel-materials.cy.ts` - Travel materials CRUD
- `travel-peoples.cy.ts` - Travel peoples CRUD
- `users.cy.ts` - Users CRUD
- `warehouses.cy.ts` - Warehouses CRUD

### Security Measures (Prevent backend leaks during tests)

1. **`VITE_API_URL` forced to empty** in `scripts/run-cypress-coverage.sh`:
   ```bash
   export VITE_API_URL=''
   ```
2. **Global security check** in `src/__tests__/support/e2e.ts`:
   ```typescript
   before(() => {
     cy.intercept('**', (req) => {
       if (!req.url.startsWith('http://localhost:5173')) {
         console.warn('⚠️ Potential backend leak detected:', req.url)
       }
     }).as('securityCheck')
   })
   ```
3. **Static serve** uses built app (no proxy to backend)

## CI/CD

### Workflow: `.github/workflows/ci.yml`

1. **Job: `lint-and-typecheck`**
   - Runs `npm run lint`
   - Runs `npm run type-check`

2. **Job: `cypress-with-coverage`**
   - Builds app with coverage instrumentation (`NYC_CAFEOBJECT_COVERAGE=true npm run build`)
   - Starts static server (`serve -s dist -l 5173`)
   - Runs Cypress tests (`npm run cypress:run`)
   - Generates coverage report (`npx nyc report`)
   - **Checks 60% coverage threshold** (`npx nyc check-coverage --lines 60 --functions 60 --branches 60 --statements 60`)
   - Uploads coverage artifact

### Running CI locally (simulate)

```bash
npm run cypress:coverage
```

### Running E2E tests only (no coverage)

```bash
npm run cypress:run  # Requires: npm run dev in another terminal
```

## Quirks

- Cypress config is in `src/__tests__/`, not root - scripts pass `--config-file src/__tests__/cypress.config.ts`
- React Admin login form uses `username` field (not `email`) even though API expects email
- Generated API client uses OpenAPI Generator with `typescript-fetch` template
- Path contains spaces: `/home/herilala/Documents/react admin/firt project/test-admin/`
- Cypress tests import mocks inline (not from `mocks/responses/`) to avoid compilation issues
- **Tests use Build + Static Serve** (not `npm run dev`) - this avoids dev server dependency and proxy issues
- **Coverage excludes**: `src/gen-ts/**` (generated code), `node_modules/**`, `src/__tests__/**`
- **VITE_API_URL** must remain empty/unset for tests to use relative URLs (prevents backend leaks)

## Verification Order

`lint` → `type-check` → `cypress:coverage` (includes build, E2E tests with coverage check at 60%)
