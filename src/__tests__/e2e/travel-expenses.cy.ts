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
} from '../support/utils.ts'

describe('E2E: Travel Expenses', () => {
  function creatOrUpdate(isCreating: boolean) {
    if (isCreating) {
      cy.get('[class*="RaCreateButton"]').click({ force: true })
    } else {
      cy.contains('td', <string>travelExpense1Mock.departure_location?.name).click({ force: true })
      cy.wait('@getTravelExpense', { timeout: 15000 })
      cy.get('.RaEditButton-root').click({ force: true })
    }
    if (!isCreating) {
      selectJob('expense\\.job_id')
    }
    cy.get('[data-testid="input-expense-form"] [data-testid="input-amount"] input')
      .clear()
      .type('10000')

    cy.get('button[type="submit"]').click({ force: true })
  }

  function navigateToDesktop() {
    cy.visit('/#/travel_expenses', { failOnStatusCode: false, timeout: 30000 })
    cy.url({ timeout: 15000 }).should('include', '/travel_expenses')
    cy.wait('@getTravelExpenses')
  }

  function navigateToMobile() {
    cy.viewport(375, 667)
    cy.visit('/#/travel_expenses', { failOnStatusCode: false, timeout: 30000 })
    cy.url({ timeout: 15000 }).should('include', '/travel_expenses')
    cy.wait('@getTravelExpenses')
  }

  function showList(isComputerView: boolean) {
    if (isComputerView) {
      navigateToDesktop()
      cy.contains(<number>travelExpense1Mock.expense?.amount).should('be.visible')
    } else {
      navigateToMobile()
    }
    cy.contains(<string>travelExpense1Mock.departure_location?.name).should('be.visible')
    cy.contains(<string>travelExpense2Mock.arrival_location?.name).should('be.visible')
  }

  function showDetails(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.contains('td', <string>travelExpense1Mock.departure_location?.name).click({ force: true })
    cy.wait('@getTravelExpense', { timeout: 15000 })
    cy.contains(<string>travelExpense1Mock.departure_location?.name).should('exist')
    cy.contains(<string>travelExpense1Mock.arrival_location?.name).should('be.visible')
    cy.contains(<string>travelExpense1Mock.expense?.comment).should('be.visible')
    cy.contains(<number>travelExpense1Mock.expense?.amount).should('be.visible')
    cy.contains(<string>travelExpense1Mock.expense?.job?.description).should('be.visible')
  }

  function canCreate(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.intercept('PUT', '**/travel_expenses', (req) => {
      req.reply(mockSuccessResponse(createOrUpdateTravelExpenses(req.body)))
    }).as('createTravelExpense')
    creatOrUpdate(true)
    cy.wait('@createTravelExpense')
    cy.url().should('include', '/travel_expenses')
  }

  function canUpdate(isComputerView: boolean) {
    if (isComputerView) navigateToDesktop()
    else navigateToMobile()
    cy.intercept('PUT', '**/travel_expenses', (req) => {
      req.reply(mockSuccessResponse(createOrUpdateTravelExpenses(req.body)))
    }).as('updateTravelExpense')
    creatOrUpdate(false)
    cy.wait('@updateTravelExpense')
    cy.url().should('include', '/travel_expenses')
  }

  beforeEach(() => {
    interceptGeneralEndpoint()
    loginInPage()
    insertInToLocalStorage()
  })

  it('should display travel expenses list', () => showList(true))
  it('should show travel expense details', () => showDetails(true))
  it('should create a new travel expense', () => canCreate(true))
  it('should update an existing travel expense', () => canUpdate(true))

  it('should show error on create failure', () => {
    navigateToDesktop()
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
    navigateToDesktop()
    cy.intercept(
      'PUT',
      '**/travel_expenses',
      mockErrorResponse('BadRequestException', 'Update failed', 400),
    ).as('updateTravelExpenseFail')
    creatOrUpdate(false)
    cy.wait('@updateTravelExpenseFail')
    cy.get('.RaNotification-error').should('be.visible')
  })

  it('should display travel expenses list on mobile', () => showList(false))
  it('should show travel expense details on mobile', () => showDetails(false))
  it('should create a new travel expense on mobile', () => canCreate(false))
  it('should update an existing travel expense on mobile', () => canUpdate(false))
})
