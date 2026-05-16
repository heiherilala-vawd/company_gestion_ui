import { insertInToLocalStorage, interceptGeneralEndpoint, loginInPage } from '../support/utils.ts'

describe('E2E: Activity Pages', () => {
  beforeEach(() => {
    cy.clearLocalStorage()
    cy.clearCookies()
    insertInToLocalStorage()
    interceptGeneralEndpoint()
    loginInPage()
  })

  it('should navigate to IncomesActivity via home button and toggle', () => {
    cy.contains('button', 'Emprunts').click()
    cy.url().should('include', '/incomes_activity')
    cy.contains('Emprunts', { timeout: 10000 }).should('be.visible')
    cy.contains('Revenus').click()
  })
})
