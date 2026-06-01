import { mockSuccessResponse } from '../mocks/responses/auth-api'
import {
  insertInToLocalStorage,
  interceptGeneralEndpoint,
  loginInPage,
} from '../support/utils.ts'

describe('E2E: Material Dashboard', () => {
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
    cy.get('[data-testid="menu-material-dashboard"]').click()
    cy.wait(['@getMaterialDashboardSummary', '@getMaterialDashboardBreakdown'], { timeout: 15000 })
    cy.wait(500)
  }

  it('should display material dashboard page', () => {
    navigateToDesktop()
    cy.contains('h4', 'Tableau de bord matériaux').should('be.visible')
  })

  it('should display summary cards', () => {
    navigateToDesktop()
    cy.contains('Valeur stock').should('be.visible')
    cy.contains('Coût consommation').should('be.visible')
    cy.contains('Total matériaux').should('be.visible')
    cy.contains('Expiration proche').should('be.visible')
  })

  it('should display filter button', () => {
    navigateToDesktop()
    cy.contains('Appliquer les filtres').should('be.visible')
  })
})
