import {
  mockSuccessResponse,
  authResponseMock,
  whoamiResponseMock,
  loginRequestMock,
} from '../mocks/responses/auth-api'

describe('E2E: Employee Role', () => {
  it('can login as ADMIN', () => {
    cy.clearLocalStorage()
    cy.clearCookies()
    cy.viewport(1280, 720)
    cy.intercept('POST', '**/auth/login', mockSuccessResponse(authResponseMock)).as('login')
    cy.intercept('GET', '**/auth/whoami', mockSuccessResponse(whoamiResponseMock)).as('whoami')

    cy.visit('/', { failOnStatusCode: false })
    cy.contains('button', 'Se connecter', { timeout: 10000 }).click()
    cy.get('#wp-email', { timeout: 10000 })
      .should('be.visible')
      .type(<string>loginRequestMock.email)
    cy.get('#wp-password').type(<string>loginRequestMock.password)
    cy.get('.wp-modal__submit').click()
    cy.wait('@login', { timeout: 10000 }).its('response.statusCode').should('eq', 200)
    cy.wait('@whoami', { timeout: 10000 }).its('response.statusCode').should('eq', 200)
    cy.url({ timeout: 15000 }).should('not.include', '/login')
    cy.log('LOGIN SUCCEEDED!')
  })
})
