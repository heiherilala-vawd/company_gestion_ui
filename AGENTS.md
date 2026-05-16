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
- `npm run format` - Prettier format src/ (`prettier --write ./src`)
- `npm run test` - Run Vitest unit tests (`vitest run`)
- `npm run test:watch` - Vitest watch mode
- `npm run test:coverage` - Vitest unit tests with coverage

## Architecture

- **React Admin v5** with React 19
- **Auth**: Custom auth in `src/auth/` (`authProvider.tsx`, `LoginPage.tsx`, `RegisterPage.tsx`, `CustomLogin.tsx`), uses `/auth/login`, `/auth/whoami` endpoints
  - Uses `import.meta.env.VITE_API_URL ?? ''` for API base URL (currently empty = relative URLs)
- **API client**: Generated code in `src/gen-ts/` from `api.yml` (regenerate with `gen:api`)
- **Data provider**: `src/auth/dataProvider.ts` - uses helper functions from `src/config/dynamicResources.ts`
  - All API URLs are relative (no hardcoded backend URL)
  - `ra-data-simple-rest` listed in dependencies but **unused** in source code
- **Core app**: `src/core/` (App.tsx, AppBar.tsx, Layout.tsx, Menu.tsx)
- **Reusable components**: `src/generic/` (FormToolbar, GenericContext, GenericSelector, ReferenceSelectWithCreate, ResponsiveDatagrid, SelectWithCreateProvider)
- **Utilities**: `src/utili/` (index.tsx, utils.tsx)
- **Feature pages**: `src/features/` (HomePage, activity components, money/storage/transversal sub-modules)
- **Loans (Prêteur)**: Loans are managed across two activity pages:
  - **Create**: `src/features/IncomesActivity.tsx` — Toggle to "Emprunts" (`value="loan"`), uses `ResourceContextProvider value="loans"`. Form fields: `lender`, `amount`, `interest_rate`, `start_date`, `description`, `status` (default `ACTIVE`). API: `PUT /companies/{comp_id}/job/{job_id}/user/{user_id}/loans`
  - **Repay**: `src/features/EmployerPaymentActivity.tsx` — Toggle to "Retourner emprunt" (`value="loans"`), fetches loans via `useGetList('loans', ...)`. Shows active & defaulted tables with repayment inputs. Repayment API: `POST {loans}/{id}/repayments` with body `{ id, loan_id, amount, comment }`
  - **Generated types**: `Loan`, `CrupdateLoan`, `LoanRepayment`, `CrupdateLoanRepayment` in `src/gen-ts/`
  - **URL pattern**: `/companies/{comp_id}/job/{job_id}/user/{user_id}/loans` (dynamic job resource)
- **Environment**: `.env` file contains `VITE_SIMPLE_REST_URL=http://localhost:8080` (not used in code)

## Theme System (Style Centralization)

All design tokens (colors, gradients, shadows, border radii, transitions, spacing, typography) are centralized in `src/style/` to allow global style changes from a single place.

### File Hierarchy

- **`src/style/themeConfig.ts`** — **SOURCE OF TRUTH**: all design tokens and helper functions
  - `colors` — primary, secondary, success, warning, error, info, light/dark mode colors, mode-aware backgrounds (`subtleBg`, `subtleBgHover`, `primaryBg`, `primaryBgHover`, `tableHeader`, `border`, `divider`)
  - `gradients` — primary, primaryHorizontal, secondary, sidebar, success, error, +Dark variants
  - `shadows` — light/dark variants (`sm`, `md`, `lg`, `primary`, `primaryHover`, `primaryActive`, `dialog`)
  - `borderRadius` — `xs(1)`, `sm(2)`, `md(4)`, `lg(6)`, `xl(8)`, `xxl(10)`
  - `transitions` — `default(200ms)`, `fast(100ms)`, `slow(300ms)`, `spin`
  - `spacing` — `xs(4)`, `sm(8)`, `md(16)`, `lg(24)`, `xl(32)`, `xxl(48)`
  - `typography` — fontFamily, h1-h6, body1/2, caption, button
  - Helpers: `getShadow()`, `getBorder()`, `getDivider()`, `getSubtleBg()`, `getSubtleBgHover()`, `getPrimaryBg()`, `getPrimaryBgHover()`, `getTableHeader()`, `getTextPrimary()`, `getTextSecondary()`, `getModeValue()`
  - `commonHover` — interactive hover presets (`row`, `translateX`, `translateY`, `lift`)

- **`src/style/theme.ts`** — MUI theme creation consuming `themeConfig`, exports `lightTheme`, `darkTheme`, `commonStyles`, plus component overrides for 20+ MUI components (`MuiButton`, `MuiCard`, `MuiTextField`, `MuiTable`, etc.)

