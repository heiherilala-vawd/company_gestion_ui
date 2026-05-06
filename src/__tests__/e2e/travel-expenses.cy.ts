import { mockSuccessResponse, mockErrorResponse } from '../mocks/responses/auth-api'
import {
  travelExpense1Mock,
  createOrUpdateTravelExpenses,
  travelExpense2Mock,
} from '../mocks/responses/travel-expenses-api'
import {
  insertInToLocalStorage,
  interceptGeneralEndpoint,
  loginInPage,
  selectJob,
  selectWarehouse,
} from '../support/utils.ts'

describe('E2E: Travel Expenses', () => {
  function creatOrUpdate(isCreating: boolean) {
    if (isCreating) {
      cy.contains('Create').click()
    } else {
      cy.contains(<string>travelExpense1Mock.departure_location?.name).click()
      cy.wait('@getTravelExpense')
      cy.contains('Edit').click()
    }
    selectWarehouse('departure_location_id')
    selectWarehouse('arrival_location_id', 1)
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
    cy.get('[data-testid="menu-travel-expenses"]').click()
    cy.wait('@getTravelExpenses')
  })

  it('should display travel expenses list', () => {
    cy.contains(<string>travelExpense1Mock.departure_location?.name).should('be.visible')
    cy.contains(<string>travelExpense2Mock.arrival_location?.name).should('be.visible')
    cy.contains(<number>travelExpense1Mock.expense?.amount).should('be.visible')
    cy.contains(<string>travelExpense1Mock.expense?.job_id).should('be.visible')
  })

  it('should show travel expense details', () => {
    cy.contains(<string>travelExpense1Mock.departure_location?.name).click()
    cy.wait('@getTravelExpense')
    cy.contains(<string>travelExpense1Mock.departure_location?.name).should('exist')
    cy.contains(<string>travelExpense1Mock.arrival_location?.name).should('be.visible')
    cy.contains(<string>travelExpense1Mock.expense?.comment).should('be.visible')
    cy.contains(<number>travelExpense1Mock.expense?.amount).should('be.visible')
    cy.contains(<string>travelExpense1Mock.expense?.job_id).should('be.visible')
  })

  it('should create a new travel expense', () => {
    cy.intercept('PUT', '**/travel_expenses', (req) => {
      req.reply(mockSuccessResponse(createOrUpdateTravelExpenses(req.body)))
    }).as('createTravelExpense')
    creatOrUpdate(true)
    cy.wait('@createTravelExpense')
    cy.url().should('include', '/travel_expenses')
  })

  it('should update an existing travel expense', () => {
    cy.intercept('PUT', '**/travel_expenses', (req) => {
      req.reply(mockSuccessResponse(createOrUpdateTravelExpenses(req.body)))
    }).as('updateTravelExpense')
    creatOrUpdate(false)
    cy.wait('@updateTravelExpense')
    cy.url().should('include', '/travel_expenses')
  })

  it('should show error on create failure', () => {
    cy.intercept(
      'PUT',
      '**/travel_expenses',
      mockErrorResponse('BadRequestException', 'Invalid data', 400),
    ).as('createTravelExpenseFail')
    creatOrUpdate(true)
    cy.wait('@createTravelExpenseFail')
    cy.get('.RaNotification-error').should('be.visible')
  })

  it('should show error on update failure', () => {
    cy.intercept(
      'PUT',
      '**/travel_expenses',
      mockErrorResponse('BadRequestException', 'Update failed', 400),
    ).as('updateTravelExpenseFail')
    creatOrUpdate(false)
    cy.wait('@updateTravelExpenseFail')
    cy.get('.RaNotification-error').should('be.visible')
  })
})
