import { mockSuccessResponse } from '../mocks/responses/auth-api'
import {
  insertInToLocalStorage,
  interceptGeneralEndpoint,
  loginInPage,
} from '../support/utils.ts'

describe('E2E: HR Dashboard', () => {
  beforeEach(() => {
    cy.clearLocalStorage()
    cy.clearCookies()
    interceptGeneralEndpoint()
    loginInPage()
    insertInToLocalStorage()
  })

  function navigateToDesktop() {
    cy.get('[data-testid="menu-item-home"]').scrollTo('bottom', { duration: 500 })
    cy.wait(200)
    cy.get('[data-testid="menu-hr-dashboard"]').click()
    cy.wait(['@getHrDashboardSummary', '@getHrDashboardBreakdown'], { timeout: 15000 })
    cy.wait(500)
  }

  it('should display HR dashboard page', () => {
    navigateToDesktop()
    cy.contains('h4', 'Tableau de bord RH').should('be.visible')
  })

  it('should display summary cards', () => {
    navigateToDesktop()
    cy.contains('Effectif').should('be.visible')
    cy.contains('Masse salariale').should('be.visible')
  })

  it('should display filter button', () => {
    navigateToDesktop()
    cy.contains('Appliquer les filtres').should('be.visible')
  })
})
