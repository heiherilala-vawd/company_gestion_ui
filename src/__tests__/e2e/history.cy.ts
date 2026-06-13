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
    interceptGeneralEndpoint()
    cy.intercept('GET', '**/histories*', mockSuccessResponse(historiesMock)).as('getHistories')
    loginInPage()
    insertInToLocalStorage()
  })

  function navigateToDesktop(): void {
    cy.get('[data-testid="menu-item-home"]').scrollTo('bottom', { duration: 500 })
    cy.wait(200)
    expandMonetarySections()
    cy.get('[data-testid="menu-history"]').scrollIntoView()
    cy.get('[data-testid="menu-history"]').should('be.visible')
    cy.get('[data-testid="menu-history"]').click({ force: true })
    cy.wait('@getHistories')
  }

  it('should display history page', () => {
    navigateToDesktop()
    cy.contains('Historique').should('be.visible')
  })

  it('should display history entries', () => {
    navigateToDesktop()
    cy.get('td').contains('Entreprise').should('be.visible')
    cy.get('td').contains('Travail').should('be.visible')
    cy.get('td').contains('Dépense').should('be.visible')
  })

  it('should display user information in entries', () => {
    navigateToDesktop()
    cy.contains('comp1_id').should('be.visible')
    cy.contains('job1_id').should('be.visible')
  })
})
