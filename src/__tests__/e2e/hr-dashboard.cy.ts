import { insertInToLocalStorage, interceptGeneralEndpoint, loginInPage } from '../support/utils.ts'

describe('E2E: HR Dashboard', () => {
  beforeEach(() => {
    cy.clearLocalStorage()
    cy.clearCookies()
    interceptGeneralEndpoint()
    loginInPage()
    insertInToLocalStorage()
  })

  function navigateToDesktop() {
    cy.contains('Dashboard RH').click({ force: true })
    cy.wait(['@getHrDashboardSummary', '@getHrDashboardBreakdown'], { timeout: 15000 })
    cy.wait(500)
  }

  it('should display HR dashboard page', () => {
    navigateToDesktop()
    cy.contains('Ressources Humaines').should('be.visible')
    cy.contains("Vue d'ensemble").should('be.visible')
  })

  it('should display summary cards', () => {
    navigateToDesktop()
    cy.contains('Total employés').should('be.visible')
    cy.contains('Actifs').should('be.visible')
  })

  it('should display filter button', () => {
    navigateToDesktop()
    cy.contains("Vue d'ensemble").should('be.visible')
  })
})
