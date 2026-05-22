# CRUD Test Template

## Architecture

Every resource test follows this structure:

1. A `creatOrUpdate(isCreating)` function — handles both create and update flows
2. Navigation helpers: `navigateToDesktop()` / `navigateToMobile()`
3. Wrapper functions: `showList()`, `showDetails()`, `canCreate()`, `canUpdate()`
4. `beforeEach` using shared utils: `interceptGeneralEndpoint()`, `insertInToLocalStorage()`, `loginInPage()`
5. Error scenarios override specific intercepts before calling `creatOrUpdate()`
6. Every scenario tested on both desktop (1280x720) and mobile (375x667)

## Template

```typescript
import { mockSuccessResponse, mockErrorResponse } from '../mocks/responses/auth-api'
import {
  resource1Mock,
  resource2Mock,
  crupdateResourcesMock,
  createOrUpdateResources,
} from '../mocks/responses/resource-api'
import {
  insertInToLocalStorage,
  interceptGeneralEndpoint,
  loginInPage,
  selectEnumType,
} from '../support/utils.ts'

describe('E2E: ResourceName', () => {
  function creatOrUpdate(isCreating: boolean) {
    const crupdatedData = crupdateResourcesMock[0]
    if (isCreating) {
      cy.get('[class*="RaCreateButton"]').click()
    } else {
      cy.contains(<string>resource1Mock.description).click()
      cy.wait('@getResource')
      cy.get('.RaEditButton-root').click()
    }
    // Fill form fields using data-testid selectors
    cy.get('[data-testid="input-description"] textarea:visible')
      .clear()
      .type(<string>crupdatedData.description, { force: true })
    // Enum selects
    selectEnumType('input-status', 'En cours')
    // Submit
    cy.get('button[type="submit"]').click()
  }

  function navigateToDesktop() {
    cy.get('[data-testid="menu-resources"]').click()
    cy.wait('@getResources')
  }

  function navigateToMobile() {
    cy.viewport(375, 667)
    cy.get('[data-testid="menu-item-home"]').should('exist')
    cy.get('[data-testid="menu-resources"]').scrollIntoView()
    cy.get('[data-testid="menu-resources"]').click({ force: true })
    cy.wait('@getResources')
    cy.get('body').then(($body) => {
      if ($body.find('.RaSidebar-modal').length) {
        cy.get('body').click(0, 0)
      }
    })
  }

  function showList(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.contains(<string>resource1Mock.description).should('be.visible')
    cy.contains(<string>resource2Mock.description).should('be.visible')
  }

  function showDetails(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.contains(<string>resource1Mock.description).click()
    cy.wait('@getResource')
    cy.contains(<string>resource1Mock.description).should('be.visible')
  }

  function canCreate(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.intercept('PUT', '**/resources', (req) => {
      req.reply(mockSuccessResponse(createOrUpdateResources(req.body)))
    }).as('createResource')
    creatOrUpdate(true)
    cy.wait(3000)
    cy.wait('@createResource')
    cy.url().should('include', '/resources')
  }

  function canUpdate(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.intercept('PUT', '**/resources', (req) => {
      req.reply(mockSuccessResponse(createOrUpdateResources(req.body)))
    }).as('updateResource')
    creatOrUpdate(false)
    cy.wait(3000)
    cy.wait('@updateResource')
    cy.url().should('include', '/resources')
  }

  beforeEach(() => {
    cy.clearLocalStorage()
    cy.clearCookies()
    insertInToLocalStorage()
    interceptGeneralEndpoint()
    loginInPage()
  })

  it('should display resources list', () => showList(true))
  it('should show resource details', () => showDetails(true))
  it('should create a new resource', () => canCreate(true))
  it('should update an existing resource', () => canUpdate(true))

  it('should show error on create failure', () => {
    navigateToDesktop()
    cy.intercept(
      'PUT',
      '**/resources',
      mockErrorResponse('BadRequestException', 'Invalid data', 400),
    ).as('createResourceFail')
    creatOrUpdate(true)
    cy.wait('@createResourceFail')
    cy.get('.RaNotification-error').should('be.visible')
  })

  it('should show error on update failure', () => {
    navigateToDesktop()
    cy.intercept(
      'PUT',
      '**/resources',
      mockErrorResponse('BadRequestException', 'Update failed', 400),
    ).as('updateResourceFail')
    creatOrUpdate(false)
    cy.wait('@updateResourceFail')
    cy.get('.RaNotification-error').should('be.visible')
  })

  // Mobile variants
  it('should display resources list on mobile', () => showList(false))
  it('should show resource details on mobile', () => showDetails(false))
  it('should create a new resource on mobile', () => canCreate(false))
  it('should update an existing resource on mobile', () => canUpdate(false))
})
```

## Key Patterns

- **PUT intercept with callback**: `cy.intercept('PUT', '**/resources', (req) => { req.reply(mockSuccessResponse(createOrUpdateResources(req.body))) }).as('createResource')`
- **Error tests** override the same URL with `mockErrorResponse` **before** calling `creatOrUpdate()`
- **`cy.wait(3000)`** before waiting for the create/update intercept — gives React Admin time to process
- **Mobile navigation** closes sidebar modal by clicking outside: `cy.get('body').click(0, 0)`
- **`selectEnumType(testId, label)`** — clicks the testid div, then selects `<li>` with matching text
- **Assertion after create/update**: `cy.url().should('include', '/resources')`