- **`src/style/components.ts`** — Reusable `sx` style objects used across the app:
  - `appBarStyles`, `menuStyles`, `formStyles`, `showStyles`, `datagridStyles`
  - `homePageStyles`, `emptyStateStyles`, `layoutStyles`, `skeletonStyles`
  - `operationFormStyles` — shared styles for complex operation forms (flex layouts, toggle box, collapse sections)
  - All values reference `themeConfig` helpers — **no hardcoded colors/rgba**

- **`src/style/ThemeContext.tsx`** — Light/dark mode toggle (persisted in localStorage)

### MUI Override Pattern

All MUI component overrides (and React Admin component overrides) are in `src/style/theme.ts` inside the `commonComponentOverrides(mode)` function.

- **Pattern**: `MuiComponentName: { styleOverrides: { slotName: { ...styles } } }`
- **React Admin components** use the same pattern with `Ra` prefix (e.g., `RaCreate`, `RaEdit`, `RaShow`, `RaSimpleForm`, `RaList`, `RaSaveButton`, `RaEmpty`)
- **All visual values** reference `themeConfig` tokens — never hardcoded
- **Mode-aware styles** use `mode` parameter (e.g., `mode === 'light' ? colors.light.border : colors.dark.border`)
- **Structure**:
  ```typescript
  const commonComponentOverrides = (mode: 'light' | 'dark'): ThemeOptions['components'] => ({
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: br.md,
          background: mode === 'light' ? gradients.primary : gradients.primaryDark,
          color: mode === 'light' ? '#fff' : '#1a1a2e',
        },
        containedPrimary: { ... },
      },
    },
    // React Admin
    RaCreate: {
      styleOverrides: { ... },
    },
  })
  ```
- Consumed by `createAppTheme(mode)` → `createTheme({ components: commonComponentOverrides(mode) })`
- **To override a new MUI/RA component**: add its entry in `commonComponentOverrides()`, reference `themeConfig` tokens, use `mode` for light/dark variants

### Design Rules

1. **NEVER hardcode colors, rgba, gradients, shadows, border radii, or transitions** outside `src/style/`. Always use:
   - Theme-aware helpers from `themeConfig` (e.g., `getShadow(theme.palette.mode, 'sm')`)
   - Predefined `sx` objects from `components.ts`
   - MUI theme tokens (e.g., `'background.paper'`, `'text.primary'`, `'primary.main'`)

2. **To change the entire app look**: edit only `src/style/themeConfig.ts` (colors, borderRadius, shadows, etc.)

3. **To add new theme options** (e.g., a third theme mode): extend `themeConfig`, add palette in `theme.ts`, update `ThemeContext.tsx`

4. **Inline `sx={{ flex: 1 }}` or spacing values** (mt, mb, p, gap) are acceptable for layout — these are not design tokens.

## Testing

### Overview

- **E2E tests ONLY**: `src/__tests__/e2e/*.cy.ts` (Cypress)
- **No unit tests**: This project uses only E2E tests (no Vitest/Jest unit tests)
- **Coverage**: NYC/Istanbul via Cypress (`npm run cypress:coverage`)
- **Test mocks**: `src/__tests__/mocks/responses/*.ts`
- **Cypress config**: `src/__tests__/cypress.config.ts`
- **Support utils**: `src/__tests__/support/utils.ts`, `commands.ts`, `e2e.ts`

### Test Execution (IMPORTANT: No dev server needed)

- **Prerequisite**: NO dev server needed! Tests use **Build + Static Serve** approach
- **E2E + Coverage**: `npm run cypress:coverage` (builds app, serves statically, runs E2E tests with NYC coverage at 60%)
- **Run single test**: `npx cypress run --config-file src/__tests__/cypress.config.ts --spec "src/__tests__/e2e/auth.cy.ts"`
- **Local dev testing**: `npx cypress open --config-file src/__tests__/cypress.config.ts`

### Coverage Configuration (E2E only)

- **Tool**: NYC (Istanbul) with `vite-plugin-istanbul` for instrumentation during build
- **Threshold**: 60% minimum (lines, functions, branches, statements)
- **Settings** (`.nycrc`):
  - `"all": true` — include all files in `src/`
  - `"include": ["src/**/*.ts", "src/**/*.tsx"]`
  - `"extension": [".ts", ".tsx"]`
  - `"check-coverage": true`
