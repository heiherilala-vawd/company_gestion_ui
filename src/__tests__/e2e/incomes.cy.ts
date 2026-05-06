import { mockSuccessResponse, mockErrorResponse } from '../mocks/responses/auth-api'
import {
  crupdateIncomesMock,
  createOrUpdateIncomes,
  income1Mock,
  income2Mock,
} from '../mocks/responses/incomes-api'
import {
  insertInToLocalStorage,
  interceptGeneralEndpoint,
  loginInPage,
  selectJob,
} from '../support/utils.ts'

describe('E2E: Incomes', () => {
  function creatOrUpdate(isCreating: boolean) {
    const crupdatedData = crupdateIncomesMock[0]
    if (isCreating) {
      cy.contains('Create').click()
    } else {
      cy.contains(<string>income1Mock.description).click()
      cy.wait('@getIncome')
      cy.contains('Edit').click()
    }
    selectJob()
    cy.get('[data-testid="input-source_organization"] input')
      .clear()
      .type(<string>crupdatedData.source_organization)
    cy.get('[data-testid="input-invoice_reference"] input')
      .clear()
      .type(<string>crupdatedData.invoice_reference)
    cy.get('[data-testid="input-amount"] input')
      .clear()
      .type(<string>(<unknown>crupdatedData.amount))
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
    cy.get('.RaSidebar-fixed').scrollTo('bottom', { duration: 500 })
    cy.wait(200)
    cy.get('[data-testid="menu-incomes"]').click()
    cy.wait('@getIncomes')
  })

  it('should display incomes list', () => {
    cy.contains(<string>income1Mock.description).should('be.visible')
    cy.contains(<string>income2Mock.description).should('be.visible')
  })

  it('should show income details', () => {
    cy.contains(<string>income1Mock.description).click()
    cy.wait('@getIncome')
    cy.contains(<string>income1Mock.description).should('exist')
    cy.contains(<string>income1Mock.source_organization).should('exist')
  })

  it('should create a new income', () => {
    cy.intercept('PUT', '**/incomes', (req) => {
      req.reply(mockSuccessResponse(createOrUpdateIncomes(req.body)))
    }).as('createIncome')
    creatOrUpdate(true)
    cy.wait('@createIncome')
    cy.url().should('include', '/incomes')
  })

  it('should update an existing income', () => {
    cy.intercept('PUT', '**/incomes', (req) => {
      req.reply(mockSuccessResponse(createOrUpdateIncomes(req.body)))
    }).as('updateIncome')
    creatOrUpdate(false)
    cy.wait('@updateIncome')
    cy.url().should('include', '/incomes')
  })

  it('should show error on create failure', () => {
    cy.intercept(
      'PUT',
      '**/incomes',
      mockErrorResponse('BadRequestException', 'Invalid data', 400),
    ).as('createIncomeFail')
    creatOrUpdate(true)
    cy.wait('@createIncomeFail')
    cy.get('.RaNotification-error').should('be.visible')
  })

  it('should show error on update failure', () => {
    cy.intercept(
      'PUT',
      '**/incomes',
      mockErrorResponse('BadRequestException', 'Update failed', 400),
    ).as('updateIncomeFail')
    creatOrUpdate(false)
    cy.wait('@updateIncomeFail')
    cy.get('.RaNotification-error').should('be.visible')
  })
})
