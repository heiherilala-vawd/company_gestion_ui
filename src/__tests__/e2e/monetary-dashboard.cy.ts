import { insertInToLocalStorage, interceptGeneralEndpoint, loginInPage } from '../support/utils.ts'

describe('E2E: Monetary Dashboard', () => {
  beforeEach(() => {
    cy.clearLocalStorage()
    cy.clearCookies()
    interceptGeneralEndpoint()
    loginInPage()
    insertInToLocalStorage()
  })

  it('should display monetary dashboard page via section hub', () => {
    cy.contains('[class*="MuiBottomNavigationAction"]', 'Base de déplacement').click({
      force: true,
    })
    cy.wait(1000)
    cy.get('[data-testid="section-hub"]')
      .eq(2)
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
    cy.wait(500)
    cy.contains("Vue d'ensemble").should('be.visible')
  })

  it('should display summary cards', () => {
    cy.contains('[class*="MuiBottomNavigationAction"]', 'Base de déplacement').click({
      force: true,
    })
    cy.wait(1000)
    cy.get('[data-testid="section-hub"]')
      .eq(2)
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
    cy.wait(500)
    cy.contains('Revenus totaux').should('be.visible')
    cy.contains('Dépenses totales').should('be.visible')
    cy.contains('Marge brute').should('be.visible')
  })

  it('should display filter button', () => {
    cy.contains('[class*="MuiBottomNavigationAction"]', 'Base de déplacement').click({
      force: true,
    })
    cy.wait(1000)
    cy.get('[data-testid="section-hub"]')
      .eq(2)
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
    cy.wait(500)
    cy.contains('button', 'Appliquer').should('be.visible')
  })
})
