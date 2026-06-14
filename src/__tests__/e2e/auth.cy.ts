// Tests E2E d'authentification avec mocks
// Utilise les helpers de src/__tests__/mocks/responses/auth-api.ts

import {
  mockSuccessResponse,
  mockErrorResponse,
  loginRequestMock,
  authResponseMock,
  whoamiResponseMock,
} from '../mocks/responses/auth-api'

const failedLoginResponse = mockErrorResponse('NotAuthorizedException', 'Invalid credentials', 401)

function openLoginModal() {
  cy.contains('button', 'Se connecter', { timeout: 10000 }).click()
  cy.get('#wp-email', { timeout: 10000 }).should('be.visible')
}

function fillLoginForm(email: string, password: string) {
  cy.get('#wp-email').type(email)
  cy.get('#wp-password').type(password)
  cy.get('.wp-modal__submit').click()
}

describe('E2E: Authentication', () => {
  beforeEach(() => {
    cy.clearLocalStorage()
    cy.clearCookies()
    cy.visit('/', { failOnStatusCode: false })
  })

  it('remains on login page if login fails with wrong credentials', () => {
    cy.intercept('POST', '**/auth/login', failedLoginResponse).as('failedLogin')

    openLoginModal()
    fillLoginForm('wrong@email.com', 'wrongpassword')

    cy.wait('@failedLogin')

    cy.get('#wp-email').should('be.visible')
    cy.get('.wp-modal__error').should('be.visible')
  })

  it('redirects to home page after successful login', () => {
    cy.intercept('POST', '**/auth/login', mockSuccessResponse(authResponseMock)).as(
      'successfulLogin',
    )
    cy.intercept('GET', '**/auth/whoami', mockSuccessResponse(whoamiResponseMock)).as(
      'whoamiRequest',
    )

    openLoginModal()
    fillLoginForm(<string>loginRequestMock.email, <string>loginRequestMock.password)

    cy.wait('@successfulLogin')
    cy.wait('@whoamiRequest')

    cy.url().should('not.include', '/login')
  })

  it('redirects to login page when accessing protected route without auth', () => {
    cy.contains('button', 'Se connecter', { timeout: 15000 }).should('be.visible')
  })

  it('can logout and should be redirected to login page', () => {
    cy.intercept('POST', '**/auth/login', mockSuccessResponse(authResponseMock)).as('loginRequest')
    cy.intercept('GET', '**/auth/whoami', mockSuccessResponse(whoamiResponseMock)).as(
      'whoamiRequest',
    )

    openLoginModal()
    fillLoginForm(<string>loginRequestMock.email, <string>loginRequestMock.password)
    cy.wait('@loginRequest')
    cy.wait('@whoamiRequest')

    cy.url().should('not.include', '/login')

    cy.clearLocalStorage()
    cy.visit('/', { failOnStatusCode: false })
    cy.contains('button', 'Se connecter', { timeout: 15000 }).should('be.visible')
  })
})
