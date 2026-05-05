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

4. **Write E2E tests in `src/__tests__/e2e/`** with the pattern:
   - Create `creatOrUpdate(isCreating: boolean)` function for create/update logic
   - Use `beforeEach` with utility functions for setup
   - Include create, update, and error scenarios

   ```typescript
   import { mockSuccessResponse, mockErrorResponse } from '../mocks/responses/auth-api'
   import {
     entity1Mock,
     entity2Mock,
     entitiesMock,
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

5. **After implementation, run and fix errors**:
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
