import { mockSuccessResponse } from '../mocks/responses/auth-api'
import { historiesMock } from '../mocks/responses/histories-api'
import { insertInToLocalStorage, interceptGeneralEndpoint, loginInPage } from '../support/utils.ts'

describe('E2E: History', () => {
  beforeEach(() => {
    interceptGeneralEndpoint()
    cy.intercept('GET', '**/histories*', mockSuccessResponse(historiesMock)).as('getHistories')
    loginInPage()
    insertInToLocalStorage()
  })

  it('should display history page', () => {
    cy.visit('/#/histories')
    cy.wait('@getHistories')
    cy.contains('Historique').should('be.visible')
  })

  it('should display history entries', () => {
    cy.visit('/#/histories')
    cy.wait('@getHistories')
    cy.get('td').contains('Entreprise').should('be.visible')
    cy.get('td').contains('Travail').should('be.visible')
    cy.get('td').contains('Dépense').should('be.visible')
  })

  it('should display user information in entries', () => {
    cy.visit('/#/histories')
    cy.wait('@getHistories')
    cy.contains('comp1_id').should('be.visible')
    cy.contains('job1_id').should('be.visible')
  })
})
