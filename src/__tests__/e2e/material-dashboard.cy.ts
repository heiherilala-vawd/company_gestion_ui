import { insertInToLocalStorage, interceptGeneralEndpoint, loginInPage } from '../support/utils.ts'

describe('E2E: Material Dashboard', () => {
  beforeEach(() => {
    cy.clearLocalStorage()
    cy.clearCookies()
    interceptGeneralEndpoint()
    loginInPage()
    insertInToLocalStorage()
  })

  function navigateToDesktop() {
    cy.contains('Dashboard stock').click({ force: true })
    cy.wait(['@getMaterialDashboardSummary', '@getMaterialDashboardBreakdown'], { timeout: 15000 })
    cy.wait(500)
  }

  it('should display material dashboard page', () => {
    navigateToDesktop()
    cy.contains("Vue d'ensemble").should('be.visible')
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
    cy.contains('button', 'Appliquer').should('be.visible')
  })
})
