import { insertInToLocalStorage, interceptGeneralEndpoint, loginInPage } from '../support/utils.ts'

describe('E2E: Equipment Dashboard', () => {
  beforeEach(() => {
    cy.clearLocalStorage()
    cy.clearCookies()
    interceptGeneralEndpoint()
    loginInPage()
    insertInToLocalStorage()
  })

  function navigateToDesktop() {
    cy.contains('Dashboard équipement').click({ force: true })
    cy.wait(['@getEquipmentDashboardSummary', '@getEquipmentDashboardBreakdown'], {
      timeout: 15000,
    })
    cy.wait(500)
  }

  it('should display equipment dashboard page', () => {
    navigateToDesktop()
    cy.contains("Vue d'ensemble").should('be.visible')
  })

  it('should display summary cards', () => {
    navigateToDesktop()
    cy.contains('Total').should('be.visible')
    cy.contains('Disponibles').should('be.visible')
  })

  it('should display filter button', () => {
    navigateToDesktop()
    cy.contains('button', 'Appliquer').should('be.visible')
  })
})
