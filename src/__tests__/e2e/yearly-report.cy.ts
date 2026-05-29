import { mockSuccessResponse } from '../mocks/responses/auth-api'
import {
  expandMonetarySections,
  insertInToLocalStorage,
  interceptGeneralEndpoint,
  loginInPage,
} from '../support/utils.ts'

describe('E2E: Yearly Report', () => {
  const yearlyReportMock = {
    year: 2024,
    jobs_with_financials: [
      {
        job: { id: 'job1_id', description: 'Construction of Building A' },
        total_income: 100000,
        total_expense: 75000,
        net_profit: 25000,
      },
      {
        job: { id: 'job2_id', description: 'Hotel Renovation' },
        total_income: 50000,
        total_expense: 45000,
        net_profit: 5000,
      },
    ],
    summary: {
      total_income: 150000,
      total_expense: 120000,
      net_profit: 30000,
    },
  }

  beforeEach(() => {
    cy.clearLocalStorage()
    cy.clearCookies()
    interceptGeneralEndpoint()
    cy.intercept('GET', '**/yearly_report*', mockSuccessResponse(yearlyReportMock)).as(
      'getYearlyReport',
    )
    loginInPage()
    insertInToLocalStorage()
  })

  function navigateToDesktop(): void {
    cy.get('[data-testid="menu-item-home"]').scrollTo('bottom', { duration: 500 })
    cy.wait(200)
    expandMonetarySections()
    cy.get('[data-testid="menu-yearly-report"]').click()
    cy.wait('@getYearlyReport')
    cy.wait(500)
  }

  it('should display yearly report page', () => {
    navigateToDesktop()
    cy.contains('h4', 'Rapport annuel').should('be.visible')
    cy.contains('Revenus totaux').should('be.visible')
    cy.contains('Dépenses totales').should('be.visible')
    cy.contains('Bénéfice net').should('be.visible')
  })

  it('should display job financials in table', () => {
    navigateToDesktop()
    cy.contains('Construction of Building A').should('be.visible')
    cy.contains('Hotel Renovation').should('be.visible')
  })

  it('should display summary cards with correct values', () => {
    navigateToDesktop()
    cy.contains('Revenus totaux').should('be.visible')
    cy.contains('Dépenses totales').should('be.visible')
    cy.contains('Bénéfice net').should('be.visible')
    cy.get('h5').should('have.length', 3)
    cy.get('h5').eq(0).should('contain.text', '150')
    cy.get('h5').eq(1).should('contain.text', '120')
    cy.get('h5').eq(2).should('contain.text', '30')
  })
})
