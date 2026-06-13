import { insertInToLocalStorage, interceptGeneralEndpoint, loginInPage } from '../support/utils.ts'

describe('E2E: Monetary Dashboard', () => {
  beforeEach(() => {
    interceptGeneralEndpoint()
    loginInPage()
    insertInToLocalStorage()
  })

  function navigateToDashboard(): void {
    cy.contains('[class*="MuiBottomNavigationAction"]', 'Base de déplacement').click({
      force: true,
    })
    cy.wait(1000)
    cy.get('[data-testid="section-hub"]')
      .last()
      .within(() => {
        cy.contains('Dashboard').click({ force: true })
      })
    cy.wait(
      [
        '@getMonetaryDashboardSummary',
        '@getMonetaryDashboardBreakdown',
        '@getMonetaryDashboardRevenue',
        '@getMonetaryDashboardExpenses',
        '@getMonetaryDashboardCashflow',
        '@getMonetaryDashboardProfit',
      ],
      { timeout: 20000 },
    )
  }

  it('should display monetary dashboard page via section hub', () => {
    navigateToDashboard()
    cy.contains('Base de déplacement').should('exist')
  })

  it('should display summary cards', () => {
    navigateToDashboard()
    cy.contains('Revenus').should('exist')
    cy.contains('Dépenses').should('exist')
  })
})
