# AGENTS.md

## Commands

- `npm run dev` — Dev server port **5173**, Vite proxies `/auth`, `/users`, `/companies`, `/materials`, `/equipment`, `/warehouses`, `/histories`, `/jobs` to `backend:8080`
- `npm run build` — Production build (required before tests)
- `npm run lint` → `npm run type-check` → `npm run cypress:coverage` — Verification order
- `npm run cypress:coverage` — Build + serve static on **port 5174** + E2E + coverage check (thresholds: lines 57, functions 60, branches 45, statements 55)
- `npm run cypress:coverage -- --skip-build` — Reuse existing `dist/`
- `npm run cypress:run` — Requires `npm run dev` in another terminal (no coverage)
- `npm run cypress:docker` — Docker compose, no host Cypress needed
- `npm run cypress:docker:ci` — Same with `CYPRESS_VIDEO=true`
- `npx cypress run --config-file src/__tests__/cypress.config.ts --spec "src/__tests__/e2e/<name>.cy.ts"` — Single test
- `npx cypress open --config-file src/__tests__/cypress.config.ts` — Interactive mode
- `npx vitest run` — Unit tests (Vitest, fast)
- `npx vitest run src/__tests__/unit/<name>.test.ts` — Single unit test
- `npm run gen:api` — Regenerate `src/gen-ts/` from `api.yml` (OpenAPI Generator, **do not edit by hand**)
- `npm run format` — Prettier `./src` (options: `semi: false`, `singleQuote: true`, `trailingComma: 'all'`, `printWidth: 100`)

## Architecture

- **React Admin v5** + **React 19** + **MUI v7** + **Vite 7**
- **Auth**: Custom at `src/auth/`. Login form sends `username` field (React Admin default), authProvider maps it to `email` for the API.
- **Data provider**: Custom at `src/auth/dataProvider.ts` + URL resolution in `src/config/dynamicResources.ts`. Always uses `PUT` (not POST/PATCH) for create and update. Create wraps data in array: `body: JSON.stringify([convertDates(params.data))]`. `normalizeRecord()` flattens nested `{id}` refs to `_id` suffix fields.
- **URL hierarchy** driven by localStorage keys: `currentCompanyId` → `currentJobId` → `currentExpenseId` → `currentTravelExpenseId`. Resources resolve via `getMiddleUrl/getMiddleUrlWithId/getMiddleUrlWithQuery` in `dynamicResources.ts`:
  - Flat: `/{resource}` (companies, users)
  - Company-scoped: `/users/{userId}/companies/{companyId}/{resource}` (jobs, warehouses, equipment, materials, leave_types, etc.)
  - Job-scoped: `/users/{userId}/companies/{companyId}/jobs/{jobId}/{resource}` (expenses, incomes, purchases, bank_fees, employee_payments, etc.)
  - Expense-scoped: adds `expenses/{expenseId}/{resource}`
  - Travel-expense-scoped: adds `travel_expenses/{travelExpenseId}/{resource}`
  - Cash-account-scoped: adds `cash_accounts/{cashAccountId}/transactions/{resource}`

### Source layout
```
src/
├── auth/             # Auth provider, data provider, login/register pages
├── config/           # dynamicResources.ts (URL resolution), homeButtons.ts
├── core/             # App.tsx, Layout, Menu, AppBar
├── features/         # Business pages by domain (money/, storage/, transversal/, hr/, reports/, notifications/)
├── generic/          # GenericContext, GenericSelector, FormToolbar, ResponsiveDatagrid, ReferenceSelectWithCreate
├── gen-ts/           # OpenAPI-generated client — DO NOT EDIT
├── style/            # Theme tokens (themeConfig.ts), overrides (theme.ts), shared sx (components.ts), ThemeContext
├── utili/            # Utilities
└── __tests__/        # E2E tests + mocks + unit tests
```

### Resource conventions
- Each resource is a directory with: `index.tsx` (exports `{ list, create, edit, show, icon, recordRepresentation }`) + `*List.tsx` + `*Create.tsx` + `*Edit.tsx` + `*Show.tsx` + `*Form.tsx`
- `usersSetup/` has **no `create` key** — users not created via UI
- `leave_types`, `leave_configs` are registered as `Resource` **without** descriptors (sub-forms only)
- **4 hierarchy entities** with Context + Selector: Company, Job, Expense, TravelExpense — uses `createGenericContext`, stores ID in both state and localStorage
- **Activity pages** (not CRUD, sidebar buttons): `ExpensesActivity`, `IncomesActivity`, `EmployerPaymentActivity`, `TravelMaterialActivity`, etc.
- **Operation forms**: `purchase_operation/PurchaseActivityForm`, `travel_operation/TravelOperationForm`
- **Resource URLs have overrides**: see `RESOURCE_URL_OVERRIDES` in `dynamicResources.ts` (e.g. `receipts → incomes_receipts`, `equipment → equipments`)

