# Environment Variables for E2E Testing

## Environment Files

| File | Purpose |
|------|---------|
| `.env` | Default dev config (`VITE_SIMPLE_REST_URL`) |
| `.env.local` | Gitignored — dev overrides (`VITE_API_URL` points to backend) |
| `.env.test` | Versioned — test defaults (loaded by `scripts/run-cypress-coverage.sh`) |
| `.env.ci.example` | CI template |

## Variables

| Variable | Used In | Required Value for Tests |
|----------|---------|--------------------------|
| `VITE_API_URL` | Vite proxy, data provider | **Must be empty string** — all calls intercepted by `cy.intercept()` |
| `VITE_SIMPLE_REST_URL` | Fallback in data provider | Not used in tests |
| `CYPRESS_BASE_URL` | Cypress config `baseUrl` | `http://localhost:5174` (static serve port, not dev server) |
| `CYPRESS_VIDEO` | Cypress config | `false` for local, `true` for CI |
| `CYPRESS_DEFAULT_COMMAND_TIMEOUT` | Cypress config | `10000` (10 seconds) |
| `CYPRESS_VIEWPORT_WIDTH` | Cypress config | `1280` |
| `CYPRESS_VIEWPORT_HEIGHT` | Cypress config | `720` |
| `NYC_CAFEOBJECT_COVERAGE` | `vite.config.ts` | `true` — enables Istanbul instrumentation at build time |
| `TEST_APP_PORT` | `scripts/run-cypress-coverage.sh` | `5174` — port for static serve |

## Key Rules

- `VITE_API_URL` **must be empty** during tests — Cypress intercepts all API calls via relative URL patterns (`**/jobs`, etc.)
- Coverage requires two env vars: `NYC_CAFEOBJECT_COVERAGE=true` at build time + `@cypress/code-coverage` plugin at runtime
- The dev server runs on port 5173, but tests always run against a static build served on port 5174
- In Docker CI: `CYPRESS_BASE_URL=http://app:5173` (the Cypress container accesses the app container's dev server)
