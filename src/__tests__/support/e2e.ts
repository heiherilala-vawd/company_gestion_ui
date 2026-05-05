// Cypress support file for E2E tests
import './commands'
import '@cypress/code-coverage/support'

// Global beforeEach hook
beforeEach(() => {
  // Clear localStorage before each test
  cy.clearLocalStorage()
  cy.clearCookies()
})
