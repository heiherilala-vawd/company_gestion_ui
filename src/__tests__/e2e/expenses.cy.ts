import { mockSuccessResponse, mockErrorResponse } from '../mocks/responses/auth-api'
import {
  expense1Mock,
  crupdateExpensesMock,
  createOrUpdateExpenses,
  expense2Mock,
} from '../mocks/responses/expenses-api'
import {
  insertInToLocalStorage,
  interceptGeneralEndpoint,
  loginInPage,
  selectJob,
} from '../support/utils.ts'

describe('E2E: Expenses', () => {
  function creatOrUpdate(isCreating: boolean) {
    const crupdatedData = crupdateExpensesMock[0]
    if (isCreating) {
      cy.contains('Create').click()
    } else {
      cy.contains(<string>expense1Mock.description).click()
      cy.wait('@getExpense')
      cy.get('.RaEditButton-root').click()
    }
    if (!isCreating) {
      selectJob()
    }
    cy.get('[data-testid="input-amount"] input')
      .clear()
      .type(<string>crupdatedData.amount)
    cy.get('[data-testid="input-description"] textarea:visible')
      .clear()
      .type(<string>crupdatedData.description, { force: true })
    cy.get('button[type="submit"]').click()
  }

  beforeEach(() => {
    cy.clearLocalStorage()
    cy.clearCookies()
    insertInToLocalStorage()
    interceptGeneralEndpoint()
    loginInPage()
    cy.get('[data-testid="menu-item-home"]').scrollTo('bottom', { duration: 500 })
    cy.wait(200)
    cy.get('[data-testid="menu-expenses"]').click()
    cy.wait('@getExpenses')
  })

  it('should display expenses list', () => {
    cy.contains(<string>expense1Mock.description).should('be.visible')
    cy.contains(<string>expense2Mock.description).should('be.visible')
  })

  it('should show expense details', () => {
    cy.contains(<string>expense1Mock.description).click()
    cy.wait('@getExpense')
    cy.contains(<string>expense1Mock.description).should('exist')
    cy.contains(<number>expense1Mock.amount).should('exist')
  })

  it('should create a new expense', () => {
    cy.intercept('PUT', '**/expenses', (req) => {
      req.reply(mockSuccessResponse(createOrUpdateExpenses(req.body)))
    }).as('createExpense')
    creatOrUpdate(true)
    cy.wait('@createExpense')
    cy.url().should('include', '/expenses')
  })

  it('should update an existing expense', () => {
    cy.intercept('PUT', '**/expenses', (req) => {
      req.reply(mockSuccessResponse(createOrUpdateExpenses(req.body)))
    }).as('updateExpense')
    creatOrUpdate(false)
    cy.wait('@updateExpense')
    cy.url().should('include', '/expenses')
  })

  it('should show error on create failure', () => {
    cy.intercept(
      'PUT',
      '**/expenses',
      mockErrorResponse('BadRequestException', 'Invalid data', 400),
    ).as('createExpenseFail')
    creatOrUpdate(true)
    cy.wait('@createExpenseFail')
    cy.get('.RaNotification-error').should('be.visible')
  })

  it('should show error on update failure', () => {
    cy.intercept(
      'PUT',
      '**/expenses',
      mockErrorResponse('BadRequestException', 'Update failed', 400),
    ).as('updateExpenseFail')
    creatOrUpdate(false)
    cy.wait('@updateExpenseFail')
    cy.get('.RaNotification-error').should('be.visible')
  })
})
