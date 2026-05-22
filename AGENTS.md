# AGENTS.md

## Skills

Skills are stored in `.agents/skills/<name>/SKILL.md` and auto-discovered by OpenCode. Each skill is a focused guide for a specific domain.

**When to load a skill:**
- Load a skill whenever the task matches the skill's description. The available skills and their descriptions are listed in the `skill` tool's definition.
- Do NOT load skills for tasks that don't match their description — the project info in this file is sufficient for general work.

**How to load:**
Use the `skill` tool: `skill(name="<skill-name>")`. The skill name must match the directory name exactly.

## Commands

- `npm run dev` — Dev server port **5173** with Vite proxy to backend:8080
- `npm run build` — Production build (required before tests)
- `npm run lint` → `npm run type-check` → `npm run cypress:coverage` — Verification order
- `npm run cypress:coverage` — Build + serve static on **port 5174** + run E2E + coverage check 60% (no dev server needed)
- `npm run cypress:docker:ci` — CI uses Docker (docker compose, no host Cypress needed)
- `npm run cypress:docker` — Same without video
- `npx cypress run --config-file src/__tests__/cypress.config.ts --spec "src/__tests__/e2e/auth.cy.ts"` — Single test
- `npm run gen:api` — Regenerate `src/gen-ts/` from `api.yml` (OpenAPI Generator)
- `npm run cypress:run` — Requires `npm run dev` in another terminal (no coverage)
- `npm run format` — Prettier `./src`

## Architecture

- **React Admin v5** + **React 19** + **MUI v7**
- **Auth**: Custom at `src/auth/`, uses `/auth/login`, `/auth/whoami`. Login form uses `username` field (not email) even though API expects email.
- **API client**: Generated code in `src/gen-ts/` from `api.yml` — **do not edit manually**
- **API URLs**: `import.meta.env.VITE_API_URL ?? ''` (empty = relative URLs, requests intercepted by Cypress mocks)
- **Data provider**: `src/auth/dataProvider.ts` + `src/config/dynamicResources.ts`. `ra-data-simple-rest` listed in deps but **unused**.
- **Loans (Prêteur)**: Not in sidebar — on custom activity pages. Create at `/incomes_activity` ("Emprunts"), repay at `/employer_payments_activity` ("Retourner emprunt").
- **Style**: NEVER hardcode colors/gradients/shadows/radii outside `src/style/`. Theme tokens in `themeConfig.ts`, component overrides in `theme.ts`, reusable `sx` objects in `components.ts`.

## Testing

- **E2E ONLY** (Cypress) — no unit tests. Vitest scripts in package.json are unused.
- **Tests use Build + Static Serve** (port **5174**, never conflicts with dev on 5173)
- **`VITE_API_URL` must be empty** during tests — all API calls intercepted by `cy.intercept()` in mocks
- **Cypress config** is at `src/__tests__/cypress.config.ts` (not root)
- **Coverage**: Istanbul via `vite-plugin-istanbul` + `@cypress/code-coverage`. `.nycrc` at root. Temp dir override at `src/__tests__/.nycrc` → `../../.nyc_output`.
- **Coverage excludes**: `src/gen-ts/**`, `src/__tests__/**`, `node_modules/**`, `cypress/**`, `**/*.d.ts`, `**/coverage/**`, `**/dist/**`, `scripts/**`

## Environment variables placement

| Variable | `.env` | `.env.local` | `.env.test` | `.env.ci` | `docker-compose` | CI workflow |
|----------|--------|-------------|-------------|-----------|-----------------|-------------|
| `VITE_SIMPLE_REST_URL` | ✅ | | | | | |
| `VITE_API_URL` | | ✅ (dev) | ✅ (empty) | ✅ (empty) | ✅ (empty) | |
| `CYPRESS_BASE_URL` | | | ✅ | ✅ | ✅ | |
| `CYPRESS_VIDEO` | | | ✅ | ✅ | | ✅ |
| `NYC_CAFEOBJECT_COVERAGE` | | | ✅ | ✅ | ✅ | ✅ |

- `.env.test` is versioned and sourced automatically by `scripts/run-cypress-coverage.sh`
- `.env.local`, `.env.ci` are gitignored
- Test default `CYPRESS_BASE_URL=http://localhost:5174`, Docker `CYPRESS_BASE_URL=http://app:5173`

## CI/CD

- **`lint-and-typecheck`**: Node 20 on runner, `npm ci` → `npm run lint` → `npm run type-check`
- **`cypress-with-coverage`**: Docker-based, `npm run cypress:docker:ci` → coverage artifact upload
- Docker layer caching via `actions/cache` with `/tmp/.buildx-cache`