- **Exclusions** (`.nycrc`):
  - `node_modules/**`
  - `src/gen-ts/**` (generated API code)
  - `src/__tests__/**`
  - `cypress/**`
  - `**/*.d.ts`
  - `**/coverage/**`
  - `**/dist/**`
  - `scripts/**`
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
   - **Loan toggle pattern**: Loans are on custom activity pages (not sidebar menu). Navigate directly via `cy.visit('/incomes_activity')` for creation ("Emprunts" toggle) or `cy.visit('/employer_payments_activity')` for repayment ("Retourner emprunt" toggle). Create uses `PUT **/loans`; list uses `GET **/loans*`; repayment uses `POST **/loans/*/repayments`.

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
         cy.get('[data-testid="AddIcon"]').click()
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
- `travel-equipments.cy.ts` - Travel equipments CRUD
- `travel-expenses.cy.ts` - Travel expenses CRUD
- `travel-materials.cy.ts` - Travel materials CRUD
- `travel-peoples.cy.ts` - Travel peoples CRUD
- `users.cy.ts` - Users CRUD
- `warehouses.cy.ts` - Warehouses CRUD
- Loans are tested via `incomes.cy.ts` (create) and `employee-payments.cy.ts` (repay) using the toggle pattern above

### Existing Mock Files

- `auth-api.ts`, `bank-fees-api.ts`, `companies-api.ts`, `employee-payments-api.ts`, `equipment-api.ts`, `expenses-api.ts`, `histories-api.ts`, `incomes-api.ts`, `jobs-api.ts`, `materials-api.ts`, `other-expenses-api.ts`, `purchases-api.ts`, `travel-equipment-api.ts`, `travel-expenses-api.ts`, `travel-materials-api.ts`, `travel-people-api.ts`, `users-api.ts`, `warehouses-api.ts`, `index.ts`
- Loans mocks should go in `loans-api.ts` (not yet created) — mock `Loan` and `CrupdateLoan` types with `lender`, `amount`, `interest_rate`, `start_date`, `status`, `remaining_amount`. Repayment mocks use `CrupdateLoanRepayment`. Add interceptors in `utils.ts`: `GET **/loans*`, `PUT **/loans`, `POST **/loans/*/repayments`.

### Mapper Functions

All mapper functions live in `src/__tests__/support/mappers.ts` and convert a full entity (schema) to its `Crupdate` equivalent, flattening nested objects to FK fields and dropping audit/computed fields.

```typescript
import { toCrupdateEquipmentMapper, toAuditUserMapper } from '../../support/mappers.ts'

// Before (manual):
equipment: {
  id: equipment1Mock.id,
  name: equipment1Mock.name,
  description: equipment1Mock.description,
  warehouse_id: equipment1Mock.warehouse.id,
  floor_number: equipment1Mock.floor_number,
  storage_number: equipment1Mock.storage_number,
  comment: equipment1Mock.comment,
}

// After (mapper):
equipment: toCrupdateEquipmentMapper(equipment1Mock)

// Audit fields:
created_by: toAuditUserMapper(user1Mock),
updated_by: toAuditUserMapper(user1Mock),
```

**Available mappers** (`toCrupdateXxxMapper`): `ExpenseMoney`, `Job`, `Warehouse`, `Equipment`, `Material`, `Company`, `User`, `IncomeMoney`, `Loan`, `TravelExpense`, `TravelEquipment`, `TravelMaterials`, `TravelPeople`, `EmployeePayment`, `Purchase`, `BankFee`, `OtherExpense`, `LoanRepayment`, `IncomeType`.

**`toAuditUserMapper(user)`** — extracts `{ id, role, first_name, last_name, sex, email }` from a `User` for `created_by`/`updated_by`.

**Pattern**: mapper drops `created_at`, `updated_at`, `created_by`, `updated_by` (audit), flattens nested objects (e.g., `job.id` → `job_id`, `warehouse.id` → `warehouse_id`), and drops computed fields (`remaining_amount`, `principal_portion`, `interest_portion`) and nested arrays (`repayments`, `receipts`, `material_warehouses`).

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

Both jobs share setup: `actions/checkout@v4`, `actions/setup-node@v4` (Node 20, npm cache), `npm ci`.

1. **Job: `lint-and-typecheck`**
   - Runs `npm run lint`
   - Runs `npm run type-check`

2. **Job: `cypress-with-coverage`**
   - Delegates to `npm run cypress:coverage` (builds with coverage, serves statically, runs E2E tests, checks 60% threshold)
   - Uploads coverage report artifact via `actions/upload-artifact@v4`

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
- Path contains spaces: `/home/herilala/Documents/react admin/firt project/test-admin/` (original path; current: `/home/vawd/Bureau/company_gestion_ui`)
- Cypress tests import mocks inline (not from `mocks/responses/`) to avoid compilation issues
- **Tests use Build + Static Serve** (not `npm run dev`) - this avoids dev server dependency and proxy issues
- **Coverage excludes**: `src/gen-ts/**` (generated code), `node_modules/**`, `src/__tests__/**`
- **VITE_API_URL** must remain empty/unset for tests to use relative URLs (prevents backend leaks)

## Verification Order

`lint` → `type-check` → `cypress:coverage` (includes build, E2E tests with coverage check at 60%)
