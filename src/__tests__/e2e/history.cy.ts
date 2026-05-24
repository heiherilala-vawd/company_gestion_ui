import { mockSuccessResponse } from '../mocks/responses/auth-api'
import { historiesMock } from '../mocks/responses/histories-api'
import { insertInToLocalStorage, interceptGeneralEndpoint, loginInPage } from '../support/utils.ts'

describe('E2E: History', () => {
  beforeEach(() => {
    cy.clearLocalStorage()
    cy.clearCookies()
    insertInToLocalStorage()
    interceptGeneralEndpoint()
    cy.intercept('GET', '**/histories', mockSuccessResponse(historiesMock)).as('getHistories')
    loginInPage()
  })

  it('should display history page', () => {
    cy.visit('/history')
    cy.wait('@getHistories')
    cy.contains('Historique').should('be.visible')
  })

  it('should display history entries', () => {
    cy.visit('/history')
    cy.wait('@getHistories')
    cy.contains('COMPANY').should('be.visible')
    cy.contains('JOB').should('be.visible')
    cy.contains('EXPENSEMONEY').should('be.visible')
  })

  it('should display user information in entries', () => {
    cy.visit('/history')
    cy.wait('@getHistories')
    cy.contains('comp1_id').should('be.visible')
    cy.contains('job1_id').should('be.visible')
  })
})
