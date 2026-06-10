import { mockSuccessResponse, mockErrorResponse } from '../mocks/responses/auth-api'
import {
  otherExpenseType1Mock,
  otherExpenseType2Mock,
} from '../mocks/responses/other-expense-type-api'
import { insertInToLocalStorage, interceptGeneralEndpoint, loginInPage } from '../support/utils.ts'

describe('E2E: Other Expense Types', () => {
  function creatOrUpdate(isCreating: boolean) {
    if (isCreating) {
      cy.get('[class*="RaCreateButton"]').click()
    } else {
      cy.contains(<string>otherExpenseType1Mock.name).click()
      cy.wait('@getOtherExpenseType')
      cy.get('.RaEditButton-root').click()
    }
    cy.get('[data-testid="input-name"] input').clear().type('Type test')
    cy.get('[data-testid="input-description"] textarea:visible')
      .clear()
      .type('Description test', { force: true })
    cy.get('button[type="submit"]').click({ force: true })
  }

  function navigateToDesktop() {
    cy.get('[data-testid="menu-other-expense-types"]').click()
    cy.wait('@getOtherExpenseTypes')
  }

  function navigateToMobile() {
    cy.viewport(375, 667)
    cy.get('[data-testid="menu-item-home"]').should('exist')
    cy.get('[data-testid="menu-other-expense-types"]').scrollIntoView()
    cy.get('[data-testid="menu-other-expense-types"]').click({ force: true })
    cy.wait('@getOtherExpenseTypes')
    cy.get('body').then(($body) => {
      if ($body.find('.RaSidebar-modal').length) {
        cy.get('body').click(0, 0)
      }
    })
  }

  function showList(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.contains(<string>otherExpenseType1Mock.name).should('be.visible')
    cy.contains(<string>otherExpenseType2Mock.name).should('be.visible')
  }

  function showDetails(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.contains(<string>otherExpenseType1Mock.name).click()
    cy.wait('@getOtherExpenseType')
    cy.contains(<string>otherExpenseType1Mock.name).should('be.visible')
    cy.contains(<string>otherExpenseType1Mock.description).should('be.visible')
  }

  function canCreate(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.intercept('PUT', '**/other_expense_types*', (req) => {
      req.reply(mockSuccessResponse([{ id: 'newOetId', ...req.body[0], name: 'Type test' }]))
    }).as('createOtherExpenseType')
    creatOrUpdate(true)
    cy.wait(3000)
    cy.wait('@createOtherExpenseType')
    cy.url().should('include', '/other_expense_types')
  }

  function canUpdate(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.intercept('PUT', '**/other_expense_types*', (req) => {
      req.reply(mockSuccessResponse([{ id: 'oet1_id', ...req.body[0], name: 'Type test' }]))
    }).as('updateOtherExpenseType')
    creatOrUpdate(false)
    cy.wait(3000)
    cy.wait('@updateOtherExpenseType')
    cy.url().should('include', '/other_expense_types')
  }

  beforeEach(() => {
    cy.clearLocalStorage()
    cy.clearCookies()
    insertInToLocalStorage()
    interceptGeneralEndpoint()
    loginInPage()
  })

  it('should display other expense types list', () => showList(true))
  it('should show other expense type details', () => showDetails(true))
  it('should create a new other expense type', () => canCreate(true))
  it('should update an existing other expense type', () => canUpdate(true))

  it('should show error on create failure', () => {
    navigateToDesktop()
    cy.intercept(
      'PUT',
      '**/other_expense_types*',
      mockErrorResponse('BadRequestException', 'Invalid data', 400),
    ).as('createOtherExpenseTypeFail')
    creatOrUpdate(true)
    cy.wait('@createOtherExpenseTypeFail')
    cy.get('.RaNotification-error').should('be.visible')
  })

  it('should show error on update failure', () => {
    navigateToDesktop()
    cy.intercept(
      'PUT',
      '**/other_expense_types*',
      mockErrorResponse('BadRequestException', 'Update failed', 400),
    ).as('updateOtherExpenseTypeFail')
    creatOrUpdate(false)
    cy.wait('@updateOtherExpenseTypeFail')
    cy.get('.RaNotification-error').should('be.visible')
  })

  it('should display other expense types list on mobile', () => showList(false))
  it('should show other expense type details on mobile', () => showDetails(false))
  it('should create a new other expense type on mobile', () => canCreate(false))
  it('should update an existing other expense type on mobile', () => canUpdate(false))
})
