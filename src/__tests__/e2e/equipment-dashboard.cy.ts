import { insertInToLocalStorage, interceptGeneralEndpoint, loginInPage } from '../support/utils.ts'

describe('E2E: Equipment Dashboard', () => {
  beforeEach(() => {
    interceptGeneralEndpoint()
    loginInPage()
    insertInToLocalStorage()
  })

  function navigateToDesktop() {
    cy.contains('[class*="MuiBottomNavigationAction"]', 'Équipement').click({ force: true })
    cy.get('[data-testid="section-hub"]')
      .first()
      .within(() => {
        cy.contains('Dashboard').click({ force: true })
      })
    cy.wait(['@getEquipmentDashboardSummary', '@getEquipmentDashboardBreakdown'], {
      timeout: 15000,
    })
  }

  it('should display equipment dashboard page', () => {
    navigateToDesktop()
    cy.contains("Vue d'ensemble").should('be.visible')
  })

  it('should display summary cards', () => {
    navigateToDesktop()
    cy.contains('Total équipements').should('be.visible')
    cy.contains('En maintenance').should('be.visible')
  })

  it('should display filter button', () => {
    navigateToDesktop()
    cy.contains('Actualiser').should('be.visible')
  })
})
