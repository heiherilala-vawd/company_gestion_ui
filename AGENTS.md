# AGENTS.md - Quick Reference

## Commands

- `npm run dev` - Start dev server (port 5173)
- `npm run gen:api` - Generate TypeScript client from `api.yml` to `src/gen-ts/` using OpenAPI Generator
- `npm run cypress:open` - Open Cypress UI for visual E2E testing
- `npm run cypress:run` - Run Cypress tests headless
- `npm run type-check` - TypeScript check (`tsc --noEmit`)
- `npm run lint` - ESLint with auto-fix
- `npm run format` - Prettier format src/

## Architecture

- **React Admin v5** with React 19
- **Auth**: Custom `authProvider` in `src/auth/authProvider.tsx`, uses `/auth/login`, `/auth/whoami` endpoints
- **API client**: Generated code in `src/gen-ts/` from `api.yml` (regenerate with `gen:api`)
- **Data provider**: `src/auth/dataProvider.ts` using `ra-data-simple-rest`

## Testing

- **E2E tests**: `src/__tests__/e2e/*.cy.ts` (Cypress)
- **Test mocks**: `src/__tests__/mocks/responses/*.ts`
- **Cypress config**: `src/__tests__/cypress.config.ts`
- **Prerequisite**: Start dev server first (`npm run dev`) before running Cypress tests
- **Run single test**: `npx cypress run --config-file src/__tests__/cypress.config.ts --spec "src/__tests__/e2e/auth.cy.ts"`

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

3. **Write E2E tests in `src/__tests__/e2e/`**:
   - Use `beforeEach` for setup (clear storage, visit page)
   - Use `mockSuccessResponse()` for 200 responses
   - Place real tests after comments describing the scenario

   ```typescript
   describe('E2E: Authentication', () => {
     beforeEach(() => {
       cy.clearLocalStorage()
       cy.visit('/', { failOnStatusCode: false })
     })

     it('test description', () => {
       cy.intercept('POST', '**/endpoint', mockSuccessResponse(mockData)).as('alias')
       // ... test logic
     })
   })
   ```

4. **After implementation, run and fix errors**:
   ```bash
   npm run dev &  # Terminal 1
   npx cypress run --config-file src/__tests__/cypress.config.ts  # Terminal 2
   ```

## Quirks

- Cypress config is in `src/__tests__/`, not root - scripts pass `--config-file src/__tests__/cypress.config.ts`
- React Admin login form uses `username` field (not `email`) even though API expects email
- Generated API client uses OpenAPI Generator with `typescript-fetch` template
- Path contains spaces: `/home/herilala/Documents/react admin/firt project/test-admin/`
- Cypress tests import mocks inline (not from `mocks/responses/`) to avoid compilation issues

## Verification Order

`lint` → `type-check` → `cypress:run`
