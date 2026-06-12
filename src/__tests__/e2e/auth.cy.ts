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

describe('E2E: Authentication', () => {
  beforeEach(() => {
    cy.clearLocalStorage()
    cy.clearCookies()
    cy.visit('/', { failOnStatusCode: false })
  })

  it('remains on login page if login fails with wrong credentials', () => {
    cy.intercept('POST', '**/auth/login', failedLoginResponse).as('failedLogin')

    cy.get('input').first().should('exist')
    cy.get('input').first().type('wrong@email.com', { force: true })
    cy.get('input[type="password"]').type('wrongpassword', { force: true })
    cy.get('button[type="submit"]').click({ force: true })

    cy.wait('@failedLogin')

    cy.get('input').first().should('exist')
    cy.get('.RaNotification-error').should('be.visible')
  })

  it('redirects to home page after successful login', () => {
    cy.intercept('POST', '**/auth/login', mockSuccessResponse(authResponseMock)).as(
      'successfulLogin',
    )
    cy.intercept('GET', '**/auth/whoami', mockSuccessResponse(whoamiResponseMock)).as(
      'whoamiRequest',
    )

    cy.get('input').first().should('be.visible')
    cy.get('input')
      .first()
      .type(<string>loginRequestMock.email)
    cy.get('input[type="password"]').type(<string>loginRequestMock.password)
    cy.get('button[type="submit"]').click({ force: true })

    cy.wait('@successfulLogin')
    cy.wait('@whoamiRequest')

    cy.url().should('not.include', '/login')
  })

  it('redirects to login page when accessing protected route without auth', () => {
    cy.url({ timeout: 15000 }).should('include', '/login')
    cy.get('input').first().should('exist')
  })

  it('can logout and should be redirected to login page', () => {
    cy.intercept('POST', '**/auth/login', mockSuccessResponse(authResponseMock)).as('loginRequest')
    cy.intercept('GET', '**/auth/whoami', mockSuccessResponse(whoamiResponseMock)).as(
      'whoamiRequest',
    )

    cy.get('input').first().should('be.visible')
    cy.get('input')
      .first()
      .type(<string>loginRequestMock.email)
    cy.get('input[type="password"]').type(<string>loginRequestMock.password)
    cy.get('button[type="submit"]').click({ force: true })
    cy.wait('@loginRequest')
    cy.wait('@whoamiRequest')

    cy.url().should('not.include', '/login')
    cy.get('[class*="RaLayout"]').should('be.visible')

    cy.clearLocalStorage()
    cy.visit('/', { failOnStatusCode: false })
    cy.url({ timeout: 15000 }).should('include', '/login')
    cy.get('input').first().should('exist')
  })
})