### Style
NEVER hardcode colors/gradients/shadows/radii outside `src/style/`. Theme tokens in `themeConfig.ts`, component overrides in `theme.ts`, reusable `sx` objects in `components.ts`.

## Testing

- **E2E** (Cypress 15) + **Unit tests** (Vitest 4) — 44 E2E specs, 10 unit test files
- **`VITE_API_URL` must be empty** during tests — all API calls intercepted by `cy.intercept()`
- **`VITE_COVERAGE=true`** enables Istanbul instrumentation at build (handled by `.env.test`)
- **`VITE_MUTATION_MODE=pessimistic`** needed to disable undoable (5s wait) React Admin mutations in tests
- **Cypress config**: `src/__tests__/cypress.config.ts` (not root)
- **Coverage**: Istanbul via `vite-plugin-istanbul` + `@cypress/code-coverage`. Thresholds in `.nycrc` (lines 57, functions 60, branches 45, statements 55).
- **Coverage excludes**: `src/gen-ts/**`, `node_modules/**`, `cypress/**`, `**/*.d.ts`, `**/coverage/**`, `**/dist/**`, `scripts/**`
- **Test helpers**: `src/__tests__/support/utils.ts` — `interceptGeneralEndpoint()`, `loginInPage()`, `selectReferenceWithCreate()`, `selectEnumType()`, `selectJob()`, `selectCompany()`, etc.
- **Mocks** in `src/__tests__/mocks/responses/`: each resource has `<name>-api.ts` with mock data, `createOrUpdate*` function, and `mockSuccessResponse`/`mockErrorResponse` helpers. `index.ts` re-exports all.
- **Custom Cypress commands**: `src/__tests__/support/commands.ts` — `cy.login()`, `cy.shouldBeOnLoginPage()`, `cy.shouldBeOnHomePage()`
- **`data-testid` convention**: `menu-<resource>`, `input-<field-name>`, for `ReferenceSelectWithCreate`: `input-{reference}-id` (auto-generated). Use `#menu-{source}` selector for dropdown options.
- **Global intercept guard**: `src/__tests__/support/e2e.ts` logs API calls that leak past `cy.intercept()`

### Env vars for tests

| Variable | Purpose |
|----------|---------|
| `VITE_API_URL` | Must be **empty** during tests |
| `VITE_COVERAGE` | `true` to enable Istanbul instrumentation |
| `VITE_MUTATION_MODE` | `pessimistic` to disable undoable mutations |
| `CYPRESS_BASE_URL` | `http://localhost:5174` (local) or `http://app:5173` (Docker) |
| `NYC_CAFEOBJECT_COVERAGE` | `true` enables coverage task in Cypress |

## CI/CD

- **`lint-and-typecheck`**: Node 20, `npm ci` → `npm run lint` → `npm run type-check`
- **`cypress-with-coverage`**: Docker-based (`npm run cypress:docker:ci`), coverage artifact upload
- Docker layer caching via `actions/cache` with `/tmp/.buildx-cache`
- `.github/workflows/ci.yml` triggers on `push`/`PR` to `main`, `master`, `develop`

## Skills — LOAD BEFORE CODING

**Rule**: Before writing/modifying code, tests, or styles, load the matching skill with `skill(name="<name>")`.

| Skill | When |
|-------|------|
| `clean-code` | Any code write/refactor — SRP, DRY, small functions, guard clauses |
| `clean-code-ui-ux` | Any UI change — 3-layer styling, no hardcoded values |
| `e2e-testing` | Any test write/modify — E2E (Cypress) intercept patterns + unit (Vitest) patterns |
| `tdd` | RED→GREEN→REFACTOR — test first, both E2E and unit |
| `dynamic-resources` | URL hierarchy, data provider, contexts |
| `select-with-create` | ReferenceSelectWithCreate, SelectWithCreateProvider |
| `id-management` | Hidden UUID `id` field in forms |
| `frontend-design` | High-quality UI components, pages, layouts |
| `visual-inspect` | CSS verification via Playwright screenshots |
| `cron-input` | Visual cron expression builders |
| `skill-creator` | Create a new `.agents/skills/<name>/SKILL.md` |
| `brand-guidelines` | Brand colors and typography |
| `design-taste-frontend` | Anti-slop landing pages, portfolios, redesigns |
| `minimalist-ui` | Clean editorial-style interfaces |
| `theme-factory` | Themed artifacts (slides, docs, HTML pages) |
| `ui-ux-pro-max` | UI/UX design for web and mobile |
| `high-end-visual-design` | High-end agency-quality visual design |
| `solid-practices` | SOLID principles |
| `find-skills` | Discover and install new skills |

**Checklist**: What skill matches my work? Loaded it? Code follows its rules?
