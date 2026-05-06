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
} from '../support/utils.ts'

describe('E2E: Other Expenses', () => {
  function creatOrUpdate(isCreating: boolean) {
    const crupdatedData = crupdateOtherExpensesMock[0]
    if (isCreating) {
      cy.contains('Create').click()
    } else {
      cy.contains('Office supplies').click()
      cy.wait('@getOtherExpense')
      cy.contains('Edit').click()
    }
    cy.get('[data-testid="input-description"] textarea:visible')
      .first()
      .clear()
      .type(<string>crupdatedData.description, { force: true })

    selectJob('expense\\.job_id')
    cy.get('[data-testid="input-expense-form"] [data-testid="input-amount"] input')
      .clear()
      .type('10000')
    cy.get('[data-testid="input-expense-form"] [data-testid="input-description"] textarea:visible')
      .clear()
      .type('description of job', { force: true })
    cy.get('button[type="submit"]').click()
  }

  beforeEach(() => {
    cy.clearLocalStorage()
    cy.clearCookies()
    insertInToLocalStorage()
    interceptGeneralEndpoint()
    loginInPage()
    cy.get('.RaSidebar-fixed').scrollTo('bottom', { duration: 500 })
    cy.wait(200)
    cy.get('[data-testid="menu-other-expenses"]').click()
    cy.wait('@getOtherExpenses')
  })

  it('should display other expenses list', () => {
    cy.contains('Office supplies').should('be.visible')
  })

  it('should show other expense details', () => {
    cy.contains('Office supplies').click()
    cy.wait('@getOtherExpense')
    cy.contains('Office supplies').should('exist')
  })

  it('should create a new other expense', () => {
    cy.intercept('PUT', '**/other_expenses', (req) => {
      req.reply(mockSuccessResponse(createOrUpdateOtherExpenses(req.body)))
    }).as('createOtherExpense')
    creatOrUpdate(true)
    cy.wait('@createOtherExpense')
    cy.url().should('include', '/other_expenses')
  })

  it('should update an existing other expense', () => {
    cy.intercept('PUT', '**/other_expenses', (req) => {
      req.reply(mockSuccessResponse(createOrUpdateOtherExpenses(req.body)))
    }).as('updateOtherExpense')
    creatOrUpdate(false)
    cy.wait('@updateOtherExpense')
    cy.url().should('include', '/other_expenses')
  })

  it('should show error on create failure', () => {
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
    cy.intercept(
      'PUT',
      '**/other_expenses',
      mockErrorResponse('BadRequestException', 'Update failed', 400),
    ).as('updateOtherExpenseFail')
    creatOrUpdate(false)
    cy.wait('@updateOtherExpenseFail')
    cy.get('.RaNotification-error').should('be.visible')
  })
})
