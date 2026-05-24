import { mockSuccessResponse } from '../mocks/responses/auth-api'
import { insertInToLocalStorage, interceptGeneralEndpoint, loginInPage } from '../support/utils.ts'

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
    insertInToLocalStorage()
    interceptGeneralEndpoint()
    cy.intercept('GET', '**/companies/*/yearly-report*', mockSuccessResponse(yearlyReportMock)).as(
      'getYearlyReport',
    )
    loginInPage()
  })

  it('should display yearly report page', () => {
    cy.visit('/yearly-report')
    cy.wait('@getYearlyReport')
    cy.contains('Rapport annuel').should('be.visible')
    cy.contains('Revenus totaux').should('be.visible')
    cy.contains('Dépenses totales').should('be.visible')
    cy.contains('Bénéfice net').should('be.visible')
  })

  it('should display job financials in table', () => {
    cy.visit('/yearly-report')
    cy.wait('@getYearlyReport')
    cy.contains('Construction of Building A').should('be.visible')
    cy.contains('Hotel Renovation').should('be.visible')
  })

  it('should display summary cards with correct values', () => {
    cy.visit('/yearly-report')
    cy.wait('@getYearlyReport')
    cy.contains('150 000').should('be.visible')
    cy.contains('120 000').should('be.visible')
    cy.contains('30 000').should('be.visible')
  })
})
