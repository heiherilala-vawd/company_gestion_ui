import { mockSuccessResponse, mockErrorResponse } from '../mocks/responses/auth-api'
import {
  createOrUpdateOtherExpenses,
  crupdateOtherExpensesMock,
} from '../mocks/responses/other-expenses-api'
import {
  insertInToLocalStorage,
  interceptGeneralEndpoint,
  loginInPage,
  selectExpense,
  selectJob,
  selectOtherExpenseType,
} from '../support/utils.ts'

function selectOtherExpenseTypeLocal() {
  cy.get('[data-testid="input-other_expense_types-id"]').scrollIntoView()
  cy.get('[data-testid="input-other_expense_types-id"]').within(() => {
    cy.get('[role="combobox"], .MuiSelect-select').first().click({ force: true })
  })
  cy.get('[role="option"]', { timeout: 5000 }).should('be.visible')
  cy.get('[role="option"]').contains('Bureau').click()
  cy.get('[role="option"]').should('not.exist')
}

describe('E2E: Other Expenses', () => {
  function creatOrUpdate(isCreating: boolean) {
    const crupdatedData = crupdateOtherExpensesMock[0]
    if (isCreating) {
      cy.get('[class*="RaCreateButton"]').click()
    } else {
      cy.contains('Office supplies').click()
      cy.wait('@getOtherExpense')
      cy.get('.RaEditButton-root').click()
      cy.wait('@getOtherExpense')
    }
    if (isCreating) {
      cy.wait('@getOtherExpenseTypes')
      selectOtherExpenseTypeLocal()
    }

    cy.get('[data-testid="input-description"] textarea')
      .first()
      .clear({ force: true })
      .type(<string>crupdatedData.description, { force: true })

    if (!isCreating) {
      selectJob('expense\\.job_id')
    }
    cy.get('[data-testid="input-expense-form"] [data-testid="input-amount"] input')
      .clear({ force: true })
      .type('10000', { force: true })

    cy.get('button[type="submit"]').click()
  }

  function navigateToDesktop() {
    cy.get('[data-testid="menu-item-home"]').scrollTo('bottom', { duration: 500 })
    cy.wait(200)
    cy.get('[data-testid="menu-other-expenses"]').click()
    cy.wait('@getOtherExpenses')
  }

  function navigateToMobile() {
    cy.viewport(375, 667)
    cy.get('[data-testid="menu-item-home"]').should('exist')
    cy.get('[data-testid="menu-other-expenses"]').scrollIntoView()
    cy.get('[data-testid="menu-other-expenses"]').click({ force: true })
    cy.wait('@getOtherExpenses')
    cy.get('body').then(($body) => {
      if ($body.find('.RaSidebar-modal').length) {
        cy.get('body').click(0, 0) // clique hors menu
      }
    })
  }

  function showList(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.contains('Office supplies').should('be.visible')
  }

  function showDetails(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.contains('Office supplies').click()
    cy.wait('@getOtherExpense')
    cy.contains('Office supplies').should('exist')
  }

  function canCreate(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.intercept('PUT', '**/other_expenses', (req) => {
      req.reply(mockSuccessResponse(createOrUpdateOtherExpenses(req.body)))
    }).as('createOtherExpense')
    creatOrUpdate(true)
    cy.wait(3000)
    cy.wait('@createOtherExpense')
    cy.url().should('include', '/other_expenses')
  }

  function canUpdate(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.intercept('PUT', '**/other_expenses', (req) => {
      req.reply(mockSuccessResponse(createOrUpdateOtherExpenses(req.body)))
    }).as('updateOtherExpense')
    creatOrUpdate(false)
    cy.wait(3000)
    cy.wait('@updateOtherExpense')
    cy.url().should('include', '/other_expenses')
  }

  beforeEach(() => {
    cy.clearLocalStorage()
    cy.clearCookies()
    insertInToLocalStorage()
    interceptGeneralEndpoint()
    loginInPage()
  })

  it('should display other expenses list', () => showList(true))
  it('should show other expense details', () => showDetails(true))

  it('should verify other_expense_types API call', () => {
    navigateToDesktop()
    cy.get('[class*="RaCreateButton"]').click()
    cy.wait('@getOtherExpenseTypes', { timeout: 15000 })
    cy.get('[data-testid="input-other_expense_types-id"]').should('exist')
    cy.get('[data-testid="input-other_expense_types-id"] [role="combobox"]').as('combobox')
    cy.get('@combobox').should('not.be.disabled')
    cy.get('@combobox').click({ force: true })
    cy.wait(2000)
    cy.get('[role="option"]', { timeout: 5000 }).should('be.visible')
    cy.get('[role="option"]').contains('Bureau').click()
  })

  it('should create a new other expense', () => canCreate(true))
  it('should update an existing other expense', () => canUpdate(true))

  it('should show error on create failure', () => {
    navigateToDesktop()
    cy.intercept(
      'PUT',
      '**/other_expenses',
      mockErrorResponse('BadRequestException', 'Invalid data', 400),
    ).as('createOtherExpenseFail')
    creatOrUpdate(true)
    cy.wait('@createOtherExpenseFail')
    cy.get('.RaNotification-error').should('be.visible')
  })

  it('should show error on update failure', () => {
    navigateToDesktop()
    cy.intercept(
      'PUT',
      '**/other_expenses',
      mockErrorResponse('BadRequestException', 'Update failed', 400),
    ).as('updateOtherExpenseFail')
    creatOrUpdate(false)
    cy.wait('@updateOtherExpenseFail')
    cy.get('.RaNotification-error').should('be.visible')
  })

  it('should display other expenses list on mobile', () => showList(false))
  it('should show other expense details on mobile', () => showDetails(false))
  it('should create a new other expense on mobile', () => canCreate(false))
  it('should update an existing other expense on mobile', () => canUpdate(false))
})
