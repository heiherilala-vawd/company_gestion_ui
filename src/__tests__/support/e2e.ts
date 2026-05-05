// Cypress support file for E2E tests
import './commands'
import '@cypress/code-coverage/support'

// Global beforeEach hook
beforeEach(() => {
  // Clear localStorage before each test
  cy.clearLocalStorage()
  cy.clearCookies()
})

// Security check: verify we're not calling real backend
before(() => {
  cy.intercept('**', (req) => {
    // Skip non-HTTP requests and browser extensions
    if (!req.url.startsWith('http://localhost:5173')) {
      console.warn('⚠️ Potential backend leak detected:', req.url)
    }
  }).as('securityCheck')
})
