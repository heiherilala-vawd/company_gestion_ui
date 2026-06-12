# AGENTS.md

## Commands

- `npm run dev` — Dev server port **5173**, Vite proxies `/auth`, `/users`, `/companies`, `/materials`, `/equipment`, `/warehouses`, `/histories`, `/jobs` to `backend:8080`
- `npm run build` — Production build (required before tests)
- `npm run lint` → `npm run type-check` → `npm run cypress:coverage` — Verification order
- `npm run cypress:coverage` — Build + serve static on **port 5174** + E2E + coverage check (thresholds: lines 57, functions 60, branches 45, statements 55)
- `npm run cypress:run` — Requires `npm run dev` in another terminal (no coverage)
- `npm run cypress:docker` — Docker compose, no host Cypress needed
- `npm run cypress:docker:ci` — Same with `CYPRESS_VIDEO=true`
- `npx cypress run --config-file src/__tests__/cypress.config.ts --spec "src/__tests__/e2e/<name>.cy.ts"` — Single test
- `npm run gen:api` — Regenerate `src/gen-ts/` from `api.yml` (OpenAPI Generator, **do not edit by hand**)
- `npm run format` — Prettier `./src` (options: `semi: false`, `singleQuote: true`, `trailingComma: 'all'`, `printWidth: 100`)

## Architecture

- **React Admin v5** + **React 19** + **MUI v7**
- **Auth**: Custom at `src/auth/`. Login form sends `username` field (React Admin default), authProvider maps it to `email` for the API.
- **Data provider**: Custom at `src/auth/dataProvider.ts` + URL resolution in `src/config/dynamicResources.ts`. Always uses `PUT` (not POST/PATCH) for create and update. Create wraps data in array: `body: JSON.stringify([convertDates(params.data))]`.
- **URL hierarchy** driven by localStorage keys: `currentCompanyId` → `currentJobId` → `currentExpenseId` → `currentTravelExpenseId`. Resources resolve to:
  - Flat: `/resource` (companies, users)
  - Company-scoped: `/companies/{companyId}/{resource}` (jobs, warehouses, equipment, materials, users, leave_types, etc.)
  - Job-scoped: `/companies/{companyId}/job/{jobId}/user/{userId}/{resource}` (expenses, incomes, purchases, bank_fees, etc.)
  - Expense-scoped: same prefix + `/expenses/{expenseId}/{resource}`
  - Travel-expense-scoped: same prefix + `/travel_expenses/{travelExpenseId}/{resource}` (travel_people, travel_materials, travel_equipment)

### Source layout
```
src/
├── auth/            # Auth provider, data provider, login/register pages
├── config/          # dynamicResources.ts (URL resolution), homeButtons.ts
├── core/            # App.tsx, Layout, Menu, AppBar
├── features/        # Business pages organized by domain
│   ├── money/       # expenses, incomes, purchases, bank_fees, employee_payments, etc.
│   ├── storage/     # warehouses, materials, equipment, travel/
│   ├── transversal/ # companies, jobs, usersSetup
│   └── hr/          # leaves, leave_types, leave_configs
├── generic/         # Reusable: GenericContext, GenericSelector, FormToolbar,
│                    #   ResponsiveDatagrid, ReferenceSelectWithCreate
├── gen-ts/          # OpenAPI-generated client — do not edit
├── style/           # Theme tokens (themeConfig.ts), overrides (theme.ts), shared sx (components.ts)
├── utili/           # Utilities
└── __tests__/       # E2E tests + mocks
```

### Resource structure
Standard CRUD directory: `index.tsx` (exports `{ list, create, edit, show, icon, recordRepresentation }`) + `*List.tsx` + `*Create.tsx` + `*Edit.tsx` + `*Show.tsx` + `*Form.tsx`.

- `usersSetup/` has **no `create` key** — users not created via UI
- `leave_types` and `leave_configs` are registered as `Resource` in App.tsx **without** descriptors (used as sub-forms only)
- **4 hierarchy entities** with Context + Selector: Company, Job, Expense, TravelExpense (uses `createGenericContext`, stores ID in both state and localStorage)
- **Activity pages** (not CRUD, sidebar buttons): `ExpensesActivity`, `IncomesActivity`, `EmployerPaymentActivity`, `TravelMaterialActivity`
- **Operation forms**: `purchase_operation/PurchaseActivityForm`, `travel_operation/TravelOperationForm`

### Style
NEVER hardcode colors/gradients/shadows/radii outside `src/style/`. Theme tokens in `themeConfig.ts`, component overrides in `theme.ts`, reusable `sx` objects in `components.ts`.

## Testing

