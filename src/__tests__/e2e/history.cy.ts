import { mockSuccessResponse } from '../mocks/responses/auth-api'
import { historiesMock } from '../mocks/responses/histories-api'
import {
  expandMonetarySections,
  insertInToLocalStorage,
  interceptGeneralEndpoint,
  loginInPage,
} from '../support/utils.ts'

describe('E2E: History', () => {
  beforeEach(() => {
    cy.clearLocalStorage()
    cy.clearCookies()
    interceptGeneralEndpoint()
    cy.intercept('GET', '**/histories', mockSuccessResponse(historiesMock)).as('getHistories')
    loginInPage()
    insertInToLocalStorage()
  })

  function navigateToDesktop(): void {
    cy.get('[data-testid="menu-item-home"]').scrollTo('bottom', { duration: 500 })
    cy.wait(200)
    expandMonetarySections()
    cy.get('[data-testid="menu-history"]').click()
    cy.wait('@getHistories')
  }

  it('should display history page', () => {
    navigateToDesktop()
    cy.contains('h4', 'Historique').should('be.visible')
  })

  it('should display history entries', () => {
    navigateToDesktop()
    cy.contains('COMPANY').should('be.visible')
    cy.contains('JOB').should('be.visible')
    cy.contains('EXPENSEMONEY').should('be.visible')
  })

  it('should display user information in entries', () => {
    navigateToDesktop()
    cy.contains('comp1_id').should('be.visible')
    cy.contains('job1_id').should('be.visible')
  })
})