- **E2E only** (Cypress) — Vitest scripts in package.json are unused
- **`VITE_API_URL` must be empty** during tests — all API calls intercepted by `cy.intercept()`
- **Cypress config**: `src/__tests__/cypress.config.ts` (not root)
- **Coverage**: Istanbul via `vite-plugin-istanbul` + `@cypress/code-coverage`. Set `NYC_CAFEOBJECT_COVERAGE=true` to instrument.
- **Coverage excludes**: `src/gen-ts/**`, `src/__tests__/**`, `node_modules/**`, `cypress/**`, `**/*.d.ts`, `**/coverage/**`, `**/dist/**`, `scripts/**`
- **Test helpers**: `src/__tests__/support/utils.ts` — `interceptGeneralEndpoint()`, `loginInPage()`, `selectReferenceWithCreate()`, `selectEnumType()`, and convenience wrappers (`selectJob()`, `selectCompany()`, etc.)
- **Mocks** in `src/__tests__/mocks/responses/`: each resource has `<name>-api.ts` with mock data, `createOrUpdate*` function, and `mockSuccessResponse`/`mockErrorResponse` helpers (from `auth-api.ts`). `index.ts` re-exports all.

### Env vars placement

| Variable | `.env.example` | `.env.local` | `.env.test` | `.env.ci` | docker-compose | CI workflow |
|----------|----------------|-------------|-------------|-----------|-----------------|-------------|
| `VITE_PROXY_TARGET` | `http://localhost:8080` | | | | | |
| `VITE_API_URL` | (défini par l'utilisateur) | ✅ (dev) | ✅ (empty) | ✅ (empty) | ✅ (empty) | |
| `VITE_NGROK_HOST` | (optionnel) | | | | | |
| `CYPRESS_BASE_URL` | | | ✅ (5174) | ✅ (app:5173) | ✅ (app:5173) | |
| `CYPRESS_VIDEO` | | | ✅ | ✅ | | ✅ |
| `NYC_CAFEOBJECT_COVERAGE` | | | ✅ | ✅ | ✅ | ✅ |

## CI/CD

- **`lint-and-typecheck`**: Node 20, `npm ci` → `npm run lint` → `npm run type-check`
- **`cypress-with-coverage`**: Docker-based (`npm run cypress:docker:ci`), coverage artifact upload
- Docker layer caching via `actions/cache` with `/tmp/.buildx-cache`

## Skills — OBLIGATOIRE : À LIRE AVANT TOUTE MODIFICATION

**Règle absolue :** Avant d'écrire ou modifier du code, des tests, ou des fichiers de style, LOADER la skill correspondante avec `skill(name="<name>")` et appliquer SES RÈGLES.

Skills disponibles :

| Skill | Quand l'utiliser |
|-------|-----------------|
| `clean-code` | **SRP, DRY, KISS, YAGNI** — TOUTE écriture/refactor de code. Fonctions < 20 lignes, pas de duplication, noms révélateurs, guard clauses |
| `clean-code-ui-ux` | **Style MUI/RA** — TOUTE modification UI. Architecture 3 couches (tokens → sx → theme), pas de valeurs hardcodées, pas d'overflow:hidden sur les conteneurs |
| `e2e-testing` | **Tests Cypress** — TOUTE écriture/modification de test. Patterns d'interception, structure CRUD, responsive desktop/mobile |
| `tdd` | **Développement piloté par les tests** — Cycle RED→GREEN→REFACTOR. Test d'abord, implémentation ensuite |
| `dynamic-resources` | **URLs hiérarchiques** — data provider, résolution d'URL, contextes hiérarchiques |
| `select-with-create` | **Références avec création inline** — ReferenceSelectWithCreate, SelectWithCreateProvider |
| `id-management` | **UUID dans les formulaires** — Champ `id` caché avec UUID auto-généré |
| `frontend-design` | **Interfaces utilisateur** — Composants React, pages, layouts de haute qualité |
| `visual-inspect` | **Vérification visuelle** — Capture d'écran après modifications CSS (Playwright) |
| `cron-input` | **Expressions cron** — Builders visuels d'expressions cron |
| `skill-creator` | **Création de nouveau skill** — Documentation de pattern réutilisable |
| `brand-guidelines` | **Couleurs et typographie** — Chartes graphiques officielles |

**Checklist avant chaque tâche :**
- [ ] Quelle skill correspond à mon travail ? (`grep -r "describes\|Use this" .agents/skills/<name>/SKILL.md`)
- [ ] L'ai-je loadée avec `skill(name="<name>")` ?
- [ ] Ma modification respecte-t-elle les règles de la skill ?
